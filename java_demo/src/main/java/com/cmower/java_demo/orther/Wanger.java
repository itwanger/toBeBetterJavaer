package com.cmower.java_demo.orther;

public class Wanger {

	public static void main(String[] args) {
Candidate qiuqiu = new Candidate("秋秋");
// 发送简历
qiuqiu.deliverResume();

Interviewer interviewer = new Interviewer(qiuqiu);
// 面试官接收到简历
interviewer.receviveResume();
// 面试官通知应聘者来面试
interviewer.notifyInterview();

Candidate temp = interviewer.getCandidate();
temp.setName("夏夏");

System.out.println(qiuqiu.getName());
	}
}
