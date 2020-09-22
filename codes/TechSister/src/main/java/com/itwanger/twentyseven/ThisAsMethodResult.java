package com.itwanger.twentyseven;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class ThisAsMethodResult {
    ThisAsMethodResult getThisAsMethodResult() {
        return this;
    }

    void out() {
        System.out.println("hello");
    }

    public static void main(String[] args) {
        new ThisAsMethodResult().getThisAsMethodResult().out();
    }
}
