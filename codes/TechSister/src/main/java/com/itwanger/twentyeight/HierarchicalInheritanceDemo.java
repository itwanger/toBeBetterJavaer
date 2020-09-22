package com.itwanger.twentyeight;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */

class Animal2 {
    void eat() {
        System.out.println("吃...");
    }
}

class Dog2 extends Animal2 {
    void bark() {
        System.out.println("汪汪汪...");
    }
}

class Cat extends Animal2 {
    void meow() {
        System.out.println("喵喵喵...");
    }
}

public class HierarchicalInheritanceDemo {
    public static void main(String[] args) {
        Cat c = new Cat();
        c.meow();
        c.eat();

        Dog2 d = new Dog2();
        d.bark();
        d.eat();
    }
}
