package com.itwanger.twentyfour;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class MyAbstractDemo extends AbstractDemo {
    @Override
    void display() {
        System.out.println("重写了抽象方法");
    }

    public static void main(String[] args) {
        MyAbstractDemo myAbstractDemo = new MyAbstractDemo();
        myAbstractDemo.display();
    }
}
