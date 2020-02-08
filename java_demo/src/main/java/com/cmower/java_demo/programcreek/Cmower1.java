package com.cmower.java_demo.programcreek;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

public class Cmower1 {

    public static void main(String[] args) {
String[] arr = new String[10000];

Random s = new Random();
for(int i=0; i< 10000; i++){
    arr[i] = String.valueOf(s.nextInt());
}
//use list
long startTime = System.nanoTime();
for (int i = 0; i < 100000; i++) {
    useList(arr, "真牛逼");
}
long endTime = System.nanoTime();
long duration = endTime - startTime;
System.out.println("useList:  " + duration / 1000000);

//use set
startTime = System.nanoTime();
for (int i = 0; i < 100000; i++) {
    useSet(arr, "真牛逼");
}
endTime = System.nanoTime();
duration = endTime - startTime;
System.out.println("useSet:  " + duration / 1000000);

//use loop
startTime = System.nanoTime();
for (int i = 0; i < 100000; i++) {
    useLoop(arr, "真牛逼");
}
endTime = System.nanoTime();
duration = endTime - startTime;
System.out.println("useLoop:  " + duration / 1000000);

// 使用二分查找
startTime = System.nanoTime();
for (int i = 0; i < 100000; i++) {
    useArraysBinarySearch(arr, "真牛逼");
}
endTime = System.nanoTime();
duration = endTime - startTime;
System.out.println("useArraysBinarySearch:  " + duration / 1000000);
    }

    public static boolean useList(String[] arr, String targetValue) {
        return Arrays.asList(arr).contains(targetValue);
    }

    public static boolean useSet(String[] arr, String targetValue) {
        Set<String> set = new HashSet<String>(Arrays.asList(arr));
        return set.contains(targetValue);
    }

    public static boolean useLoop(String[] arr, String targetValue) {
        for (String s : arr) {
            if (s.equals(targetValue))
                return true;
        }
        return false;
    }

public static boolean useArraysBinarySearch(String[] arr, String targetValue) {
    int a = Arrays.binarySearch(arr, targetValue);
    if (a > 0)
        return true;
    else
        return false;
}
}
