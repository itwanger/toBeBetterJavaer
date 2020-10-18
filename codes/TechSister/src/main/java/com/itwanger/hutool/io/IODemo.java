package com.itwanger.hutool.io;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.IoUtil;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class IODemo {
    public static void main(String[] args) {
BufferedInputStream in = FileUtil.getInputStream("hutool/origin.txt");
BufferedOutputStream out = FileUtil.getOutputStream("hutool/to.txt");
long copySize = IoUtil.copy(in, out, IoUtil.DEFAULT_BUFFER_SIZE);
    }
}
