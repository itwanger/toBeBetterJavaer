package com.cmower.java_demo.programcreek;

public class LaoWang {
    private String name;

    public LaoWang(String name) {
        this.name = name;
    }
}

class XiaoWang extends LaoWang{

    public XiaoWang(String name) {
        super(name);
    }

}
