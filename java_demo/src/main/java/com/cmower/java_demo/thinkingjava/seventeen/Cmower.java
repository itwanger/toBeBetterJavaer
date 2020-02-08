package com.cmower.java_demo.thinkingjava.seventeen;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class Cmower {

	public static void main(String[] args) {
int[] ints = new int[3];
ints[0] = 1;
ints[1] = 2;

System.out.println(ints.length); // 输出3

String[] strs = {"沉", "默","王", "二"};

List<String> list = Arrays.asList(strs);
System.out.println(list);
// 输出[沉, 默, 王, 二]

String[] strs1 = new String[list.size()];
System.out.println(Arrays.toString(list.toArray(strs1)));
// 输出 [沉, 默, 王, 二]

String[] strs2 = new String[5];
System.out.println(Arrays.toString(list.toArray(strs2)));
// 输出 [沉, 默, 王, 二, null]

String[] strs3 = new String[1];
System.out.println(Arrays.toString(list.toArray(strs3)));
// 输出 [沉, 默, 王, 二]

String[] strs4 = {};
System.out.println(Arrays.toString(list.toArray(strs4)));
// 输出 [沉, 默, 王, 二]

	}

}
