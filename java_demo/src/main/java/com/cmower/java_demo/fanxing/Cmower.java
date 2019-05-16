package com.cmower.java_demo.fanxing;

public class Cmower {
    
    public static void main(String[] args) {
        Arraylist<Wanger> list = new Arraylist<>(4);
        
        Wanger wanger = new Wanger();
        list.add(wanger);
        
        Wangxiaoer wangxiaoer = new Wangxiaoer();
        list.add(wangxiaoer);
        
        Arraylist<? extends Wanger> list1 = list;
        Wanger w = list1.get(1);
        System.out.println(w);
        
        System.out.println(list1.contains(wangxiaoer));
    }

}
