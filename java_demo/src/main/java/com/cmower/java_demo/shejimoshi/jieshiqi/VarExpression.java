package com.cmower.java_demo.shejimoshi.jieshiqi;

import java.util.HashMap;

public class VarExpression extends Expression {
    private char key;

    public VarExpression(char key) {
        this.key = key;
    }

    @Override
    int interpreter(HashMap<String, Integer> var) {
        return var.get(String.valueOf(this.key));
    }

}
