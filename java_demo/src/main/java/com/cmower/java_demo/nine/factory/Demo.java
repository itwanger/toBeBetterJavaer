package com.cmower.java_demo.nine.factory;

interface Coach {
	void command();
}

interface CoachFactory {
	Coach createCoach();
}

class ACoach implements Coach {

	@Override
	public void command() {
		System.out.println("我是A级证书教练");
	}
	
}

class ACoachFactory implements CoachFactory {

	@Override
	public Coach createCoach() {
		return new ACoach();
	}
	
}

class CCoach implements Coach {

	@Override
	public void command() {
		System.out.println("我是C级证书教练");
	}
	
}

class CCoachFactory implements CoachFactory {

	@Override
	public Coach createCoach() {
		return new CCoach();
	}
	
}

public class Demo {
	public static void create(CoachFactory factory) {
		factory.createCoach().command();
	}
	
	public static void main(String[] args) {
		create(new ACoachFactory());
		create(new CCoachFactory());
	}
}