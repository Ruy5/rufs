package top.feli.rufs.utils;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ChineseToUrlEncodeUtil {
    public static String transfrom(String input) {
        // 判断字符串中是否存在中文
        if (containsChinese(input)) {
            // 对中文进行URL编码
            return encodeChinese(input);
        } else {
            return input;
        }
    }

    // 判断字符串中是否存在中文
    private static boolean containsChinese(String input) {
        Pattern pattern = Pattern.compile("[\u4e00-\u9fa5]");
        Matcher matcher = pattern.matcher(input);
        return matcher.find();
    }

    // 对中文进行URL编码
    private static String encodeChinese(String input) {
        try {
            StringBuilder encodedString = new StringBuilder();
            for (char c : input.toCharArray()) {
                if (isChinese(c)) {
                    encodedString.append(URLEncoder.encode(String.valueOf(c), "UTF-8"));
                } else {
                    encodedString.append(c);
                }
            }
            return encodedString.toString();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return null;
        }
    }

    // 判断字符是否是中文
    private static boolean isChinese(char c) {
        return String.valueOf(c).matches("[\u4e00-\u9fa5]");
    }
}
