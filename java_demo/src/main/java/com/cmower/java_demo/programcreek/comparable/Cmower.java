package com.cmower.java_demo.programcreek.comparable;

public class Cmower implements Comparable<Cmower> {
    private int age;
    private String name;

    public Cmower(int age, String name) {
        this.age = age;
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public int compareTo(Cmower o) {
        return this.getAge() - o.getAge();
    }

    public static void main(String[] args) {
        Cmower wanger = new Cmower(19,"沉默王二");
        Cmower wangsan = new Cmower(16,"沉默王三");

        if (wanger.compareTo(wangsan) < 0) {
            System.out.println(wanger.getName() + "比较年轻有为");
        } else {
            System.out.println(wangsan.getName() + "比较年轻有为");
        }
    }
}
