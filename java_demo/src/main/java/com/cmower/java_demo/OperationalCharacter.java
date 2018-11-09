package com.cmower.java_demo;

import java.math.BigDecimal;

public class OperationalCharacter {

	public static void main(String[] args) {
		int i = 520, j = 521;
		// 此时的i和j非常恩爱
		System.out.println("i=" + i + "，j=" + j); // 输出：i=520，j=521
		// 就当他俩结婚了
		i = j;
		// 然而i却疯了
		i = 250;
		// 但j却不为所动
		System.out.println("i=" + i + "，j=" + j); // 输出：i=250，j=521

		testTrueLove();

		// 穷光蛋a
		int a = 0;

		// 穷光蛋b
		Money b = new Money();
		b.coin = 0;

		testQuality(a, b);
		System.out.println("a=" + a + "，b.coin=" + b.coin);
		// 输出：a=0，b.coin=10000000

		double m = 6;
		double n = 6.4;
		double o = m * n;
		System.out.println("m=" + m + "，n=" + n + "，o=" + o);
		// 输出：m=6.0，n=6.4，o=38.400000000000006
		
		BigDecimal m1 = BigDecimal.valueOf(6);
		BigDecimal n1 = BigDecimal.valueOf(6.4);
		BigDecimal o1 = m1.multiply(n1);
		System.out.println("m1=" + m1 + "，n1=" + n1 + "，o1=" + o1);
		// 输出：m1=6，n1=6.4，o1=38.4
		
		BigDecimal m2 = new BigDecimal(6);
		BigDecimal n2 = new BigDecimal(6.4);
		BigDecimal o2 = m2.multiply(n2);
		System.out.println("m2=" + m2 + "，n2=" + n2 + "，o2=" + o2);
		// 输出：m2=6，n2=6.4000000000000003552713678800500929355621337890625，o2=38.4000000000000021316282072803005576133728027343750
		
		int p = 0;
		calculate(p);
		
		Integer q = 127;
		Integer r = 127;
		
		System.out.println(q == r);
		
		q = 128;
		r = 128;
		System.out.println(q == r);
		
		System.out.println(q.intValue() == r.intValue());
		System.out.println(q.compareTo(r) == 0);
		
		boolean flag = true;
		System.out.println(flag ? "点赞转发分享" : "踩死你丫的");
	}
	
	public static void calculate(int p) {
		if (p < 3) {
			// 其他
			calculate(++p);
		}
	}

	public static void testQuality(int a, Money b) {
		// 有钱了
		a = 10000000;
		b.coin = 10000000;
	}

	public static void testTrueLove() {
		Lover boy = new Lover();
		boy.level = 520;

		Lover girl = new Lover();
		girl.level = 521;

		// 此时的男孩和女孩非常恩爱
		System.out.println("boy.level=" + boy.level + "，girl.level=" + girl.level);
		// boy.level=520，girl.level=521

		// 就当他俩结婚了
		boy = girl;
		// 女孩不爱了
		girl.level = 582;

		// 男孩也不爱了
		System.out.println("boy.level=" + boy.level + "，girl.level=" + girl.level);
		// boy.level=582，girl.level=582
	}

}

class Lover {
	int level;
}

class Money {
	int coin;
}
