package com.itwanger.thirtyfive;

import java.util.Random;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class StringInternDemo1 {
    static final int MAX = 1000 * 10000;
    static final String[] arr = new String[MAX];

    public static void main(String[] args) throws Exception {
        Integer[] DB_DATA = new Integer[10];
        Random random = new Random(10 * 10000);
        for (int i = 0; i < DB_DATA.length; i++) {
            DB_DATA[i] = random.nextInt();
        }
        long t = System.currentTimeMillis();
        for (int i = 0; i < MAX; i++) {
            arr[i] = new String(String.valueOf(DB_DATA[i % DB_DATA.length]));
        }

        System.out.println((System.currentTimeMillis() - t) + "ms");
    }
}
