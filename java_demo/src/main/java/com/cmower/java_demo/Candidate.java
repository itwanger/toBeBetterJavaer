package com.cmower.java_demo;

class Candidate implements Cloneable {
	private String name;
	
	public Candidate(String name) {
		this.name = name;
	}
	
	public void deliverResume() {
		System.out.println(getName() + "发简历");
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public Candidate clone() {
		try {
			return (Candidate) super.clone();
		} catch (CloneNotSupportedException e) {
			return null;
		}
	}

}
