package com.itwanger.thirtyfive;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class StringInternDemo2 {
    public static void main(String[] args) {
String s1 = new String("二哥三妹");
String s2 = s1.intern();
System.out.println(s1 == s2);
    }
}
