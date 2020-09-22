package com.itwanger.thirty;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class OverloadingTypePromotion {
    void sum(int a, long b) {
        System.out.println(a + b);
    }

    void sum(int a, int b, int c) {
        System.out.println(a + b + c);
    }

    public static void main(String args[]) {
        OverloadingTypePromotion obj = new OverloadingTypePromotion();
        obj.sum(20, 20);
        obj.sum(20, 20, 20);
    }
}
