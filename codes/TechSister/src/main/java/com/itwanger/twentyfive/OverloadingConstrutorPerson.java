package com.itwanger.twentyfive;

/**
 * @author 沉默王二，一枚有趣的程序员
 */
public class OverloadingConstrutorPerson {
    private String name;
    private int age;
    private int sex;

    public OverloadingConstrutorPerson(String name, int age, int sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    public OverloadingConstrutorPerson(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void out() {
        System.out.println("姓名 " + name + " 年龄 " + age + " 性别 " + sex);
    }

    public static void main(String[] args) {
        OverloadingConstrutorPerson p1 = new OverloadingConstrutorPerson("沉默王二",18, 1);
        p1.out();

        OverloadingConstrutorPerson p2 = new OverloadingConstrutorPerson("沉默王三",16);
        p2.out();
    }
}


