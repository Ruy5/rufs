package top.feli.wlt.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RemoveNonAlphanumeric {
    // 匹配数字、字母、下划线、小数点、减号
    public static String transfrom(String path){
        Pattern pattern = Pattern.compile("[^0-9a-zA-Z_\\-.]");
        Matcher matcher = pattern.matcher(path);
        // 替换非匹配字符为空格
        String cleanedPath = matcher.replaceAll("");
        return cleanedPath;
    }

}
