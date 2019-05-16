package com.cmower.java_demo.fifteen;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

class Author {
	private String pen_name;
	private String real_name;
}

class Writer extends Author {
	private String honour;

	private void makeMoney() {
		System.out.println("很多很多钱");
	}
}

public class Test {
	public static void main(String[] args) {

		Class<Writer> c4 = Writer.class;
		System.out.println(c4.getName());

		try {
			Writer wangsan = c4.newInstance();
			System.out.println(wangsan);

			Field[] fields = c4.getDeclaredFields();
			
			for (Field field : fields) {
				
				System.out.println(field.getName());
			}
			
			Method[] methods = c4.getDeclaredMethods();
			for (Method method : methods) {
				System.out.println(method.getName());
			}
		} catch (InstantiationException | IllegalAccessException e1) {
			e1.printStackTrace();
		}

	}
}
