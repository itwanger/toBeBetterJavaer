package com.itwanger.thirtythree;


/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class StringTest {

    public void test() {
        int i = 8;
        while ((i -= 3) > 0);
        System.out.println("i = " + i);
    }

    public static void main(String[] args) {
        StringTest hello = new StringTest();
        for (int i = 0; i < 50_000; i++) {
            hello.test();
        }
    }

}
