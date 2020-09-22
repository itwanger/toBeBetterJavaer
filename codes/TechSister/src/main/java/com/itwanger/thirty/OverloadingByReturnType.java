package com.itwanger.thirty;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class OverloadingByReturnType {
    public static void main(String[] args) {
        System.out.println(Adder2.add(10, 19));
        System.out.println(Adder2.add(10, 19));
    }
}

class Adder2 {
    static int add(int a, int b) {
        return a + b;
    }

//    static double add(int a, int b) {
//        return a + b;
//    }
}