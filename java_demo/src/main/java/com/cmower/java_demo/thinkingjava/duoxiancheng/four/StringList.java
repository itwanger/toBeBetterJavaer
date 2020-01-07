package com.cmower.java_demo.thinkingjava.duoxiancheng.four;

import java.util.ArrayList;
import java.util.List;

class StringList {
	protected List<String> myList = new ArrayList<>();
	
	public synchronized void addString(String s) {
		myList.add(s);
	}
	
	public synchronized void removeString(String s) {
		myList.remove(s);
	}
	
	public static void main(String[] args) {
		StringList stringList = new StringList();
		stringList.addString("沉默王二");
	}
}
