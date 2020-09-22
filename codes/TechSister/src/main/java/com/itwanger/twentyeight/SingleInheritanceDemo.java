package com.itwanger.twentyeight;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */

class Animal {
    void eat() {
        System.out.println("吃...");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("叫唤...");
    }
}

class SingleInheritanceDemo {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.bark();
        d.eat();
    }
}
