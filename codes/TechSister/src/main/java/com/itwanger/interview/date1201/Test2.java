package com.itwanger.interview.date1201;

import com.google.gson.JsonNull;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/12/1
 */
public class Test2 {
    public static void main(String[] args) {
        char[] chars = new char[]{'\u0097'};
        String str = new String(chars);
        System.out.println(str);
        byte[] bytes = str.getBytes(Charset.forName("GB2312"));
        System.out.println(Arrays.toString(bytes));
    }
}
