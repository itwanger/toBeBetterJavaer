package com.itwanger.jvm;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class Writer {
    private String name;
    static String mark = "作者";

    public static void main(String[] args) {
        print(mark);
        Writer w = new Writer();
        print(w.name);
    }

    public static void print(String arg) {
        System.out.println(arg);
    }
}
