package com.cmower.java_demo.thinkingjava.fanxing;

class Arraylist2<E extends Wanger> {
    private Object[] elementData;
    private int size = 0;

    public Arraylist2(int initialCapacity) {
        this.elementData = new Object[initialCapacity];
    }

    public boolean add(E e) {
        elementData[size++] = e;
        return true;
    }

    E elementData(int index) {
        return (E) elementData[index];
    }
}