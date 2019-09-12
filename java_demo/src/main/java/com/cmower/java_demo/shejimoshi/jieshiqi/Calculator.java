package com.cmower.java_demo.shejimoshi.jieshiqi;

import java.util.HashMap;
import java.util.Stack;

public class Calculator {
    public static int cal(String expression, HashMap<String, Integer> var) {
        // 后进先出（LIFO, Last In First Out）
        Stack<Expression> stack = new Stack<>();

        Expression left = null, right = null;
        char[] chars = expression.toCharArray();
        for (int i = 0, n = chars.length; i < n; i++) {
            char c = chars[i];
            switch (c) {
            case '+':
                left = stack.pop();
                right = new VarExpression(chars[++i]);
                stack.push(new AddExpression(left, right));
                break;
            case '-':
                left = stack.pop();
                right = new VarExpression(chars[++i]);
                stack.push(new SubExpression(left, right));
                break;

            default:
                stack.push(new VarExpression(c));
                break;
            }
        }
        
        return stack.pop().interpreter(var);
    }
}
