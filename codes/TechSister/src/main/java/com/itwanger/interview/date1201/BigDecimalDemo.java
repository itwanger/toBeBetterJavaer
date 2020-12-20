package com.itwanger.interview.date1201;

import java.math.BigDecimal;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/12/1
 */
public class BigDecimalDemo {
    public static void main(String[] args) {
BigDecimal bd1 = new BigDecimal("2.0");
BigDecimal bd2 = new BigDecimal("2.00");

System.out.println("equals: " + bd1.equals(bd2));
System.out.println("compareTo: " + bd1.compareTo(bd2));
    }
}
