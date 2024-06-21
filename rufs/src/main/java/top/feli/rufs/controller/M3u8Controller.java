package top.feli.rufs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import top.feli.rufs.model.Result;
import top.feli.rufs.utils.CreateDirectoryIfNotExistsUtil;
import top.feli.rufs.utils.RemoveNonAlphanumeric;
import top.feli.rufs.utils.VideoToM3u8AndTSUtil;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.Instant;
import java.util.Objects;


@CrossOrigin("*")
@RestController
@RequestMapping("/m3u8")
public class M3u8Controller {
    @Autowired
    private Environment env;
    @PostMapping("/upload")
    public Result upload(MultipartFile file, @RequestParam(value = "project", defaultValue = "other") String project) throws IOException {
        if (file == null || file.isEmpty()) {
            return Result.Error("未找到上传文件内容！");
        }

        String uploadDir = env.getProperty("file.upload-dir") + "/" + project;
        new CreateDirectoryIfNotExistsUtil(uploadDir);

        String fileName = RemoveNonAlphanumeric.transfrom(Instant.now().toEpochMilli() +  file.getOriginalFilename() ) ;

        try {
            boolean written = VideoToM3u8AndTSUtil.write(file.getInputStream(), uploadDir + "/", fileName);
            if (!written) {
                return Result.Error("文件上传失败");
            }
            String srcPathname = uploadDir + "/" + fileName;
            String filename = VideoToM3u8AndTSUtil.getFilenameWithoutSuffix(Objects.requireNonNull(fileName));
            String destPathname = uploadDir + "/" + filename + ".m3u8";

            boolean converted = VideoToM3u8AndTSUtil.convert(srcPathname, destPathname, String.format("/m3u8/ts/%s/", project));
            if (!converted) {
                return Result.Error("m3u8转换失败");
            }

            return Result.OkUpload("/m3u8/index",  filename + ".m3u8", "application/vnd.apple.mpegurl", project);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/index")
    public ResponseEntity<byte[]> getM3U8Content(@RequestParam String filename, @RequestParam(value = "project", defaultValue = "other") String project) {
        System.out.println(" m3u8 index start");
        try {

            String uploadDir = env.getProperty("file.upload-dir") + "/" + project;
            File file = new File(uploadDir, filename);

            if (file.exists()) {
                // 读取M3U8文件内容
                FileInputStream fileInputStream = new FileInputStream(file);
                byte[] data = new byte[(int) file.length()];
                fileInputStream.read(data);
                fileInputStream.close();

                // 设置响应头为M3U8类型
                return ResponseEntity.ok()
                        .contentType(MediaType.valueOf("application/vnd.apple.mpegurl"))
                        .body(data);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.fillInStackTrace();
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/ts/{project}/{filename}")
    public ResponseEntity<byte[]> getTSContent(@PathVariable String project, @PathVariable String filename) {
        try {
            String uploadDir = env.getProperty("file.upload-dir") + "/" + project;
            System.out.println(filename);
            File file = new File(uploadDir + "/", filename);

            if (file.exists()) {
                // 读取TS文件内容
                FileInputStream fileInputStream = new FileInputStream(file);
                byte[] data = new byte[(int) file.length()];
                fileInputStream.read(data);
                fileInputStream.close();

                // 设置响应头为TS文件类型
                return ResponseEntity.ok()
                        .contentType(MediaType.valueOf("video/mp2t"))
                        .body(data);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.fillInStackTrace();
            return null;
        }
    }
}