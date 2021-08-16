package com.itwanger.s47;

import java.util.HashMap;
import java.util.Map;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class Demo {
    public static void main(String[] args) {
        Object obj;
        HashMap map;

        Student s1 = new Student(18, "张三");
        Map<Student, Integer> scores = new HashMap<>();
        scores.put(s1, 98);

        Student s2 = new Student(18, "张三");
        System.out.println(scores.get(s2));

        System.out.println(s1.hashCode());
        System.out.println(s2.hashCode());
    }
}
