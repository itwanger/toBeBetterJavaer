package com.itwanger.interview.date1201;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/12/1
 */
public class StaticOrrideTest {
    public static void main(String[] args) {
        Laozi zi = new Xiaozi();
        zi.write();
    }
}
class Laozi{
    public static void write() {
        System.out.println("老子写了一本《基督山伯爵》");
    }
}
class Xiaozi extends Laozi {
    public static void write() {
        System.out.println("小子写了一本《茶花女》");
    }
}