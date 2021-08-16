package com.itwanger.s43;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class ThrowDemo {
    static void checkEligibilty(int stuage){
        if(stuage<18) {
            throw new ArithmeticException("年纪未满 18 岁，禁止观影");
        } else {
            System.out.println("请认真观影!!");
        }
    }

public static void main(String args[]){
//        checkEligibilty(10);
//        System.out.println("愉快地周末..");

    try {
        myMethod1();
    } catch (ArithmeticException e) {
        // 算术异常
    } catch (NullPointerException e) {
        // 空指针异常
    }
}
public static void myMethod1() throws ArithmeticException, NullPointerException{
    // 方法签名上声明异常
}

public void myMethod() {
    try {
        // 可能抛出异常
    } catch (ArithmeticException e) {
        // 算术异常
    } catch (NullPointerException e) {
        // 空指针异常
    }
}


}
