package com.cmower.java_demo.programcreek;

import java.util.ArrayList;
import java.util.List;

public class LengthTest {
    public static void main(String[] args) {
int[] arr = new int[4];
arr[0] = 0;
arr[1] = 1;
arr[2] = 2;
arr[3] = 3;
System.out.println(arr.length);//length for array

int [] arr1 = {0, 1, 2, 3};
String str = "沉默王二";
System.out.println(str.length());//length() for string

Object arr2 = new int[4];
System.out.println(arr2.getClass());

Object arr3 = new String[4];
System.out.println(arr3.getClass());

        List<String> list = new ArrayList<>();
        list.size();

    }
}
