package com.itwanger.thirtyfour;

import java.util.ArrayList;
import java.util.List;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class Bike {
    List<String> list;

    {
        list = new ArrayList<>();
        list.add("沉默王二");
        list.add("沉默王三");
    }

    public static void main(String[] args) {
        System.out.println(new Bike().list);
    }
}
