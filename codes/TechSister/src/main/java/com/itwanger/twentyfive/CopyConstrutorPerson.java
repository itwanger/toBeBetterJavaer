package com.itwanger.twentyfive;

/**
 * @author 沉默王二，一枚有趣的程序员
 */
public class CopyConstrutorPerson {
    private String name;
    private int age;

    public CopyConstrutorPerson(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public CopyConstrutorPerson(CopyConstrutorPerson person) {
        this.name = person.name;
        this.age = person.age;
    }

    public void out() {
        System.out.println("姓名 " + name + " 年龄 " + age);
    }

    public static void main(String[] args) {
        CopyConstrutorPerson p1 = new CopyConstrutorPerson("沉默王二",18);
        p1.out();

        CopyConstrutorPerson p2 = new CopyConstrutorPerson(p1);
        p2.out();
    }
}


