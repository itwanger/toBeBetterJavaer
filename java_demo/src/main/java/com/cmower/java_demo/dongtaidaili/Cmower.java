package com.cmower.java_demo.dongtaidaili;

import java.lang.reflect.Proxy;

public class Cmower {

    public static void main(String[] args) {
        WriterImpl writer = new WriterImpl();
        WriterHandler writerHandler = new WriterHandler(writer);
        
        Writer proxy = (Writer) Proxy.newProxyInstance(WriterImpl.class.getClassLoader(),
                WriterImpl.class.getInterfaces(), writerHandler);
        proxy.writeWords();
    }

}
