package com.cmower.java_demo.thinkingjava.jiekou;

public class Wanger extends Author implements ContractBeihang, Contract51 {

	@Override
	void write() {
		System.out.println("作品《Web 全栈开发进阶之路》，读起来轻松惬意的技术书");
	}

	@Override
	public void scriptBeihang() {
		System.out.println("一年内完成书稿啊，不然要交违约金的哦。");
	}

	@Override
	public void script51() {
		System.out.println("王老师，先把 Java 云盘的大纲整理出来。");
	}
	
}
