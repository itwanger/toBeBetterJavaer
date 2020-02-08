package com.cmower.java_demo.orther;

import java.util.Date;

public class NiubiUtil {
	public static Date getNextDay() {
		long millis = 24 * 60 * 60 * 1000;
		try {
			Thread.sleep(millis);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return new Date(System.currentTimeMillis());
	}
}
