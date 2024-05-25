package top.feli.wlt.model;

import lombok.Data;

@Data
public class Result {
    private Integer errno;
    private ResultData data;

    private String message;

    public Result(Integer errno, String message) {
        this.errno = errno;
        this.message = message;
    }


    public Result(Integer errno, String url, String alt, String href) {
        this.errno = errno;
        this.data = new ResultData(url, alt, href);
    }

//    public static Result Ok(String url, String alt, String href){
//        Result result = new Result(0, url, alt, href);
//        return result;
//    }

    public static Result OkUpload(String router, String fileName, String mediaType, String project) {
        String url = String.format("%s?filename=%s&mediaType=%s&project=%s", router, fileName, mediaType, project);
        Result result = new Result(0, url, fileName, "http://localhost:1024" + url);
        return result;
    }


    public static Result Error(String message){
        Result result = new Result(1, message);
        return result;
    }
}
