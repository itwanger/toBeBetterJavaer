package com.cmower.java_demo.fanxing;

import java.util.Arrays;

class Arraylist<E> {
    private Object[] elementData;
    private int size = 0;

    public Arraylist(int initialCapacity) {
        this.elementData = new Object[initialCapacity];
    }

    public boolean add(E e) {
        elementData[size++] = e;
        return true;
    }

    public E get(int index) {
        return (E) elementData[index];
    }

    public <T> T[] toArray(T[] a) {
        return (T[]) Arrays.copyOf(elementData, size, a.getClass());
    }
    
    public int indexOf(Object o) {
        if (o == null) {
            for (int i = 0; i < size; i++)
                if (elementData[i]==null)
                    return i;
        } else {
            for (int i = 0; i < size; i++)
                if (o.equals(elementData[i]))
                    return i;
        }
        return -1;
    }
    
    public boolean contains(Object o) {
        return indexOf(o) >= 0;
    }
    
    public String toString() {
        StringBuilder sb = new StringBuilder();
        
        for (Object o : elementData) {
            if (o != null) {
                E e = (E)o;
                sb.append(e.toString());
                sb.append(',').append(' ');
            }
        }
        return sb.toString();
    }
    
    public int size() {
        return size;
    }
    
    E elementData(int index) {
        return (E) elementData[index];
    }
    
    public E set(int index, E element) {

        E oldValue = elementData(index);
        elementData[index] = element;
        return oldValue;
    }
}