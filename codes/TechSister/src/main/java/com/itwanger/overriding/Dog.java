package com.itwanger.overriding;

import java.io.FileNotFoundException;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class Dog extends Animal {
   public void eat() {
       super.eat();
   }

    @Override
    public void move() {

    }

    static void sleep() {
        System.out.println("狗狗在睡觉");
    }
}
