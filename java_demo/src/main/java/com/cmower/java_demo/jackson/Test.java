package com.cmower.java_demo.jackson;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public class Test {
    public static void main(String[] args) throws IOException {
Cmower wanger = new Cmower(18,"沉默王二");
System.out.println(wanger);

ObjectMapper mapper = new ObjectMapper();
String jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(wanger);

System.out.println(jsonString);

Cmower deserialize = mapper.readValue(jsonString,Cmower.class);
System.out.println(deserialize);
    }
}
