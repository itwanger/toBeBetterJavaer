package com.cmower.java_demo.thinkingjava.ioc;

public class Laowang {
    private Heshang saodiseng;
    
    public Laowang(Heshang saodiseng) {
        this.saodiseng = saodiseng;
    }
    public void mingling() {
       this.saodiseng.saodi();
    }
}
