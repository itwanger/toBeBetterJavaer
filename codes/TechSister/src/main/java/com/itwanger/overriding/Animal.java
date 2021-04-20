package com.itwanger.overriding;

import java.io.IOException;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public abstract class Animal implements Wuti{
    protected void eat() { }

    static void sleep() {
        System.out.println("动物在睡觉");
    }
}
