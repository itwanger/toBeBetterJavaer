package com.cmower.java_demo.str;

import java.nio.charset.Charset;
import java.util.Arrays;

import org.apache.commons.lang3.StringUtils;

public class Cmower1 {

	public static void main(String[] args) {
		String n = null;
		System.out.println(StringUtils.upperCase(n));
		
String idstr = "沉默王二";

if (idstr == null || idstr.isEmpty()) {
	
}

System.out.println(idstr.isEmpty());

System.out.println(idstr.replace("四", "三"));


byte [] bytes = idstr.getBytes(Charset.forName("UTF-8"));
String result = new String(bytes,Charset.forName("UTF-8"));
System.out.println(result);


for (int i = 0; i < idstr.length(); i++) {
	System.out.println(idstr.charAt(i));
}

int index = idstr.indexOf("4");
if (index != -1) {
	System.out.println(idstr.substring(0, index));
}





String[] ids = idstr.split(",");
System.out.println(Arrays.asList(ids)); // [12, 13, 14, 15]
		
		System.out.println(Arrays.asList("12".split(",")));
		System.out.println(Arrays.asList("12,13,14,15".split("-")));
		
		System.out.println("沉默".equals("王二"));
		System.out.println("沉默".concat("王二"));
	}

}
