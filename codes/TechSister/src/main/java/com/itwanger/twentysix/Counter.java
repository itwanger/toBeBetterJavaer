package com.itwanger.twentysix;

import java.io.Serializable;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class Counter implements Serializable {
    int count = 0;

    Counter() {
        count++;
        System.out.println(count);
    }

    public static void main(String args[]) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        Counter c3 = new Counter();
    }
}
