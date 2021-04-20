package com.itwanger.junit;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/12/28
 */
public class Factorial {
    public static long fact(long n) {
        if (n < 0) {
            throw new IllegalArgumentException("参数不能小于 0");
        }
        long r = 1;
        for (long i = 1; i <= n; i++) {
            r = r * i;
        }
        return r;
    }
}

