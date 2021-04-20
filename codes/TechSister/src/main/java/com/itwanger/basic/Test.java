package com.itwanger.basic;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.Objects;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class Test {
    public static void main(String[] args) {
        Student s1 = new Student(18, "张三");
        Map<Student, Integer> scores = new HashMap<>();
        scores.put(s1, 98);
        System.out.println(scores.get(new Student(18, "张三")));
    }
}
 class Student {
     private int age;
     private String name;

     public Student(int age, String name) {
         this.age = age;
         this.name = name;
     }

     @Override
     public boolean equals(Object o) {
         Student student = (Student) o;
         return age == student.age &&
                 Objects.equals(name, student.name);
     }

 }