package com.itwanger.eight;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class InstanceVariable {
    int data = 88;
    public static void main(String[] args) {
        InstanceVariable iv = new InstanceVariable();
        System.out.println(iv.data); // 88
    }
}
