package com.itwanger.thirtyone;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
class ReferenceTypeDemo {
    public static void main(String[] args) {
        String name = "二哥";
        modify(name);
        System.out.println(name);
    }

    private static void modify(String name1) {
        name1 = "三妹";
    }
}
