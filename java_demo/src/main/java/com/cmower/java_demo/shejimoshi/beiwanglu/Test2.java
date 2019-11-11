package com.cmower.java_demo.shejimoshi.beiwanglu;

public class Test2 {

    public static void main(String[] args) throws CloneNotSupportedException {
        Originator2 originator = new Originator2();
        originator.setState("出门前");
        System.out.println(originator.getState());

        // 备份
        originator.createMemento();

        originator.setState("出门后，忘带钥匙了");
        System.out.println(originator.getState());

        // 恢复
        originator.restoreMemento();
        System.out.println("恢复后 " + originator.getState());
    }

}
