package com.cmower.java_demo.dongtaidaili;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

// 动态代理类：实际调用被代理类的方法和属性的类
public class WriterHandler implements InvocationHandler {
    private Object target;
     public WriterHandler(Object target) {
         this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("invoke");
        Object result = method.invoke(target, args);
        return result;
    }

}
