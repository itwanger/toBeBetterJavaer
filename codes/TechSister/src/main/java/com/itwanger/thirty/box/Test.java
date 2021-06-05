package com.itwanger.thirty.box;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class Test {
    public static void main(String[] args) {
        long t1 = System.currentTimeMillis();
        long sum = 0L;
        for (int i = 0; i < Integer.MAX_VALUE;i++) {
            sum += i;
        }
        long t2 = System.currentTimeMillis();
        System.out.println(t2-t1);
    }
}
