package com.cmower.java_demo.thinkingjava.dongtaidaili;

// 被代理类（具体实现抽象接口的类）
public class WriterImpl implements Writer{

    @Override
    public void writeWords() {
        System.out.println("写个锤子");
    }

}
