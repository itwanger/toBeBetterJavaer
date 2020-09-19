package com.cmower.java_demo.mkyoung;

import java.util.function.Predicate;

public class Java8Predicate {
    public static void main(String[] args) {
//Predicate<Integer> noGreaterThan5 = x -> x > 5;
//
//List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
//
//List<Integer> collect = list.stream()
//        .filter(noGreaterThan5)
//        .collect(Collectors.toList());
//
//System.out.println(collect); // [6, 7, 8, 9, 10]


//Predicate<Integer> noGreaterThan5 = x -> x > 5;
//Predicate<Integer> noLessThan8 = x -> x < 8;
//
//List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
//
//List<Integer> collect = list.stream()
//        .filter(noGreaterThan5.and(noLessThan8))
//        .collect(Collectors.toList());
//
//System.out.println(collect); // [6, 7]


//Predicate<String> lengthIs3 = x -> x.length() == 3;
//Predicate<String> startWithA = x -> x.startsWith("A");
//
//List<String> list = Arrays.asList("A", "AA", "AAA", "B", "BB", "BBB");
//
//List<String> collect = list.stream()
//        .filter(lengthIs3.or(startWithA))
//        .collect(Collectors.toList());
//
//System.out.println(collect); // [A, AA, AAA, BBB]

//Predicate<String> startWithA = x -> x.startsWith("A");
//
//List<String> list = Arrays.asList("A", "AA", "AAA", "B", "BB", "BBB");
//
//List<String> collect = list.stream()
//        .filter(startWithA.negate())
//        .collect(Collectors.toList());
//
//System.out.println(collect); //[B, BB, BBB]

Predicate<String> startWithA = x -> x.startsWith("王");

// 以王或者沉开头
boolean result = startWithA.or(x -> x.startsWith("沉")).test("沉默王二");
System.out.println(result);     // true


    }
}
