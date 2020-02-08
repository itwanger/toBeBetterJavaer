package com.cmower.java_demo.orther;

public class Test12 {

    public static void main(String[] args) {
// 1
//int a = 100;
//Integer b = 100;
//System.out.println(a == b);
//
//// 2
//Integer c = 100;
//Integer d = 100;
//System.out.println(c == d);
//
//// 3
//c = 200;
//d = 200;
//System.out.println(c == d);
        
        long t1 = System.currentTimeMillis();
        Long sum = 0L;
        for (int i = 0; i < Integer.MAX_VALUE;i++) {
            sum += i;
        }
        long t2 = System.currentTimeMillis();        
        System.out.println(t2-t1);
        
        
         t1 = System.currentTimeMillis();
        long sum1 = 0L;
        for (int i = 0; i < Integer.MAX_VALUE;i++) {
            sum1 += i;
        }
         t2 = System.currentTimeMillis();        
        System.out.println(t2-t1);
    }

}

