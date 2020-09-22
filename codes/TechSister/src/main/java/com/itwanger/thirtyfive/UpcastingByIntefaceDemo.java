package com.itwanger.thirtyfive;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
interface I {}
class A1{}
class B1 extends A1 implements I {}
public class UpcastingByIntefaceDemo {
    I i = new B1();
}
