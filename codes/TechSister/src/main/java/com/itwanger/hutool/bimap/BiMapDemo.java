package com.itwanger.hutool.bimap;

import cn.hutool.core.map.BiMap;

import java.util.HashMap;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class BiMapDemo {
    public static void main(String[] args) {
BiMap<String, String> biMap = new BiMap<>(new HashMap<>());
biMap.put("wanger", "沉默王二");
biMap.put("wangsan", "沉默王三");

// get value by key
biMap.get("wanger");
biMap.get("wangsan");

// get key by value
biMap.getKey("沉默王二");
biMap.getKey("沉默王三");

    }
}
