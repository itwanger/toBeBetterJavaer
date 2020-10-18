package com.itwanger.hutool.crypto;

import cn.hutool.crypto.SecureUtil;
import cn.hutool.crypto.symmetric.AES;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class SecureUtilDemo {
    static AES aes = SecureUtil.aes();
    public static void main(String[] args) {
        String encry = aes.encryptHex("沉默王二");
        System.out.println(encry);
        String oo = aes.decryptStr(encry);
        System.out.println(oo);
    }

}
