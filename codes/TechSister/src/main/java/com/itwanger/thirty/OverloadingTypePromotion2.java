package com.itwanger.thirty;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class OverloadingTypePromotion2 {
    void sum(long a, int b) {
        System.out.println("long int");
    }

    void sum(int a, long b) {
        System.out.println("int long");
    }

    public static void main(String args[]) {
        OverloadingTypePromotion2 obj = new OverloadingTypePromotion2();
//        obj.sum(20, 20);
    }
}
