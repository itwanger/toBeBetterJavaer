package com.cmower.java_demo.duoxiancheng.three;

public class Wanger {
	private static volatile boolean chenmo = false;

	public static void main(String[] args) {
		Thread thread = new Thread(new Runnable() {
			@Override
			public void run() {
				while (!chenmo) {
				}
			}
		});
		thread.start();
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		chenmo = true;

	}

}
