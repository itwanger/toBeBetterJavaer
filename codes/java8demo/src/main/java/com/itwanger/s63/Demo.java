package com.itwanger.s63;

import java.util.ArrayList;
import java.util.List;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class Demo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("沉默王二");
        list.add("沉默王三");
        list.add("一个文章真特么有趣的程序员");

        for (String str : list) {
            if ("沉默王二".equals(str)) {
                list.remove(str);
            }
        }

        System.out.println(list);
    }
}
