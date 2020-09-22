package com.itwanger.thirtyfive;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
class Father{
    void say() {
        System.out.println("老子说");
    }
}
public class Child extends Father {
    @Override
    void say() {
        System.out.println("孩子说");
    }

    public static void main(String[] args) {
        Father f = new Child();
        f.say();
    }
}
