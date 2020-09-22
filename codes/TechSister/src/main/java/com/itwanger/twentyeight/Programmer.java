package com.itwanger.twentyeight;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
class Employee {
    float salary = 40000;
}

class Programmer extends Employee {
    int bonus = 10000;

    public static void main(String args[]) {
        Programmer p = new Programmer();

        System.out.println("程序员的薪水是 " + p.salary);
        System.out.println("程序员的奖金是:" + p.bonus);
    }
}
