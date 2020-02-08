package com.cmower.java_demo.jackson;

public class Cmower {
    private Integer age;
    private String name;

    public Cmower() {
    }

    public Cmower(Integer age, String name) {
        this.age = age;
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
