package com.cmower.java_demo.stackoverflow;

import java.util.Arrays;
import java.util.stream.Stream;

public class PrintArray {
    public static void main(String[] args) {
String [] cmowers = {"沉默","王二","一枚有趣的程序员"};
System.out.println(cmowers);

        Arrays.asList(cmowers).stream().forEach(s -> System.out.println(s));
        Stream.of(cmowers).forEach(System.out::println);
        Arrays.stream(cmowers).forEach(System.out::println);

        System.out.println(Arrays.toString(cmowers));

for(int i = 0; i < cmowers.length; i++){
    System.out.println(cmowers[i]);
}

for (String s : cmowers) {
    System.out.println(s);
}

StringBuilder b = new StringBuilder();
b.append('[');
for (int i = 0; i < cmowers.length; i++) {
    b.append(cmowers[i]);
    b.append(", ");
}
b.delete(b.length()-2,b.length());
b.append(']');
System.out.println(b);

String[][] deepArray = new String[][] {{"沉默", "王二"}, {"一枚有趣的程序员"}};
System.out.println(Arrays.deepToString(deepArray));
    }
}
