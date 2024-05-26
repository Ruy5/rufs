package top.feli.wlt.model;

import lombok.Data;

@Data
public class SimpleData {
     private String url;
     private String alt;
     private String href;

     public SimpleData(String url, String alt, String href) {
         this.url = url;
         this.alt = alt;
         this.href = href;
     }

}
