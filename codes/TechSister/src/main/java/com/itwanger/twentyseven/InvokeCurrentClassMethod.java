package com.itwanger.twentyseven;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class InvokeCurrentClassMethod {
    void method1() {}
    void method2() {
        method1();
    }

    public static void main(String[] args) {
        new InvokeCurrentClassMethod().method1();
    }
}
