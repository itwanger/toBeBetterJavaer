package com.itwanger.s46;

import java.util.ArrayList;
import java.util.Date;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class Demo {
    public static void main(String[] args) {
ArrayList<Integer> ints = new ArrayList<Integer>();
ArrayList<String> strs = new ArrayList<String>();
ArrayList list;
list = ints;
list = strs;

System.out.println(ints.getClass());
System.out.println(strs.getClass());

        ArrayList list1 = new ArrayList();
        list.add("沉默王二");
        list.add(new Date());

        String s = (String) list.get(1);
    }
}
