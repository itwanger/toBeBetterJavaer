package com.cmower.java_demo.shejimoshi.beiwanglu;

public class Test {

    public static void main(String[] args) {
        Originator originator = new Originator();
        Memento param = originator.createMemento();
        originator.restoreMemento(param);
    }

}
