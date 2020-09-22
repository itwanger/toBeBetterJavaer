package com.itwanger.twentynine;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class Employee {
    String name;
    Address address;

    public Employee(String name, Address address) {
        this.name = name;
        this.address = address;
    }

    void out() {
        System.out.println(name + " " + address.country + " " + address.state + " " + address.city);
    }

    public static void main(String[] args) {
        new Employee("沉默王二", new Address("洛阳", "河南", "中国")).out();
    }
}
