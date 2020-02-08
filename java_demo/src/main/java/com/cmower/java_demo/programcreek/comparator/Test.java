package com.cmower.java_demo.programcreek.comparator;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        Cmower wanger = new Cmower(19, "沉默王二");
        Cmower wangsan = new Cmower(16, "沉默王三");
        Cmower wangyi = new Cmower(28, "沉默王一");

        List<Cmower> list = new ArrayList<>();
        list.add(wanger);
        list.add(wangsan);
        list.add(wangyi);

        Collections.sort(list, new CmowerNameComparator());

        for (Cmower c : list) {
            System.out.println(c.getName());
        }

    }
}
