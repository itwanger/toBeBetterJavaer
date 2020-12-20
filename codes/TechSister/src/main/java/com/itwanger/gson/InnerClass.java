package com.itwanger.gson;

import com.google.gson.Gson;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/12/8
 */
class A {
    public String a = "a";

     class B {
        public String b = "b";

        @Override
        public String toString() {
            return "B{" +
                    "b='" + b + '\'' +
                    '}';
        }
    }

    @Override
    public String toString() {
        return "A{" +
                "a='" + a + '\'' +
                '}';
    }

    public static void main(String[] args) {
        Gson gson = new Gson();
        String json = gson.toJson(new A());

        json = "{\"b\":\"b\"}";
        B b = gson.fromJson(json, B.class);
        System.out.println(b);
    }
}
