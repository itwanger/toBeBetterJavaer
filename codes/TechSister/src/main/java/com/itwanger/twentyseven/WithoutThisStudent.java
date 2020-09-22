package com.itwanger.twentyseven;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class WithoutThisStudent {
    String name;
    int age;

    WithoutThisStudent(String name, int age) {
        name = name;
        age = age;
    }

    void out() {
        System.out.println(name+" " + age);
    }

    public static void main(String[] args) {
        WithoutThisStudent s1 = new WithoutThisStudent("沉默王二", 18);
        WithoutThisStudent s2 = new WithoutThisStudent("沉默王三", 16);

        s1.out();
        s2.out();
    }
}
