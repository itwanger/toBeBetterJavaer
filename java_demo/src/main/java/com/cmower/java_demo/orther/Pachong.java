package com.cmower.java_demo.orther;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;

public class Pachong {

    public static void main(String[] args) throws IOException {
        String keyWord="º∆À„ª˙";
        keyWord=URLEncoder.encode(keyWord,"utf-8");
        System.out.println(keyWord);
        URL url = new URL("http://opac.peihua.cn/opac_two/search2/searchout.jsp?suchen_word="+keyWord);
        HttpURLConnection httpUrlConn = (HttpURLConnection) url.openConnection();
        httpUrlConn.setRequestMethod("POST");
        httpUrlConn.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");
        // ªÒ»° ‰»Î¡˜
        InputStream input = httpUrlConn.getInputStream();
        InputStreamReader read = new InputStreamReader(input, "gbk");
        // ¥¥Ω®ª∫≥Â«¯
        BufferedReader br = new BufferedReader(read);
        // ∂¡»°ƒ⁄»›
        String result = br.readLine();
        while (result != null) {
            System.out.println(result);
            result=br.readLine();
        }
        br.close();
        read.close();
        input.close();
        httpUrlConn.disconnect();
    }

}
