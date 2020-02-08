package com.cmower.java_demo.thinkingjava.nine.adapter;

interface Coach {
	void defend();
	void attack();
	void physical();
}

abstract class TopCoach implements Coach {
	public void defend() {};
	public void attack() {};
	public void physical() {};
}

class Hesai extends TopCoach {
	public void defend() {
		System.out.println("防守赢得冠军");
	}
}

public class Demo {
	public static void defend(Coach coach) {
		coach.defend();
	}
	
	public static void main(String[] args) {
		Coach coach = new Hesai();
		coach.defend();
	}
}