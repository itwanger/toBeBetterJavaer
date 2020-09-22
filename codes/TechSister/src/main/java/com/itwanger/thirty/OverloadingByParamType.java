package com.itwanger.thirty;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class OverloadingByParamType {
    public static void main(String[] args) {
        System.out.println(Adder1.add(10, 19));
        System.out.println(Adder1.add(10.1, 19.2));
    }
}

class Adder1 {
    static int add(int a, int b) {
        return a + b;
    }

    static double add(double a, double b) {
        return a + b;
    }
}