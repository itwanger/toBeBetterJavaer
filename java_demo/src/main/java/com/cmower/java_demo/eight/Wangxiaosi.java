package com.cmower.java_demo.eight;

public class Wangxiaosi extends Wangsi {
	public void write() {
		System.out.println("记住仇恨，表明我们要奋发图强的心智");
	}

	public void eat() {
		System.out.println("我不喜欢读书，我就喜欢吃");
	}

	public static void main(String[] args) {
		Wangsi[] wangsis = { new Wangsi(), new Wangxiaosi() };

		// wangsis[1]能够向下转型
		((Wangxiaosi) wangsis[1]).write();
		// wangsis[0]不能向下转型
		((Wangxiaosi)wangsis[0]).write();
	}
}

class Wangsi {
	public void write() {
		System.out.println("勿忘国耻");
	}

	public void read() {
		System.out.println("每周读一本好书");
	}
}