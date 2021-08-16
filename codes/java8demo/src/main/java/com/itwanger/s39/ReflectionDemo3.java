package com.itwanger.s39;

import java.io.PrintStream;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class ReflectionDemo3 {
    public static void main(String[] args) throws ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {
//Class c1 = Class.forName("com.itwanger.s39.ReflectionDemo3");
//System.out.println(c1.getCanonicalName());
//
//Class c2 = Class.forName("[D");
//System.out.println(c2.getCanonicalName());
//
//Class c3 = Class.forName("[[Ljava.lang.String;");
//System.out.println(c3.getCanonicalName());

//Class c1 = ReflectionDemo3.class;
//System.out.println(c1.getCanonicalName());
//
//Class c2 = String.class;
//System.out.println(c2.getCanonicalName());
//
//Class c3 = int[][][].class;
//System.out.println(c3.getCanonicalName());

Class c1 = Writer.class;
Writer writer = (Writer) c1.newInstance();

Class c2 = Class.forName("com.itwanger.s39.Writer");
Constructor constructor = c2.getConstructor();
Object object = constructor.newInstance();

Constructor[] constructors1 = String.class.getDeclaredConstructors();
for (Constructor c : constructors1) {
    System.out.println(c);
}

        Method[] methods1 = System.class.getDeclaredMethods();
        for (Method m : methods1) {
            System.out.println(m);
        }
        Method[] methods2 = System.class.getMethods();
        for (Method m : methods2) {
            System.out.println(m);
        }
    }
}
