package com.cmower.java_demo.thinkingjava.nine.strategy;

interface Coach {
	void defend();
}

class Hesai implements Coach {

	@Override
	public void defend() {
		System.out.println("防守赢得冠军");
	}
}

class Guatu implements Coach {

	@Override
	public void defend() {
		System.out.println("进攻就是最好的防守");
	}
}

public class Demo {
	public static void defend(Coach coach) {
		coach.defend();
	}
	
	public static void main(String[] args) {
		defend(new Hesai());
		defend(new Guatu());
	}
}