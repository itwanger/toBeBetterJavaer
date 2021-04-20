package com.itwanger.jvm;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class LocalVaraiablesTable {
    private void write(int age) {
        String name = "沉默王二";
    }

public static void method() {
    // ①
    if (true) {
        // ②
        String name = "沉默王二";
    }
    // ③
    if(true) {
        // ④
        int age = 18;
    }
    // ⑤
}

public void solt() {
    double d = 1.0;
    int i = 1;
}
}
