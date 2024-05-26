package top.feli.wlt.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import top.feli.wlt.utils.CreateDirectoryIfNotExistsUtil;
import top.feli.wlt.utils.RemoveNonAlphanumeric;

import java.io.*;
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
    public float upload(MultipartFile file, String fileName, String fileMd5, Integer chunkCount, Integer currentIndex,
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
                System.out.println("上传完成："+tempFilePath);
                fileCountMap.remove(fileMd5);
                return 1.0f;
            }else{
                System.out.println(fileMd5+currentIndex + "件上传中");
                return (float) fileCountMap.get(fileMd5) / chunkCount;
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

//    private void checkFilePath(){
//        File file = new File(saveDir);
//        if(!file.exists()){
//            file.mkdirs();
//        }
//    }
}