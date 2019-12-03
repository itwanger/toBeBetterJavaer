package com.cmower.java_demo.stackoverflow;

import java.util.Arrays;
import java.util.Objects;
import java.util.stream.Stream;

public class Cmower1 {
public static void main(String[] args) {
String[] names = { "沉", "默", "王", "二" };

    for (String name : names) {
        System.out.println(name);
    }

    Arrays.asList(names).forEach(System.out::println);
    Stream.of(names).forEach(System.out::println);

}
}
