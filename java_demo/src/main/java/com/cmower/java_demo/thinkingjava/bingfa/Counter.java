package com.cmower.java_demo.thinkingjava.bingfa;

public class Counter {
    private int value = 0;

    public synchronized int getValue() {
        return value;
    }

    public synchronized int increment() {
        if (value == Integer.MAX_VALUE) {
            throw new IllegalStateException("counter overflow");
        }
        return ++value;
    }
}
