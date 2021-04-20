package com.itwanger.jvm;

import java.util.ArrayList;
import java.util.List;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class InvokeExamples {
    private void run() {
        List ls = new ArrayList();
        ls.add("难顶");

        ArrayList als = new ArrayList();
        als.add("学不动了");
    }

    public static void print() {
        System.out.println("invokestatic");
    }

    public static void main(String[] args) {
        print();
        InvokeExamples invoke = new InvokeExamples();
        invoke.run();
    }
}
