package com.cmower.java_demo.thinkingjava.ten;

public class Demo {

	public void test(String title) {
		Thread thread = new Thread(new Runnable() {

			@Override
			public void run() {
				// title = "我不要吃鸡";
				// 改变时会提示错误
				// 在封闭范围中定义的局部变量必须是final的。
				System.out.println(title);
			}
		});
		thread.start();
	}

	public static void main(String[] args) {
		for (int i = 0; i < 10; i++) {
			Demo demo = new Demo();
			demo.test("我要吃鸡" + i);
		}
	}
	
}
