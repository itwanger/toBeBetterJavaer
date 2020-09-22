package com.itwanger.thirtyeight;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
class Animal {}
public class Dog extends Animal{
    public static void main(String[] args) {
//        Dog dog1 = (Dog)new Animal();

        Dog dog = new Dog();
        System.out.println(dog instanceof Dog);
        System.out.println(dog instanceof Animal);
    }
}
