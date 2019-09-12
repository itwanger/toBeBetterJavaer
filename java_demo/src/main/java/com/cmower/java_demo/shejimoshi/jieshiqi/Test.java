package com.cmower.java_demo.shejimoshi.jieshiqi;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Test {

    public static void main(String[] args) throws IOException {
        System.out.print("请输入表达式");
        String expression = new BufferedReader(new InputStreamReader(System.in)).readLine();
        List<String> list = new ArrayList<>();
        for (char c : expression.toCharArray()) {
            if (c != '+' && c != '-') {
                list.add(String.valueOf(c));
            }
        }

        System.out.print("请依次输入数值，逗号分隔");
        String value = new BufferedReader(new InputStreamReader(System.in)).readLine();
        String[] values = value.split(",");

        HashMap<String, Integer> var = new HashMap<>();
        for (int i = 0, n = list.size(); i < n; i++) {
            var.put(list.get(i), Integer.parseInt(values[i]));
        }

        System.out.println(Calculator.cal(expression, var));

    }

}
