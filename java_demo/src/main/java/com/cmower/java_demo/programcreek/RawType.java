package com.cmower.java_demo.programcreek;

import java.util.ArrayList;
import java.util.List;

public class RawType {
public static void main(String[] args) {
    List<String> list2 = new ArrayList<>();
    list2.add("沉默王二");
    unsafeAdd(list2, 18);
    String s = list2.get(0);
    System.out.println(s);

}

private static void unsafeAdd(List list, Object o) {
    list.add(o);
}
}
