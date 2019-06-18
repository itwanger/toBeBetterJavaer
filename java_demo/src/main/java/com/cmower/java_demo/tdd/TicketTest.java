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
	public void test() {
		BigDecimal total = new BigDecimal("99");
		
		assertEquals(total, ticket.sale(1));
	}

}
