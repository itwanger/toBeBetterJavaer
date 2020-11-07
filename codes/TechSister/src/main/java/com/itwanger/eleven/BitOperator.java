package com.itwanger.eleven;

/**
 * 微信搜索「沉默王二」，回复 Java
 */
public class BitOperator {
    public static void main(String[] args) {
        int a = 60, b = 13;
        System.out.println("a 的二进制：" + Integer.toBinaryString(a)); // 111100
        System.out.println("b 的二进制：" + Integer.toBinaryString(b)); // 1101

        int c = a & b;
        System.out.println("a & b：" + c + "，二进制是：" + Integer.toBinaryString(c));

        c = a | b;
        System.out.println("a | b：" + c + "，二进制是：" + Integer.toBinaryString(c));

        c = a ^ b;
        System.out.println("a ^ b：" + c + "，二进制是：" + Integer.toBinaryString(c));

        c = ~a;
        System.out.println("~a：" + c + "，二进制是：" + Integer.toBinaryString(c));

        c = a << 2;
        System.out.println("a << 2：" + c + "，二进制是：" + Integer.toBinaryString(c));

        c = a >> 2;
        System.out.println("a >> 2：" + c + "，二进制是：" + Integer.toBinaryString(c));

        c = a >>> 2;
        System.out.println("a >>> 2：" + c + "，二进制是：" + Integer.toBinaryString(c));
    }
}
