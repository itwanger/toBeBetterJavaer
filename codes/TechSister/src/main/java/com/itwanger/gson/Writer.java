package com.itwanger.gson;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;

import java.lang.reflect.Modifier;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/12/8
 */
public class Writer {
@Expose
private int age = 18;
    private String name = "沉默王二";

    private transient int sex;

    @Override
    public String toString() {
        return "Writer{" +
                "age=" + age +
                ", name='" + name + '\'' +
                ", sex=" + sex +
                '}';
    }

    public static void main(String[] args) {
        Writer writer = new Writer();
        Gson gson = new Gson();
        String json = gson.toJson(writer);
        System.out.println(json);

        Gson gson1 = new GsonBuilder().setPrettyPrinting().create();
        String jsonOutput = gson1.toJson(writer);
        System.out.println(jsonOutput);

        Gson gson2 = new GsonBuilder().serializeNulls().create();
        String jsonOutput2 = gson2.toJson(writer);
        System.out.println(jsonOutput2);

Gson gson3 = new GsonBuilder().excludeFieldsWithModifiers(Modifier.TRANSIENT).create();
        String jsonOutput3 = gson3.toJson(writer);
        System.out.println(jsonOutput3);

        Gson gson4 = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        String jsonOutput4 = gson4.toJson(writer);
        System.out.println("jsonOutput4"+jsonOutput4);

        json = "{\"age\":0,\"name\":\"\"}";

        Writer writer1 = gson.fromJson(json, Writer.class);
        System.out.println(writer1);
    }
}
