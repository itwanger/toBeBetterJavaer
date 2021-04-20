package com.itwanger.jvm;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class Dup {
    int age;
    public int incAndGet() {
        return ++age;
    }

public void lcmp(long a, long b) {
    if(a > b){}
}

public void fi() {
    int a = 0;
    if (a == 0) {
        a = 10;
    } else {
        a = 20;
    }
}

public void compare() {
    int i = 10;
    int j = 20;
    System.out.println(i > j);
}

public void switchTest(int select) {
    int num;
    switch (select) {
        case 1:
            num = 10;
            break;
        case 2:
        case 3:
            num = 30;
            break;
        default:
            num = 40;
    }
}
}
