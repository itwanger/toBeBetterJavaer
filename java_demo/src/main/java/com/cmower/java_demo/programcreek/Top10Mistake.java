package com.cmower.java_demo.programcreek;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class Top10Mistake {
    public static void main(String[] args) {
//List<String> list = new ArrayList<String>(Arrays.asList("沉", "默", "王", "二"));
//        for (int i = 0; i < list.size(); i++) {
//            list.remove(i);
//        }
//        System.out.println(list);

//for(String s : list) {
//    if ("沉".equals(s)) {
//       list.remove(s);
//    }
//}
//
//System.out.println(list);

//Iterator<String> iter = list.iterator();
//while (iter.hasNext()) {
//    String s = iter.next();
//
//    if (s.equals("沉")) {
//        iter.remove();
//    }
//}
//
//System.out.println(list);

    List<String> list = new ArrayList<String>();
    add(list, 18);
    add(list, "沉默王二");
    String s = list.get(0);
    }

    public static void add(List list, Object o){
        list.add(o);
    }
}
