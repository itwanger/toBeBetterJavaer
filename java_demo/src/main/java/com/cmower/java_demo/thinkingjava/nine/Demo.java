package com.cmower.java_demo.thinkingjava.nine;

abstract class Coach {
	public abstract void defend();

	public abstract void attack();
}

class Hesai extends Coach {

	@Override
	public void defend() {
		System.out.println("防守赢得冠军");
	}

	@Override
	public void attack() {
		System.out.println("控球是把双刃剑");
	}
}

public class Demo {
	public static void name() {
		Coach moliniao = new Hesai();
		moliniao.defend();
		moliniao.attack();
	}
}