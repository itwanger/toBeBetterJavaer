package com.cmower.java_demo.mkyoung;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class JacksonConvertJSONArrayString2List {
    public static void main(String[] args) {
ObjectMapper mapper = new ObjectMapper();
String json = "[{\"name\":\"沉默王二\", \"age\":18}, {\"name\":\"沉默王三\", \"age\":16}]";

try {

    // 1. 把 JSON 数组转成对象数组
    Cmower[] pp1 = mapper.readValue(json, Cmower[].class);

    System.out.println("JSON 数组转成对象数组...");
    for (Cmower cmower : pp1) {
        System.out.println(cmower);
    }

    // 2. 把 JSON 数组转成 List
    List<Cmower> ppl2 = Arrays.asList(mapper.readValue(json, Cmower[].class));

    System.out.println("\nJSON 数组转成 List");
    ppl2.stream().forEach(x -> System.out.println(x));

    // 3. TypeReference
    List<Cmower> pp3 = mapper.readValue(json, new TypeReference<List<Cmower>>() {});

    System.out.println("\nTypeReference...");
    pp3.stream().forEach(x -> System.out.println(x));

} catch (
        IOException e) {
    e.printStackTrace();
}
    }
}
