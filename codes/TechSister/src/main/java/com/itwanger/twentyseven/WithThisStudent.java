package com.itwanger.twentyseven;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class WithThisStudent {
    String name;
    int age;

    WithThisStudent(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void out() {
        System.out.println(name+" " + age);
    }

    public static void main(String[] args) {
        WithThisStudent s1 = new WithThisStudent("沉默王二", 18);
        WithThisStudent s2 = new WithThisStudent("沉默王三", 16);

        s1.out();
        s2.out();
    }
}
