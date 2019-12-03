package com.cmower.java_demo.stackoverflow.c1;

public class Cmower {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static void main(String[] args) {
Cmower cmower = new Cmower();
cmower.setName("沉默王二");

Cmower old = cmower;
cmower.sop(cmower);
System.out.println("main 中的 cmower " + cmower.getName());

System.out.println(old == cmower);
    }

    public void sop(Cmower cmower) {
        cmower.setName("沉默王三");
        System.out.println("sop 中的 cmower " + cmower.getName());
    }
}
