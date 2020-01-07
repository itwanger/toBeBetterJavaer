package com.cmower.java_demo.thinkingjava.ioc;

public class Xiaoer implements Heshang {

    @Override
    public void saodi() {
        System.out.println("小二我在扫达摩院的地");        
    }

    public boolean isYijinjing() {
        // 星期三的时候小二和尚要练易筋经
        return false;
    }
}
