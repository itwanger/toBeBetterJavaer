package com.cmower.java_demo.shejimoshi.zuhe.touming;

import java.util.List;

public class Diceng extends Pirate {
    public void snatchGoldCoins() {
        System.out.println("抢完金币，还得上交一大笔");
    }

    @Deprecated
    public void add(Pirate pirate) throws UnsupportedOperationException {
        throw new UnsupportedOperationException();
    }

    @Deprecated
    public void remove(Pirate pirate) throws UnsupportedOperationException {
        throw new UnsupportedOperationException();
    }

    @Deprecated
    public List<Pirate> getChildren() throws UnsupportedOperationException {
        throw new UnsupportedOperationException();
    }
}
