package com.itwanger.gson;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;

import java.util.ArrayList;
import java.util.List;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/12/8
 */
public class ArbitraryTypes {
    public static void main(String[] args) {

List list = new ArrayList();
list.add("沉默王二");
list.add(18);
list.add(new Event("gson", "google"));


Gson gson = new Gson();
String json = gson.toJson(list);
System.out.println(json);

        List list1 = gson.fromJson(json,list.getClass());
        System.out.println(list1);

JsonParser parser = new JsonParser();
JsonArray array = parser.parse(json).getAsJsonArray();
String message = gson.fromJson(array.get(0), String.class);
int number = gson.fromJson(array.get(1), int.class);
Event event = gson.fromJson(array.get(2), Event.class);
    }
}
class Event {
    private String name;
    private String source;
    Event(String name, String source) {
        this.name = name;
        this.source = source;
    }
}