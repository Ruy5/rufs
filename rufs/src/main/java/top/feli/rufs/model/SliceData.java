package top.feli.rufs.model;

import lombok.Data;

@Data
public class SliceData {
    private String router;
    private String fileName;
    private String fileMd5;
    private Integer chunkSize;
    private Integer chunkCount;
    private String project;

    public SliceData(String router, String fileName, String fileMd5, Integer chunkSize, Integer chunkCount, String project) {
        this.router = router;
        this.fileName = fileName;
        this.fileMd5 = fileMd5;
        this.chunkSize = chunkSize;
        this.chunkCount = chunkCount;
        this.project = project;
    }
}
