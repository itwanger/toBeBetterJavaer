package com.itwanger.hutool.img;

import cn.hutool.core.img.ImgUtil;
import cn.hutool.core.io.FileUtil;

import java.awt.*;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class ImgUtilDemo {
    public static void main(String[] args) {
ImgUtil.scale(
        FileUtil.file("hutool/wangsan.jpg"),
        FileUtil.file("hutool/wangsan_small.jpg"),
        0.5f
);


ImgUtil.cut(
        FileUtil.file("hutool/wangsan.jpg"),
        FileUtil.file("hutool/wangsan_cut.jpg"),
        new Rectangle(200, 200, 100, 100)
);

ImgUtil.pressText(//
        FileUtil.file("hutool/wangsan.jpg"),
        FileUtil.file("hutool/wangsan_logo.jpg"),
        "沉默王二", Color.WHITE,
        new Font("黑体", Font.BOLD, 100),
        0,
        0,
        0.8f
);


    }
}
