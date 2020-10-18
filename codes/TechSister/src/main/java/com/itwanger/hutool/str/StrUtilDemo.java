package com.itwanger.hutool.str;

import cn.hutool.core.util.StrUtil;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class StrUtilDemo {
    public static void main(String[] args) {
String template = "{}，一枚沉默但有趣的程序员，喜欢他的文章的话，请微信搜索{}";
String str = StrUtil.format(template, "沉默王二", "沉默王二");
        System.out.println(str);
    }
}
