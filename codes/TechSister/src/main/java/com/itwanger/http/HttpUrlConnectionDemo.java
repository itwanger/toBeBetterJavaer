package com.itwanger.http;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class HttpUrlConnectionDemo {
    public static void main(String[] args) throws IOException {
        String urlString = "https://httpbin.org/post";
        String bodyString = "name=二哥";

        URL url = new URL(urlString);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);

        OutputStream os = conn.getOutputStream();
        os.write(bodyString.getBytes("utf-8"));
        os.flush();
        os.close();

        if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
            InputStream is = conn.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            System.out.println("响应内容:" + sb.toString());
        } else {
            System.out.println("响应码:" + conn.getResponseCode());
        }
    }
}
