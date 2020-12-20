package com.itwanger.gson;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/12/8
 */
public class Foo<T> {
    T value;

    public void set(T value) {
        this.value = value;
    }

    public T get() {
        return value;
    }

    public static void main(String[] args) {
        Gson gson = new Gson();
        Foo<Bar> foo = new Foo<Bar>();
        Bar bar = new Bar();
        foo.set(bar);

Type fooType = new TypeToken<Foo<Bar>>() {}.getType();
String json = gson.toJson(foo,fooType);
        System.out.println(json);



Foo<Bar> foo1 = gson.fromJson(json, fooType);
Bar bar1 = foo1.get();
        System.out.println(bar1);
    }
}

class Bar{
    private int age = 10;
    private String name = "图灵";
}
