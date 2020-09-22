package com.itwanger.twentysix;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class StaticBlock {
    static {
        System.out.println("静态代码块");
    }

    public static void main(String[] args) {
        System.out.println("main 方法");
    }
}
