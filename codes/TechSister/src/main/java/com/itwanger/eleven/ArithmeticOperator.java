package com.itwanger.eleven;

/**
 * 微信搜索「沉默王二」，回复 Java
 */
public class ArithmeticOperator {
    public static void main(String[] args) {
        int a = 10;
        int b = 5;

        System.out.println(a + b);//15
        System.out.println(a - b);//5
        System.out.println(a * b);//50
        System.out.println(a / b);//2
        System.out.println(a % b);//0

        b = 3;
        System.out.println(a + b);//13
        System.out.println(a - b);//7
        System.out.println(a * b);//30
        System.out.println(a / b);//3
        System.out.println(a % b);//1

        float c = 3.0f;
        double d = 3.0;
        System.out.println(a / c); // 3.3333333
        System.out.println(a / d); // 3.3333333333333335
        System.out.println(a % c); // 1.0
        System.out.println(a % d); // 1.0

System.out.println(10.0 / 0.0);
System.out.println(0.0 / 0.0);
        System.out.println(10 / 0);
    }
}
