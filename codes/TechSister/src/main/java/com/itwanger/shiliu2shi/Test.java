package com.itwanger.shiliu2shi;

import cn.hutool.core.util.CharsetUtil;
import cn.hutool.core.util.HexUtil;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class Test {
    public static void main(String[] args) {
        System.out.println("十六进制转十进制 " + Integer.parseInt("0037",16));

        System.out.println(HexUtil.decodeHexStr("37"));

        int shi = 50;
        System.out.println(shi + "十进制转十六进制" + Integer.toHexString(shi));

        String str = "ConstantValue";
        String strResult = HexUtil.encodeHexStr(str, CharsetUtil.CHARSET_UTF_8);
        System.out.println(str + "字符串转十六进制" + strResult + " 字节大小" + strResult.length() / 2);

        System.out.println("十六进制转二进制" + hexStringToByte("0020"));

        System.out.println(Integer.toHexString(0x0001 | 0x0020));
    }

    public static String hexStringToByte(String hex) {
        int i = Integer.parseInt(hex, 16);
        String str2 = Integer.toBinaryString(i);
        return str2;
    }
}
