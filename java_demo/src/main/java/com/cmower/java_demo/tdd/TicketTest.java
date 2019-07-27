package com.cmower.java_demo.tdd;

import static org.junit.Assert.*;

import java.math.BigDecimal;

import org.junit.Before;
import org.junit.Test;

public class TicketTest {
	
	private Ticket ticket;

	@Before
	public void setUp() throws Exception {
		ticket = new Ticket();
	}

	@Test
	public void testOne() {
		BigDecimal total = new BigDecimal("99");
		
		assertEquals(total, ticket.sale(1));
	}
	
	@Test(expected=IllegalArgumentException.class)
	public void testNegative() {
		ticket.sale(-1);
	}
	
	@Test
	public void testZero() {
		assertEquals(BigDecimal.ZERO, ticket.sale(0));
	}
	
	@Test
	public void test1000() {
		assertEquals(new BigDecimal(99000), ticket.sale(1000));
	}

}
