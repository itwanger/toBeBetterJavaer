package com.itwanger.ten;

import cn.hutool.core.util.HexUtil;

import java.nio.charset.Charset;

public class Demo {
    public static void main(String[] args) {
        String wanger = "沉默王二";
        byte[] bytes = wanger.getBytes(Charset.forName("GBK"));
        String result = new String(bytes, Charset.forName("UTF-8"));
        System.out.println(result);

// 输出 efbfbdefbfbd
System.out.println(HexUtil.encodeHex("��", Charset.forName("UTF-8")));
// 借助 hutool 转成二进制
byte[] testBytes = HexUtil.decodeHex("efbfbdefbfbd");
// 使用 GBK 解码
String testResult = new String(testBytes, Charset.forName("GBK"));
// 输出锟斤拷
System.out.println(testResult);

char c = '沉';
String c1 = "\uD801\uDC37";
    }
}
