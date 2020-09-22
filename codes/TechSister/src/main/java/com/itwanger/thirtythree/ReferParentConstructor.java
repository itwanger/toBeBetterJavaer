package com.itwanger.thirtythree;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class ReferParentConstructor {
    public static void main(String[] args) {
        new Dog2();
    }
}

class Animal2 {
    Animal2(){
        System.out.println("动物来了");
    }
}

class Dog2 extends Animal2 {
    Dog2() {
        System.out.println("狗狗来了");
    }
}