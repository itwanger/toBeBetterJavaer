package com.itwanger.hutool.zip;

import cn.hutool.core.util.ZipUtil;

import java.io.File;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class ZipUtilDemo {
    public static void main(String[] args) {
ZipUtil.zip("hutool", "hutool.zip");
File unzip = ZipUtil.unzip("hutool.zip", "hutoolzip");
    }
}
