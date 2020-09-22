package com.itwanger.thirtyfour;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class Car {
    Car() {
        System.out.println("构造方法");
    }

    {
        System.out.println("代码初始化块");
    }

    public static void main(String[] args) {
        new Car();
    }
}
