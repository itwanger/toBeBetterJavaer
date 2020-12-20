package com.itwanger.gson;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/12/8
 */
public class Demo {
    public static void main(String[] args) {
        // 序列化
Gson gson = new Gson();
System.out.println(gson.toJson(18));
System.out.println(gson.toJson("沉默"));
System.out.println(gson.toJson(new Integer(18)));
int[] values = { 18,20 };
System.out.println(gson.toJson(values));

List<String> list =new ArrayList<>();
list.add("好好学习");
list.add("天天向上");
String json = gson.toJson(list);
        System.out.println(json);




Type listType = new TypeToken<ArrayList<String>>(){}.getType();
        List<String> listResult = gson.fromJson(json,List.class);
        System.out.println(listResult);

// 反序列化
int one = gson.fromJson("1", int.class);
Integer two = gson.fromJson("2", Integer.class);
Boolean false1 = gson.fromJson("false", Boolean.class);
String str = gson.fromJson("\"王二\"", String.class);
String[] anotherStr = gson.fromJson("[\"沉默\",\"王二\"]", String[].class);

System.out.println(one);
System.out.println(two);
System.out.println(false1);
System.out.println(str);
System.out.println(Arrays.toString(anotherStr));
    }
}
