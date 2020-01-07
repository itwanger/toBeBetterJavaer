package com.cmower.java_demo.thinkingjava.ioc;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Test {

    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("application.xml");
        Laowang laowang = (Laowang) context.getBean("laowang");
        laowang.mingling();
    }

}
