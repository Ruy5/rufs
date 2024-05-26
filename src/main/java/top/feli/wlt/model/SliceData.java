package top.feli.wlt.model;

import lombok.Data;

@Data
public class SliceData {
    private String router;
    private String fileName;
    private String fileMd5;
    private Integer chunkSize;
    private Integer chunkCount;

    public SliceData(String router, String fileName, String fileMd5, Integer chunkSize, Integer chunkCount) {
        this.router = router;
        this.fileName = fileName;
        this.fileMd5 = fileMd5;
        this.chunkSize = chunkSize;
        this.chunkCount = chunkCount;
    }
}
