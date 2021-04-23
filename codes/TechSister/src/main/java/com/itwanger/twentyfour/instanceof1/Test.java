package com.itwanger.twentyfour.instanceof1;

import cn.hutool.core.lang.Assert;

import java.util.ArrayList;
import java.util.List;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class Test {
    public static void main(String[] args) {
        Ring ring = new Ring();
        System.out.println(ring instanceof Round);

Circle circle = new Circle();
System.out.println(circle instanceof Circle);

        System.out.println(circle instanceof Round);
        System.out.println(circle instanceof Shape);
//System.out.println(circle instanceof Triangle);


Thread thread = new Thread();
System.out.println(thread instanceof Object);
    }
}
class Round {
}
class Ring extends Round {
}

interface Shape {
}

class Circle extends Round implements Shape {
}
class Triangle implements Shape {
}