package com.cmower.java_demo.thinkingjava.eleven;

import java.util.PriorityQueue;

public class WriterAndReader implements Comparable<WriterAndReader> {
	static PriorityQueue<WriterAndReader> queue = new PriorityQueue<WriterAndReader>();

	private String name;

	public WriterAndReader(String name) {
		this.name = name;
	}

	@Override
	public int compareTo(WriterAndReader o) {
		// o为之前的
		if (this.getName().equals("王二")) {
			return -1;
		}
		return this.getName().compareTo(o.getName());
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public String toString() {
		return this.getName();
	}

	public static void main(String[] args) {
		
		// 第一次，没有发生比较，因为只有一个
		queue.add(new WriterAndReader("读者2"));
		// 第二次，与第一次放入的比较，发现读者1比读者2小
		queue.add(new WriterAndReader("读者1"));
		// 第三次，与读者1进行比较，发现王二小；但不不知道为什么又重新比较了一下读者1与读者2
		queue.add(new WriterAndReader("王二"));
		
		while (!queue.isEmpty()) {
			System.out.println(queue.poll());
		}
	}
}
