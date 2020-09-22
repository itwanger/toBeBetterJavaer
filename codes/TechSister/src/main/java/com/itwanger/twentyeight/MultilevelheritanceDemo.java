package com.itwanger.twentyeight;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */

class Animal1 {
    void eat() {
        System.out.println("吃...");
    }
}

class Dog1 extends Animal1 {
    void bark() {
        System.out.println("叫唤...");
    }
}

class BabyDog extends Dog1 {
    void weep() {
        System.out.println("嗷嗷地哭...");
    }
}

class MultilevelInheritanceDemo {
    public static void main(String[] args) {
        BabyDog d = new BabyDog();
        d.weep();
        d.bark();
        d.eat();
    }
}
