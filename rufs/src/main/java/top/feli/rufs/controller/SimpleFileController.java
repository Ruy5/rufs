package top.feli.rufs.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.Objects;

import java.io.FileNotFoundException;
import java.net.MalformedURLException;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import top.feli.rufs.model.Result;
import top.feli.rufs.utils.ChineseToUrlEncodeUtil;
import top.feli.rufs.utils.CreateDirectoryIfNotExistsUtil;
import top.feli.rufs.utils.RemoveNonAlphanumeric;


@CrossOrigin(origins = "*")
@RequestMapping("/simplefile")
@RestController
public class SimpleFileController {

    @Autowired
    private Environment env;

    @PostMapping("/upload")
    public Result uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "project", defaultValue = "other") String project) {
        try {
            // 获取文件存储路径
            String uploadDir = env.getProperty("file.upload-dir") + "/" + project;
            new CreateDirectoryIfNotExistsUtil(uploadDir);
            String fileName = RemoveNonAlphanumeric.transfrom(Instant.now().toEpochMilli() +  file.getOriginalFilename() ) ;
            Path path = Paths.get(uploadDir + "/" + fileName);
            Files.write(path, file.getBytes());
            return Result.OkUpload("/simplefile/download", fileName, file.getContentType(), project);
        } catch (Exception e) {
            System.out.println(e);
            return Result.Error("上传失败！");
        }
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> loadFileAsResource(
            @RequestParam("filename") String filename,
            @RequestParam(value = "mediaType", defaultValue = "image/jpeg") String mediaType,
            @RequestParam(value = "project", defaultValue = "other") String project,
            @RequestParam(value = "disposition", defaultValue = "inline") String disposition // attachment
    ) throws FileNotFoundException {
        try {
            // 获取文件存储路径
            String uploadDir = env.getProperty("file.upload-dir") + "/" + project;

            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(mediaType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, disposition+"; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                throw new FileNotFoundException("File not found " + filename);
            }
        } catch (MalformedURLException | FileNotFoundException ex) {
            throw new FileNotFoundException("File not found " + filename);
        }
    }
}
