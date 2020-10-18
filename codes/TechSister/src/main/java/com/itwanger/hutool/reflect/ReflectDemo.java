package com.itwanger.hutool.reflect;

import cn.hutool.core.util.ReflectUtil;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class ReflectDemo {
    private int id;

    public ReflectDemo() {
        System.out.println("构造方法");
    }

    public void print() {
        System.out.println("我是沉默王二");
    }

    public static void main(String[] args) throws IllegalAccessException {
        // 构建对象
        ReflectDemo reflectDemo = ReflectUtil.newInstance(ReflectDemo.class);

        // 获取构造方法
        Constructor[] constructors = ReflectUtil.getConstructors(ReflectDemo.class);
        for (Constructor constructor : constructors) {
            System.out.println(constructor.getName());
        }

        // 获取字段
        Field field = ReflectUtil.getField(ReflectDemo.class, "id");
        field.setInt(reflectDemo, 10);
        // 获取字段值
        System.out.println(ReflectUtil.getFieldValue(reflectDemo, field));

        // 获取所有方法
        Method[] methods = ReflectUtil.getMethods(ReflectDemo.class);
        for (Method m : methods) {
            System.out.println(m.getName());
        }

        // 获取指定方法
        Method method = ReflectUtil.getMethod(ReflectDemo.class, "print");
        System.out.println(method.getName());


        // 执行方法
        ReflectUtil.invoke(reflectDemo, "print");
    }
}
