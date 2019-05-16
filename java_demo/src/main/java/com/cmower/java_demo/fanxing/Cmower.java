package com.cmower.java_demo.fanxing;

import java.util.Collections;

public class Cmower {

	public static void main(String[] args) {
		Arraylist<Wanger> list = new Arraylist<>(4);

		Wanger wanger = new Wanger();
		list.add(wanger);

		Wangxiaoer wangxiaoer = new Wangxiaoer();
		list.add(wangxiaoer);

		Arraylist<? extends Wanger> list1 = list;
		Wanger w = list1.get(1);
		System.out.println(w);

		System.out.println(list1.contains(wangxiaoer));
		
		System.out.println(list1 == list);

		Arraylist<? extends Wanger> list2 = new Arraylist<>(4);
		list2.add(null);
		// list2.add(new Wanger());
		// list2.add(new Wangxiaoer());

		Wanger w2 = list2.get(0);
		
Arraylist<? super Wanger> list3 = new Arraylist<>(4);
list3.add(new Wanger());
list3.add(new Wangxiaoer());

//Collections

//		Wanger w3 = list3.get(0);
		
		
	}

}
