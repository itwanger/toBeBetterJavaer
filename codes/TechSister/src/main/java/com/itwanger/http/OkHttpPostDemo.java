package com.itwanger.http;

import java.io.IOException;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class OkHttpPostDemo {
    public static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    OkHttpClient client = new OkHttpClient();

    String post(String url, String json) throws IOException {
        RequestBody body = RequestBody.create(json, JSON);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();
        try (Response response = client.newCall(request).execute()) {
            return response.body().string();
        }
    }

    public static void main(String[] args) throws IOException {
        OkHttpPostDemo example = new OkHttpPostDemo();
        String json = "{'name':'二哥'}";
        String response = example.post("https://httpbin.org/post", json);
        System.out.println(response);
    }
}
