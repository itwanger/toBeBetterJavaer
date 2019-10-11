package com.cmower.java_demo.str;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Cmower3 {

	public static void main(String[] args) {
List<String> list = new ArrayList<>();
list.add("沉默王二");
list.add("沉默王三");
list.add("一个文章真特么有趣的程序员");

Iterator<String> itr = list.iterator();

while (itr.hasNext()) {
	String str = itr.next();
	if ("沉默王二".equals(str)) {
		itr.remove();
	}
}

		System.out.println(list);
	}

}
