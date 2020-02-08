package com.cmower.java_demo.thinkingjava.url;

import java.net.MalformedURLException;
import java.net.URL;

public class Cmower2 {

	public static void main(String[] args) {
		try {
URL url = new URL("http://www.itmind.net/category/payment-selection/zhishixingqiu-jingxuan/");

System.out.println("host: " + url.getHost());
System.out.println("port: " + url.getPort());
System.out.println("uri_path: " + url.getPath());

		} catch (MalformedURLException e1) {
			e1.printStackTrace();
		}

	}

}
