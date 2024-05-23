package top.feli.wlt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import top.feli.wlt.utils.VideoToM3u8AndTSUtil;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Objects;

/**
 * @description:
 * @package: com.example.m3u8
 * @author: zheng
 * @date: 2023/10/28
 */
@CrossOrigin("*")
@RestController
@RequestMapping("/video")
public class VideoController {
    @Autowired
    private Environment env;
    @PostMapping("/upload")
    public ResponseEntity<String> upload(MultipartFile file) {
        String uploadDir = env.getProperty("file.upload-dir");
        if (file == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }


        try {

            boolean written = VideoToM3u8AndTSUtil.write(file.getInputStream(), uploadDir + "/", file.getOriginalFilename());
            if (!written) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
            String srcPathname = uploadDir + "/" + file.getOriginalFilename();
            String filename = VideoToM3u8AndTSUtil.getFilenameWithoutSuffix(Objects.requireNonNull(file.getOriginalFilename()));
            String destPathname = uploadDir + "/" + filename + ".m3u8";

            boolean converted = VideoToM3u8AndTSUtil.convert(srcPathname, destPathname);
            if (!converted) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok("/video/m3u8?filename=" + filename + ".m3u8");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/m3u8")
    public ResponseEntity<byte[]> getM3U8Content(@RequestParam String filename) {
        try {

            String filepath = env.getProperty("file.upload-dir");
            File file = new File(filepath, filename);

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


    @GetMapping("/{filename}")
    public ResponseEntity<byte[]> getTSContent(@PathVariable String filename) {
        try {
            String uploadDir = env.getProperty("file.upload-dir");
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