package com.itwanger.eleven;

/**
 * 微信搜索「沉默王二」，回复 Java
 */
public class LogicalOperator {
    public static void main(String[] args) {
        int a=10;
        int b=5;
        int c=20;
        System.out.println(a<b&&a<c);//false && true = false

        System.out.println(a>b||a<c);//true || true = true
    }
}
