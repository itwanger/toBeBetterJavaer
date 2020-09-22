package com.itwanger.thirtyseven;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
class Car{
    void run(){
        System.out.println("跑");
    }
}
class Weilai extends  Car {
    @Override
    void run() {
        System.out.println("用电跑");
    }
}
public class CarDemo {
    public static void main(String[] args) {
        Car car = new Weilai();
        car.run();
    }
}
