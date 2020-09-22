package com.itwanger.thirtyfour;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
class Car4{
    final void run () {
        System.out.println("开跑");
    }
}

class Honda2 extends Car4 {

}

public class FinalMethodInherited {
    public static void main(String[] args) {
        new Honda2().run();
    }
}
