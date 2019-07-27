package com.cmower.java_demo.tdd;

import java.math.BigDecimal;

public class Ticket {
	private final static int PRICE = 99;

	public BigDecimal sale(int count) {
		if (count < 0) {
			throw new IllegalArgumentException("销量不能为负数");
		}
		
		return new BigDecimal(PRICE * count);
	}

}
