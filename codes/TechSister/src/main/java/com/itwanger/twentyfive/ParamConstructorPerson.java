package com.itwanger.twentyfive;

/**
 * @author 沉默王二，一枚有趣的程序员
 */
public class ParamConstructorPerson {
    private String name;
    private int age;

    public ParamConstructorPerson(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void out() {
        System.out.println("姓名 " + name + " 年龄 " + age);
    }

    public static void main(String[] args) {
        ParamConstructorPerson p1 = new ParamConstructorPerson("沉默王二",18);
        p1.out();

        ParamConstructorPerson p2 = new ParamConstructorPerson("沉默王三",16);
        p2.out();
    }
}


