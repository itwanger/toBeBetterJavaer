package com.cmower.java_demo.thinkingjava.ioc;

public class Laofang {
    public static Heshang getSaodiseng() {
        Xiaoer xiaoer = new Xiaoer();
        if (xiaoer.isYijinjing()) {
            return new Xiaosan();
        }
        return xiaoer;
    }
}
