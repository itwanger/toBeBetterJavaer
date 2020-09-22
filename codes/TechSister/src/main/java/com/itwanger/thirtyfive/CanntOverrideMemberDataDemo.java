package com.itwanger.thirtyfive;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
class Car{
    int speedLimit = 60;
}

class Honda extends Car {
    int speedLimit = 90;
}
public class CanntOverrideMemberDataDemo {
    public static void main(String[] args) {
        Car car = new Honda();
        System.out.println(car.speedLimit);
    }
}
