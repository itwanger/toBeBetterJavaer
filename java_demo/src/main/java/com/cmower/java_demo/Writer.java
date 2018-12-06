package com.cmower.java_demo;

class Writer {
	public Writer sleep() {
		System.out.println("睡一觉");
		return this;
	}
	
	public Writer ml() {
		System.out.println("做运动");
		return this;
	}
	
	public static void main(String[] args) {
		new Writer().ml().sleep();
	}
}
