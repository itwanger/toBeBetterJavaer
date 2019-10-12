package com.cmower.java_demo.str;

import java.util.Arrays;
import java.util.Objects;
import java.util.StringJoiner;

import org.apache.commons.lang3.StringUtils;

public class Cmower6 {

    public static void main(String[] args) {
        
         long t1 = System.currentTimeMillis();
         String liu = "六六六";
        String ss = liu + liu;
String result = "";
for (int i = 0; i < 100000; i++) {
    result += liu;
}
long t2 = System.currentTimeMillis();
System.out.println(t2-t1);

t1 = System.currentTimeMillis();
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 100000; i++) {
    sb.append(liu);
}
t2 = System.currentTimeMillis();
System.out.println(t2-t1);
    }

}
