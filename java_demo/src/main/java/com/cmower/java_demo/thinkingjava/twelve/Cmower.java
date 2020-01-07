package com.cmower.java_demo.thinkingjava.twelve;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Cmower {
	protected static Logger logger = LoggerFactory.getLogger(Cmower.class);
	public static void check(String input) {
		if (input == null) {
			throw new OrderException("输入值不能为空");
		}
		
		if (input.length() < 10) {
			throw new OrderException("字符串长度不能少于10个");
		}
	}

	public static void main(String[] args) {
		try {
			check(null);
		} catch (OrderException e) {
			logger.error(e.getMessage(), e);
		}
	}

}
