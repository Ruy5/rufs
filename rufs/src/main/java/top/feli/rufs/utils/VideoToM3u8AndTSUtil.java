package top.feli.rufs.utils;

import java.io.*;

public class VideoToM3u8AndTSUtil {

    public static String getFilenameWithoutSuffix(String filename) {
        int lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex > 0) {
            return filename.substring(0, lastDotIndex);
        } else {
            return null;
        }
    }

    public static boolean convert(String srcPathname, String destPathname, String baseUrl) {
        try {
            System.out.println(srcPathname);
            System.out.println(baseUrl);
            System.out.println(destPathname);
            ProcessBuilder processBuilder = new ProcessBuilder("ffmpeg", "-i", srcPathname, "-c:v", "libx264", "-hls_time", "5",
                    "-hls_list_size", "0", "-c:a", "aac", "-strict", "-2", "-f", "hls", "-hls_base_url", baseUrl, destPathname);
            processBuilder.redirectErrorStream(true);

            Process process = processBuilder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            int exitCode = process.waitFor();
            System.out.println("FFmpeg process exited with code: " + exitCode);
            return true;
        } catch (IOException | InterruptedException e) {
            e.fillInStackTrace();
            return false;
        }
    }

    public static boolean write(InputStream inputStream, String filepath, String filename) throws IOException {
        File file = new File(filepath, filename);
        if (!file.getParentFile().exists() && !file.getParentFile().mkdirs()) {
            return false;
        }

        OutputStream outputStream = new FileOutputStream(file);
        byte[] buffer = new byte[1024];
        int bytesRead;
        while ((bytesRead = inputStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, bytesRead);
        }
        outputStream.close();
        inputStream.close();
        return true;
    }

}