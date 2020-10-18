package com.itwanger.hutool.dict;

import cn.hutool.core.date.DateTime;
import cn.hutool.core.lang.Dict;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class DictDemo {
    public static void main(String[] args) {
Dict dict = Dict.create()
        .set("age", 18)
        .set("name", "沉默王二")
        .set("birthday", DateTime.now());

int age = dict.getInt("age");
String name = dict.getStr("name");
        System.out.println(age + name);
    }
}
