package top.feli.rufs.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import top.feli.rufs.model.Result;
import top.feli.rufs.utils.CreateDirectoryIfNotExistsUtil;
import top.feli.rufs.utils.RemoveNonAlphanumeric;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

@CrossOrigin("*")
@RestController
@RequestMapping("/slicefile")
public class SliceFileController {

    @Value("${file.upload-dir}")
    private String saveDir;

    private static final Map<String, Integer> fileCountMap = new ConcurrentHashMap<>();

    /**
     * 分片上传接口
     * @param file 分片文件
     * @param fileName 文件名称
     * @param fileMd5 文件MD5值
     * @param chunkCount 分片总数量
     * @param currentIndex 当前分片索引
     */
    @PostMapping("/upload")
    public Result upload(MultipartFile file, String fileName, String fileMd5, Integer chunkCount, Integer currentIndex,
                         @RequestParam(value = "project", defaultValue = "other") String project) throws IOException {
        // 去除中文
        fileName = RemoveNonAlphanumeric.transfrom(fileName) ;
        // 拼接路径
        String uploadDir = saveDir + File.separator + project + File.separator;
        // 创建文件夹
        new CreateDirectoryIfNotExistsUtil(uploadDir);
        String tempFilePath = uploadDir + fileMd5 + fileName;
        try(RandomAccessFile accessFile = new RandomAccessFile(tempFilePath,"rw")){
            accessFile.seek(currentIndex);
            accessFile.write(file.getBytes());
            fileCountMap.put(fileMd5, fileCountMap.getOrDefault(fileMd5,0)+1);
            if(Objects.equals(fileCountMap.get(fileMd5), chunkCount)){
                fileCountMap.remove(fileMd5);
                return Result.OkSliceUpload ("/slicefile/download", fileName, fileMd5, 1024000, chunkCount, project, 1.0f);
                     //   String.format("http://localhost:1024/slicefile/download?fileName=%s&fileMd5=%s&chunkSize=%s&chunkCount=", fileName, fileMd5, 1000, chunkCount);
            }else{
                return Result.OkSliceUpload ("/slicefile/download", fileName, fileMd5, 1024000, chunkCount, project, ((float) fileCountMap.get(fileMd5) / chunkCount));
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    /**
     * 分片下载接口
     * @param fileName 文件名称
     * @param fileMd5 文件MD5值
     * @param chunkSize 分片大小
     * @param currentIndex 当前分片索引
     * @param project 项目名
     * @return 文件分片的字节数组
     */
    @GetMapping("/download")
    public byte[] download(@RequestParam String fileName, @RequestParam String fileMd5,
                           @RequestParam Integer chunkSize, @RequestParam Integer currentIndex,
                           @RequestParam(value = "project", defaultValue = "other") String project) throws IOException {
        fileName = RemoveNonAlphanumeric.transfrom(fileName);
        String uploadDir = saveDir + File.separator + project + File.separator;
        String filePath = uploadDir + fileMd5 + fileName;

        Path path = Paths.get(filePath);
        System.out.println(path);
        if (!Files.exists(path)) {
            throw new FileNotFoundException("File not found");
        }

        try (RandomAccessFile accessFile = new RandomAccessFile(filePath, "r")) {
            long fileSize = accessFile.length();
            long start = currentIndex * chunkSize;
            long end = Math.min(start + chunkSize, fileSize);
            if (start >= fileSize) {
                throw new IOException("Invalid chunk index");
            }

            byte[] buffer = new byte[(int) (end - start)];
            accessFile.seek(start);
            accessFile.read(buffer);

            return buffer;
        }
    }
}
