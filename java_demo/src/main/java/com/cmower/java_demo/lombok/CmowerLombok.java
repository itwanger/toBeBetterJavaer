package com.cmower.java_demo.lombok;

import java.math.BigDecimal;

import lombok.Data;

@Data
class CmowerLombok {
	private int age;
	private String name;
	private BigDecimal money;
}
