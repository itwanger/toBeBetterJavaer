package com.itwanger.s62;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class Demo {
    public static void main(String[] args) {
//        List<Integer> list = new ArrayList<>();
//        for (Integer num : list) {
//            System.out.println(num);
//        }

        List<String> list = new LinkedList<>();
        list.add("沉默王二");
        list.add("沉默王三");
        list.add("沉默王四");

for (int i = 0; i < list.size(); i++) {
    System.out.print(list.get(i) + "，");
}

Iterator it = list.iterator();
while (it.hasNext()) {
    System.out.print(it.next() + "，");
}

for (String str : list) {
    System.out.print(str + "，");
}
    }
}
