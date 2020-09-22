package com.itwanger.thirtythree;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class ReferParentMethod {
    public static void main(String[] args) {
        new Dog1().work();
    }
}

class Animal1 {
    void eat() {
        System.out.println("吃...");
    }
}

class Dog1 extends Animal1 {
    @Override
    void eat() {
        System.out.println("吃...");
    }

    void bark() {
        System.out.println("汪汪汪...");
    }

    void work() {
        super.eat();
        bark();
    }
}