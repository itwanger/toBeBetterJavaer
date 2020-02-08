package com.cmower.java_demo.programcreek.comparator;

import java.util.Comparator;

public class CmowerComparator implements Comparator<Cmower> {
    @Override
    public int compare(Cmower o1, Cmower o2) {
        return o1.getAge() - o2.getAge();
    }
}
