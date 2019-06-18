package com.cmower.java_demo.tdd;

import java.math.BigDecimal;

public class Ticket {

	public BigDecimal sale(int count) {
		if (count == 1) {
			return new BigDecimal("99");
		}
		return BigDecimal.ZERO;
	}

}
