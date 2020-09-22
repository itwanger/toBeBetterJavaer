package com.itwanger.twentythree;

/**
 * @author 沉默王二，一枚有趣的程序员
 */
public class Person {
    private String name;
    private int age;
    private int sex;

    public Person() {
    }

    public Person(String name, int age, int sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    private void eat() {

    }

    private void sleep() {

    }

    private void dadoudou() {

    }

    public void initialize(String n, int a, int s) {
        name = n;
        age = a;
        sex = s;
    }

    public static void main(String[] args) {
        Person person = new Person("沉默王二",18,1);

        person.initialize("沉默王二",18,1);

        new Person().initialize("沉默王二",18,1);

        person.name = "沉默王二";
        person.age = 18;
        person.sex = 1;

        System.out.println(person.name);
        System.out.println(person.age);
        System.out.println(person.sex);

        Person person1 = new Person(), person2 = new Person();
    }
}


