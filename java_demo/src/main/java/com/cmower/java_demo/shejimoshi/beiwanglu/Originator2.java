package com.cmower.java_demo.shejimoshi.beiwanglu;

public class Originator2 implements Cloneable {
    private String state = "";
    private Originator2 backup;

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
    
    public void createMemento() throws CloneNotSupportedException {
        backup = this.clone();
    }
    
    public void restoreMemento() {
        this.setState(backup.getState());
    }
    
    @Override
    protected Originator2 clone() throws CloneNotSupportedException {
        return (Originator2)super.clone();
    }
}
