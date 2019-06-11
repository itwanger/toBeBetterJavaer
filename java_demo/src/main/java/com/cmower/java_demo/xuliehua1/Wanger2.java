package com.cmower.java_demo.xuliehua1;

import java.io.Serializable;

@SuppressWarnings("serial")
class Wanger2 implements Serializable {
	private String name;
	private int age;

	public Wanger2() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	@Override
	public String toString() {
		return "Wanger{" + "name=" + name + ",age=" + age + "}";
	}

}
