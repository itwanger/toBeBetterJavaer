package com.cmower.java_demo;

class Interviewer {
	private Candidate candidate;
	
	public Interviewer (Candidate candidate) {
		this.candidate = candidate;
	}
	
	public void receviveResume() {
		System.out.println("收到" + getCandidate().getName() + "简历");
	}

	public void notifyInterview() {
		System.out.println("通知" + getCandidate().getName() + "面试");
	}

	public Candidate getCandidate() {
		Candidate candidate = new Candidate(this.candidate.getName());
		return candidate;
	}

	public void setCandidate(Candidate candidate) {
		this.candidate = candidate;
	}

}
