package com.cmower.java_demo.shejimoshi.zuhe.anquan;

import java.util.ArrayList;
import java.util.List;

public class Shangceng extends Pirate {
    private List<Pirate> component = new ArrayList<>();
    
    public void add(Pirate pirate) {
        component.add(pirate);
    }
    
    public void remove(Pirate pirate) {
        component.remove(pirate);
    }
    
    public List<Pirate> getChildren() {
        return this.component;
    }
}
