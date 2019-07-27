package com.cmower.java_demo.jihe;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Cmower {
	public static void main(String[] args) {
		
List<String> list1 = new ArrayList<>();
list1.add("沉");
list1.add("默");
list1.add("王");
list1.add("二");

//Collections.sort(list1); // 先要排序
System.out.println(Collections.binarySearch(list1, "王")); // 2
	}
}


