package com.itwanger.interview.date1201;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/12/1
 */
public class CompareDemo {
    public static void main(String[] args) {
        List<Employee> list = new ArrayList<>();
        list.add(new Employee(1));
        list.add(new Employee(Integer.MIN_VALUE));
        list.add(new Employee(Integer.MAX_VALUE));
        Collections.sort(list);
        System.out.println(list);
    }
}

class Employee implements Comparable {
    private int id;

    public Employee(int id) {
        this.id = id;
    }

    @Override
    public int compareTo(Object o) {
        Employee emp = (Employee) o;
        return this.id - emp.id;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                '}';
    }
}