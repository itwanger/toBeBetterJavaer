package com.cmower.java_demo.thinkingjava.nine.inf;

interface Coach {
	// 隐式的public
	void defend();
	void attack();
}

interface Hero {
	void fight();
}


class Hesai implements Coach, Hero {

	@Override
	public void defend() {
		System.out.println("防守赢得冠军");
	}

	@Override
	public void attack() {
		System.out.println("控球是把双刃剑");
	}

	@Override
	public void fight() {
		System.out.println("只要一息尚存，就应该战斗到最后");
	}
}

public class Demo2 {
	public static void defend(Coach coach) {
		coach.defend();
	}
	
	public static void fight(Hero hero) {
		hero.fight();
	}
	
	public static void main(String[] args) {
		Hesai moliniao = new Hesai();
		defend(moliniao);
		fight(moliniao);
	}
	
	
}