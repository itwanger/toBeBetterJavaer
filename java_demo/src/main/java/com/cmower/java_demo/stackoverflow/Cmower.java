package com.cmower.java_demo.stackoverflow;

import java.util.Arrays;
import java.util.Objects;

public class Cmower {

    public static void main(String[] args) {
//        String alita = new String("小萝莉");
//        String luolita = new String("小萝莉");
//
//        System.out.println(alita == luolita); // false
//        System.out.println(alita.equals(luolita)); // false
        
        
String alita = "小萝莉";
String luolita = "小萝莉";

System.out.println(alita == luolita);  // true
System.out.println(alita.equals(luolita)); // true

System.out.println("小萝莉" == "小" + "萝莉");

System.out.println(Objects.equals("小萝莉",new String("小" + "萝莉")));


System.out.println(Objects.equals(null,new String("小" + "萝莉")));

String a = null;
//System.out.println(a.equals(new String("小" + "萝莉")));

System.out.println( null == null);

    }

}


