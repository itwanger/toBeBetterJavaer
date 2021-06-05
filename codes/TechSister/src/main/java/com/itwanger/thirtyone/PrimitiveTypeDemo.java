package com.itwanger.thirtyone;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
class PrimitiveTypeDemo {
    public static void main(String[] args) {
        int age = 18;
        modify(age);
        System.out.println(age);
    }

    private static void modify(int age1) {
        age1 = 30;
    }

}
