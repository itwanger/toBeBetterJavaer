package com.cmower.java_demo.effective.effectiv;

import java.util.ArrayList;
import java.util.List;

class Writer {
	private Integer age;
	private String name;

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public static void main(String[] args) {
//		long t1 = System.currentTimeMillis();
//		Long sum = 0L;
//
//		for (int i = 0; i < Integer.MAX_VALUE; i++) {
//			sum += i;
//		}
//
//		System.out.println(sum);
//
//		long t2 = System.currentTimeMillis();
//		System.out.println(t2 - t1);
		
//Integer chenmo = new Integer(10);
//Integer wanger = new Integer(10);
//
//System.out.println(chenmo == wanger); // false
//System.out.println(chenmo.equals(wanger )); // true

Integer chenmo  = 10;  // 自动装箱
int wanger = chenmo;     // 自动拆箱
	}
}


