package top.feli.rufs.model;

import lombok.Data;

@Data
public class Result<T> {
    private Integer errno;
    private T data;
    private String message;
    private String project;

    private Float schedule = 1.0f;

    public Result(Integer errno, String message) {
        this.errno = errno;
        this.message = message;
    }


    public Result(Integer errno, T data) {
        this.errno = errno;
        this.data = data;
    }

//    public static Result Ok(String url, String alt, String href){
//        Result result = new Result(0, url, alt, href);
//        return result;
//    }

    public static Result<SimpleData> OkUpload(String router, String fileName, String mediaType, String project) {
        String url = String.format("%s?filename=%s&mediaType=%s&project=%s", router, fileName, mediaType, project);
        return new Result<SimpleData>(0, new SimpleData(url, fileName, "http://localhost:1024" + url));
    }

    // fileName=%s&fileMd5=%s&chunkSize=%s&chunkCount=
    public static Result<SliceData> OkSliceUpload(
            String router, String fileName, String fileMd5, Integer chunkSize,Integer chunkCount,
            String project, Float schedule) {
        String url = String.format("%s?filename=%s&fileMd5=%s&project=%s&chunkCount=%s", router, fileName, fileMd5, project, chunkCount);
        Result<SliceData> sliceDataResult = new Result<>(0, new SliceData(router, fileName, fileMd5, chunkSize, chunkCount));
        sliceDataResult.schedule = schedule;
        return sliceDataResult;
    }
//    public static Re

    public static Result Error(String message){
        Result result = new Result(1, message);
        return result;
    }
}
