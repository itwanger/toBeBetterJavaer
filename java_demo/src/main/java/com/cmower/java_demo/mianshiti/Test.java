package com.cmower.java_demo.mianshiti;

public class Test {

	public static void main(String[] args) {
		final StringBuilder sb = new StringBuilder("沉默");
		changeParam(sb);
		System.out.println(sb); // 输出 沉默王二
	}

	static void changeParam(final StringBuilder s) {
		System.out.println("参数为" + s);
		s.append("王二");
	}
}
