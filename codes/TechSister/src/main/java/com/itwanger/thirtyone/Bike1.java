package com.itwanger.thirtyone;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class Bike1 extends Vehicle1 {
    @Override
    void run() {
        System.out.println("自行车在跑");
    }

    public static void main(String[] args) {
        Bike bike = new Bike();
        bike.run();
    }
}

class Vehicle1 {
    void run() {
        System.out.println("车辆在跑");
    }
}