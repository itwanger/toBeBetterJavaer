package com.itwanger.s52;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class Demo {
    public static void main(String[] args) {
        logn(100);
    }

public static int sum(int n) {
    int sum = 0;
    for (int i=0;i<n;i++) {
        sum = sum + 1;
    }
    return sum;
}

public static void logn(int n) {
    int i = n;
    while (i > 0) {
        i /= 2;
        System.out.println(i);
    }
}
}
