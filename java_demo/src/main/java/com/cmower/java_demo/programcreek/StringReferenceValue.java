package com.cmower.java_demo.programcreek;

public class StringReferenceValue {
public static void main(String[] args) {
    StringBuilder x = new StringBuilder("沉默王二");
    change(x);
    System.out.println(x);
}

public static void change(StringBuilder x) {
    x.delete(3,4).append("三");
}
}
