package com.itwanger.thirtytwo;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
class A{
    A get(){return this;}
}

public class B extends A{
    @Override
    B get() {
        return this;
    }

    void out() {
        System.out.println("返回类型协变");
    }

    public static void main(String[] args) {
        new B().get().out();
    }
}
