package com.itwanger.thirtyone;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class Bike extends Vehicle {
    public static void main(String[] args) {
        Bike bike = new Bike();
        bike.run();
    }
}

class Vehicle {
    void run() {
        System.out.println("车辆在跑");
    }
}