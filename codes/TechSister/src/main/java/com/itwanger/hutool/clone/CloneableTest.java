package com.itwanger.hutool.clone;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class CloneableTest implements Cloneable {
    public static void main(String[] args) throws CloneNotSupportedException {
        CloneableTest cloneableTest = new CloneableTest();
        CloneableTest clone1 = (CloneableTest) cloneableTest.clone();
    }
}
