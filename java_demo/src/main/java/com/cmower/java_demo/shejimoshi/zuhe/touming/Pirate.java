package com.cmower.java_demo.shejimoshi.zuhe.touming;

import java.util.List;

public abstract class Pirate {
    
    public abstract void add(Pirate pirate);
    public abstract void remove(Pirate pirate);
    public abstract List<Pirate> getChildren();

    public void snatchGoldCoins() {
        System.out.println("抢金币了");
    }

}
