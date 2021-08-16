package com.itwanger.s39;

import java.lang.reflect.Method;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class ReflectionDemo2 {
    public static void target(int i) {
        new Exception("#" + i).printStackTrace();
    }

    public static void main(String[] args) throws Exception {
        Class<?> klass = Class.forName("com.itwanger.s39.ReflectionDemo2");
        Method method = klass.getMethod("target", int.class);
        for (int i = 0; i < 20; i++) {
            method.invoke(null, i);
        }
    }
}
