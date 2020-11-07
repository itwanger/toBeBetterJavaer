package com.itwanger.nine;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class LocalVar {
    private int a;
    static int b;

    public static void main(String[] args) {
        LocalVar lv = new LocalVar();
        System.out.println(lv.a);
        System.out.println(b);
    }
}
