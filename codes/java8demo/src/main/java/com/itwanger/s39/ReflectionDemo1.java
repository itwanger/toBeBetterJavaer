package com.itwanger.s39;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class ReflectionDemo1 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException,
            InvocationTargetException, InstantiationException {
        Writer writer = new Writer();
        writer.setName("沉默王二");
        System.out.println(writer.getName());

        Class clazz = Class.forName("com.itwanger.s39.Writer");
        Constructor constructor = clazz.getConstructor();
        Object object = constructor.newInstance();

        // Method setNameMethod = clazz.getMethod("setName", String.class);
        // setNameMethod.invoke(object, "沉默王二");
        // Method getNameMethod = clazz.getMethod("getName");
        // System.out.println(getNameMethod.invoke(object));

        Method setAgeMethod = clazz.getMethod("setAge", int.class);
        for (int i = 0; i < 20; i++) {
            setAgeMethod.invoke(object, 18);
        }
    }
}
