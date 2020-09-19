package com.cmower.java_demo.mkyoung;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class getKeysAndValuesFromMap {
    public static void main(String[] args) {
Map<String, String> map = new HashMap<>();
map.put("db", "MySQL");
map.put("username", "cmower");
map.put("password", "123456");

// 获取键和值
for (Map.Entry<String, String> entry : map.entrySet()) {
    String k = entry.getKey();
    String v = entry.getValue();
    System.out.println("键: " + k + ", 值: " + v);
}

// 获取所有键
Set<String> keys = map.keySet();
for (String k : keys) {
    System.out.println("键: " + k);
}
// 获取所有值
Collection<String> values = map.values();
for (String v : values) {
    System.out.println("值: " + v);
}

// Java 8 Lambda
map.forEach((k, v) -> {
    System.out.println("键: " + k + ", 值: " + v);
});

    }
}
