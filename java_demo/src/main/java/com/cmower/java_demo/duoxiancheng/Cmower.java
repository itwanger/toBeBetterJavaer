package com.cmower.java_demo.duoxiancheng;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

public class Cmower {

    public static AtomicInteger count = new AtomicInteger();

    public static int getCount() {
        return count.get();
    }

    public static void addCount() {
        count.incrementAndGet();
    }

    public static void main(String[] args) {
        ExecutorService executorService = new ThreadPoolExecutor(10, 1000, 60L, TimeUnit.SECONDS,
                new ArrayBlockingQueue<Runnable>(10));

        for (int i = 0; i < 1000; i++) {
            Runnable r = new Runnable() {

                @Override
                public void run() {
                    Cmower.addCount();
                }
            };
            executorService.execute(r);
        }
        executorService.shutdown();
        System.out.println(Cmower.count);
    }

}
