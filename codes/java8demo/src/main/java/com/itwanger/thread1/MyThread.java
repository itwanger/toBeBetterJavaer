package com.itwanger.thread1;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println(getName() + ":打了" + i + "个小兵");
        }
    }

    public static void main(String[] args) {
//创建MyThread对象
MyThread t1=new  MyThread();
MyThread t2=new  MyThread();
MyThread t3=new  MyThread();
//设置线程的名字
t1.setName("鲁班");
t2.setName("刘备");
t3.setName("亚瑟");
//启动线程
t1.start();
t2.start();
t3.start();
    }
}
