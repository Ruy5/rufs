package top.feli.wlt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@CrossOrigin("*")
@RestController
@RequestMapping("/upload")
public class SplitFileController {
    @Autowired
    private Environment env;


    @PostMapping("/chunk")
    public String uploadChunk(@RequestParam("file") MultipartFile file,
                              @RequestParam("chunkNumber") int chunkNumber,
                              @RequestParam("totalChunks") int totalChunks,
                              @RequestParam("identifier") String identifier) {

        String uploadDir = env.getProperty("file.upload-dir");

        try {
            File dir = new File(uploadDir + identifier);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            File chunkFile = new File(dir, identifier + "_" + chunkNumber);
            file.transferTo(chunkFile);

            // Check if all chunks are uploaded and merge them
            if (chunkNumber == totalChunks - 1) {
                mergeChunks(identifier, totalChunks);
            }

            return "Chunk " + chunkNumber + " uploaded successfully";
        } catch (IOException e) {
            e.printStackTrace();
            return "Chunk " + chunkNumber + " upload failed";
        }
    }

    private void mergeChunks(String identifier, int totalChunks) throws IOException {
        String uploadDir = env.getProperty("file.upload-dir");
        File mergedFile = new File(uploadDir, identifier);
        for (int i = 0; i < totalChunks; i++) {
            File chunkFile = new File(uploadDir + identifier, identifier + "_" + i);
            java.nio.file.Files.write(mergedFile.toPath(), java.nio.file.Files.readAllBytes(chunkFile.toPath()), java.nio.file.StandardOpenOption.CREATE, java.nio.file.StandardOpenOption.APPEND);
            chunkFile.delete();
        }
    }

    @GetMapping("/chunk")
    public ResponseEntity<byte[]> downloadChunk(@RequestParam("identifier") String identifier,
                                                @RequestParam("chunkNumber") int chunkNumber,
                                                @RequestParam("chunkSize") int chunkSize) throws IOException {
        String uploadDir = env.getProperty("file.upload-dir");
        File file = new File(uploadDir, identifier);
        long fileSize = file.length();
        long skipBytes = chunkNumber * (long) chunkSize;

        if (skipBytes >= fileSize) {
            return ResponseEntity.status(HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE).build();
        }

        try (InputStream inputStream = new FileInputStream(file)) {
            inputStream.skip(skipBytes);
            byte[] buffer = new byte[chunkSize];
            int bytesRead = inputStream.read(buffer);
            if (bytesRead < buffer.length) {
                byte[] actualBytes = new byte[bytesRead];
                System.arraycopy(buffer, 0, actualBytes, 0, bytesRead);
                buffer = actualBytes;
            }

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, "application/octet-stream");
            headers.add(HttpHeaders.CONTENT_LENGTH, String.valueOf(fileSize));
            System.out.println(String.valueOf(fileSize));
            return new ResponseEntity<>(buffer, headers, HttpStatus.PARTIAL_CONTENT);
        }
    }
}