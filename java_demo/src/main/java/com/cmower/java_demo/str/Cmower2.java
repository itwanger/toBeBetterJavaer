package com.cmower.java_demo.str;

import com.cmower.java_demo.Wanger;

public class Cmower2 {

	public static void main(String[] args) {
String chenmo = "沉默";
String wanger = "王二";

System.out.println(chenmo + wanger);

	}

	
public void test(Wanger wanger) {	
	if (wanger == null) {
		throw new RuntimeException("wanger 不能为空");
	}
	
	System.out.println(wanger.toString());
}
}

