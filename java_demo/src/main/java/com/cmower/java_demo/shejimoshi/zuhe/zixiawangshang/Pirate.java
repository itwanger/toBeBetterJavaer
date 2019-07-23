package com.cmower.java_demo.shejimoshi.zuhe.zixiawangshang;

public abstract class Pirate {
    
    private Pirate parent;

    public Pirate getParent() {
        return parent;
    }

    public void setParent(Pirate parent) {
        this.parent = parent;
    }

    public void snatchGoldCoins() {
        System.out.println("抢金币了");
    }

}
