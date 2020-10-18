package com.itwanger.hutool.console;

import cn.hutool.core.lang.Console;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class ConsoleDemo {
    public static void main(String[] args) {
        // 打印字符串
        Console.log("沉默王二，一枚有趣的程序员");

        // 打印字符串模板
        Console.log("洛阳是{}朝古都",13);

        int [] ints = {1,2,3,4};
        // 打印数组
        Console.log(ints);
    }
}
