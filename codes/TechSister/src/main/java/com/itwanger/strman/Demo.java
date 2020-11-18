package com.itwanger.strman;

import strman.Strman;

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.function.Function.identity;
import static java.util.stream.Collectors.*;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/11/17
 */
public class Demo {
    public static void main(String[] args) {
        Strman.append("沉", "默", "王", "二");

        System.out.println(Strman.prepend("沉", "默", "王", "二"));

        String[] strs = {"默", "王", "二"};
        System.out.println(Strman.appendArray("沉", strs));


        System.out.println(Strman.at("沉默王二", 0));
        System.out.println(Strman.at("沉默王二", -1));
        System.out.println(Strman.at("沉默王二", 4));

        String[] results = Strman.between("[沉默王二][一枚有趣的程序员]", "[", "]");

        System.out.println(Arrays.toString(results));

        results = Strman.chars("沉默王二");
        System.out.println(Arrays.toString(results));

        Map<Character, Long> map = Strman.charsCount("沉默王二的妹妹叫沉默王三");

        System.out.println(map);

        System.out.println(Strman.collapseWhitespace("沉默王二       一枚有趣的程序员"));

        System.out.println(Strman.contains("沉默王二", "沉"));
        System.out.println(Strman.contains("Abbc", "A", false));


        System.out.println(Strman.containsAny("沉默王二", new String[]{"沉", "三"}));
        System.out.println(Strman.containsAny("沉默王二", new String[]{"沉默", "三"}));
        System.out.println(Strman.containsAny("沉默王二", new String[]{"不", "三"}));

        System.out.println(Strman.endsWith("沉默王二", "二"));
        System.out.println(Strman.endsWith("Abbc", "A", false));

        System.out.println(Strman.ensureLeft("沉默王二", "沉"));
        System.out.println(Strman.ensureLeft("默王二", "沉"));

        System.out.println(Strman.base64Encode("沉默王二"));
        System.out.println(Strman.base64Decode("5rKJ6buY546L5LqM"));
//        System.out.println(Strman.base64Decode("5rKJ6bu1Y546L5LqM"));

        System.out.println(Strman.binEncode("沉默王二"));

        System.out.println(Strman.binDecode("01101100100010011100111101101100001110011100010110100111010001100"));

        System.out.println(Strman.first("沉默王二", 0));
        System.out.println(Strman.first("沉默王二", 1));
        System.out.println(Strman.first("沉默王二", 2));

//        System.out.println(Strman.first("沉默王二", -1));

        System.out.println(Strman.head("沉默王二"));

        System.out.println(Strman.unequal("沉默王二", "沉默王三"));

        System.out.println(Strman.unequal("沉默王二", new String("沉默王二")));

        System.out.println(Strman.insert("沉默二", "王", 2));

        System.out.println(Strman.leftPad("王二", "沉默", 6));

        results = Strman.removeEmptyStrings(new String[]{"沉", " ", "   ", "默王二"});
        System.out.println(Arrays.toString(results));


        System.out.println(Strman.repeat("沉默王二", 3));

        System.out.println(Stream.generate(() -> "沉默王二").limit(2).collect(Collectors.joining()));

        System.out.println(Strman.reverse("沉默王二"));

        System.out.println(Strman.safeTruncate("沉默王二", 4, "。。。"));

        System.out.println(Strman.safeTruncate("Java is the best", 13, "..."));

        System.out.println(Strman.truncate("Java is the best", 13, "..."));

        System.out.println(Strman.shuffle("沉默王二"));
    }
}


