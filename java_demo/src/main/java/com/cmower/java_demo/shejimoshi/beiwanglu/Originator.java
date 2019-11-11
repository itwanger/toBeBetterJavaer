package com.cmower.java_demo.shejimoshi.beiwanglu;

public class Originator {
    private String state = "";

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
    
    public Memento createMemento() {
        return new Memento(state);
    }
    
    public void restoreMemento(Memento param) {
        this.setState(param.getState());
    }
}
