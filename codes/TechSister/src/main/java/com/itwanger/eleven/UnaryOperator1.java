package com.itwanger.eleven;

/**
 * 微信搜索「沉默王二」，回复 Java
 */
public class UnaryOperator1 {
    public static void main(String[] args) {
        int x = 10;
        System.out.println(x++);//10 (11)
        System.out.println(++x);//12
        System.out.println(x--);//12 (11)
        System.out.println(--x);//10


int y = ++x;
System.out.println(y + " " + x);

x = 10;
y = x++;
System.out.println(y + " " + x);
    }
}
