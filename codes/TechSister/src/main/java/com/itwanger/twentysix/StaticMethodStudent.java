package com.itwanger.twentysix;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class StaticMethodStudent {
    String name;
    int age;
    static String school = "郑州大学";

    public StaticMethodStudent(String name, int age) {
        this.name = name;
        this.age = age;
    }

    static void change() {
        school = "河南大学";
    }

    void out() {
        System.out.println(name + " " + age + " " + school);
    }

    public static void main(String[] args) {
        StaticMethodStudent.change();

        StaticMethodStudent s1 = new StaticMethodStudent("沉默王二", 18);
        StaticMethodStudent s2 = new StaticMethodStudent("沉默王三", 16);

        s1.out();
        s2.out();
    }
}
