package com.itwanger;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Demo {
    public static void main(String[] args) {
        int a = 42;

//String [] wanger = {"沉", "默", "王", "二"};
//String wangsan [] = {"沉", "默", "王", "三"};


        List list = new ArrayList();
        list.add("沉默王二");
        list.add(18);

        List<String> nameList = new ArrayList<String>();
//nameList.add(18);

        System.out.println(multi1(null));


        String[] wanger = {"沉",
                "默", "王", "二"};
        String[] wangsan = {"沉", "默", "王", "三"};

Arrays.asList(wanger)
        .stream()
        .forEach(System.out::println);

Arrays.asList(wangsan)
        .stream()
        .forEach(System.out::println);
    }


    Integer multi(Object num) {
        if (!(num instanceof Integer)) {
            return null;
        } else if (num != null) {
            return (Integer) num * 2;
        }
        return null;
    }

    static Integer multi1(Object num) {
        if (num instanceof Integer) {
            return (Integer) num * 2;
        }
        return null;
    }

    void someMethod(int a, int b, int c) {
        if (a > 0) {
            if (b > 0) {
                if (c > 0) {
                    int result = a / b / c;
                }
            }
        }
    }

    void someMethod1(int a, int b, int c) {
        if (a < 0 || b < 0 || c < 0) {
            return;
        }
        int result = a / b / c;
    }
}
