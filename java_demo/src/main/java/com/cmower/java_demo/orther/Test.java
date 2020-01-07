package com.cmower.java_demo.orther;


public class Test {

	public static void main(String[] args) {
char c = '沉';
char a = '沉' + 1;
System.out.println(a); // 沊


char b = '王';
char d = '王' + 31;
System.out.println(d); // 玪

String str1 = String.valueOf(a) + String.valueOf(b);
System.out.println(str1); // 沊王

String str2 = String.valueOf(c) + String.valueOf(d);
System.out.println(str2); // 沉玪

System.out.println(str1.equals(str2)); // false
System.out.println(String. format("str1：%d | str2：%d",  str1. hashCode(),str2. hashCode()));
// str1：890945 | str2：890945
		
	}
}
