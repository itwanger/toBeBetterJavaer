package com.cmower.java_demo.ten;

public class Wanger {
	private int age;
	public Wanger(int age) {
		this.age = age;
	}
	
	class Thought {
		public void know() {
			System.out.println("沉默王二的年龄" + age);
		}
	}
	
	public Thought getThought() {
		return new Thought();
	}

	public static void main(String[] args) {
		Wanger wanger = new Wanger(29);
		Wanger.Thought thought = wanger.getThought();
		thought.know(); // 输出：沉默王二的年龄29
		
		// 使用.new的形式创建内部类对象
		Wanger.Thought thought1 = wanger.new Thought();
		thought1.know();
	}

}
