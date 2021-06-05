package com.itwanger.thirty.copy1;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
class TestClone {
    public static void main(String[] args) throws CloneNotSupportedException {
        Writer writer1 = new Writer(18,"二哥");
        Writer writer2 = (Writer) writer1.clone();

        System.out.println("浅拷贝后：");
        System.out.println("writer1：" + writer1);
        System.out.println("writer2：" + writer2);

        writer2.setName("三妹");

        System.out.println("调整了 writer2 的 name 后：");
        System.out.println("writer1：" + writer1);
        System.out.println("writer2：" + writer2);
    }
}
