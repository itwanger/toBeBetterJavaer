package com.itwanger.thirty.copy4;

import java.io.IOException;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
class TestClone {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        Writer writer1 = new Writer(18,"二哥");
        Book book1 = new Book("编译原理",100);
        writer1.setBook(book1);

        Writer writer2 = (Writer) writer1.deepClone();
        System.out.println("深拷贝后：");

        System.out.println("writer1：" + writer1);
        System.out.println("writer2：" + writer2);

        Book book2 = writer2.getBook();
        book2.setBookName("永恒的图灵");
        book2.setPrice(70);
        System.out.println("writer2.book 变更后：");

        System.out.println("writer1：" + writer1);
        System.out.println("writer2：" + writer2);
    }
}
