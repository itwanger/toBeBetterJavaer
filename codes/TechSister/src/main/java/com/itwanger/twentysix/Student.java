package com.itwanger.twentysix;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class Student {
    String name;
    int age;
    static String school = "郑州大学";

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public static void main(String[] args) {
        Student s1 = new Student("沉默王二", 18);
        Student s2 = new Student("沉默王三", 16);
    }
}
