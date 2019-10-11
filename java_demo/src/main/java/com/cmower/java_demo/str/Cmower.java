package com.cmower.java_demo.str;

public class Cmower {

	public static void main(String[] args) {
		String cmower = "沉默王二，一个有趣的程序员";

		System.out.println(new StringBuilder(cmower).reverse());
		// 员序程的趣有个一，二王默沉

		System.out.println(new StringBuffer(cmower).reverse());

		char[] cmowers = cmower.toCharArray();
		StringBuilder sb = new StringBuilder();
		for (int i = cmowers.length - 1; i >= 0; i--) {
			sb.append(cmowers[i]);
		}
		System.out.println(sb);

		int length = cmower.length();
		String reverse = "";
		for (int i = 0; i < length; i++) {
			reverse = cmower.charAt(i) + reverse;
		}

		System.out.println(reverse);

char[] array = cmower.toCharArray();
int end = cmower.length() - 1;
int halfLength = end / 2;
for (int i = 0; i <= halfLength; i++) {
	char temp = array[i];
	array[i] = array[end - i];
	array[end - i] = temp;
}

System.out.println(new String(array));
	}

}


