package com.cmower.java_demo.thinkingjava.fanxing;

public class Collections {
	public static <T> void copy(Arraylist<? super T> dest, Arraylist<? extends T> src) {
		for (int i = 0; i < src.size(); i++)
			dest.set(i, src.get(i));
	}
}
