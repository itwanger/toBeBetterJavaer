package com.itwanger.twentyfour;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class InstanceMethodExample {
    public static void main(String[] args) {
        InstanceMethodExample instanceMethodExample = new InstanceMethodExample();
        System.out.println(instanceMethodExample.add(1, 2));
    }

    public int add(int a, int b) {
        return a + b;
    }
}
