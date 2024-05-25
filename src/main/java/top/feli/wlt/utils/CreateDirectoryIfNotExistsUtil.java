package top.feli.wlt.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class CreateDirectoryIfNotExistsUtil {
    public CreateDirectoryIfNotExistsUtil(String pathStr) throws IOException {
        Path path = Paths.get(pathStr);
        if (Files.notExists(path)) {
            Files.createDirectories(path);
            return;
        }
    }
}
