package com.cmower.java_demo.thinkingjava.eight;

//子类继承父类
public class Wangxiaosan extends Wangsan {
	private int age = 3;
	public Wangxiaosan(int age) {
		this.age = age;
		System.out.println("王小三的年龄：" + this.age);
	}
	
	public void write() { // 子类覆盖父类方法
		System.out.println("我小三上幼儿园的年龄是：" + this.age);
	}
	
	public static void main(String[] args) {
		new Wangxiaosan(4);
//		上幼儿园之前
//		我小三上幼儿园的年龄是：0
//		上幼儿园之后
//		王小三的年龄：4
	}
}

class Wangsan {
	Wangsan () {
		System.out.println("上幼儿园之前");
		write();
		System.out.println("上幼儿园之后");
	}
	public void write() {
		System.out.println("老子上幼儿园的年龄是3岁半");
	}
}