package top.feli.wlt.model;

import lombok.Data;

@Data
public class ResultData {
     private String url;
     private String alt;
     private String href;

     public ResultData(String url, String alt, String href) {
         this.url = url;
         this.alt = alt;
         this.href = href;
     }
}
