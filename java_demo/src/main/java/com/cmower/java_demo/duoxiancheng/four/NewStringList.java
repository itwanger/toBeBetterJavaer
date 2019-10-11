package com.cmower.java_demo.duoxiancheng.four;

public class NewStringList extends StringList {
	public synchronized void addIfNotExist(String s) {
		boolean isExist = myList.contains(s);
		if (!isExist) {
			myList.add(s);
		}
	}
}
