package com.itwanger.seven;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class Test {
    public static void main(String[] args) {
        ClassLoader loader = Test.class.getClassLoader();
        while (loader != null) {
            System.out.println(loader);
            loader = loader.getParent();
        }
    }
}
