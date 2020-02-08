package com.cmower.java_demo.thinkingjava.url;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

public class Cmower {

	public static void main(String[] args) {
		try {
URL url = new URL("http://www.itmind.net");
URLConnection connection = url.openConnection();
System.out.println(connection.getContentType());
System.out.println(connection.getContentLength());
System.out.println(connection.getContentEncoding());
System.out.println(connection.getDate());
System.out.println(connection.getExpiration());
System.out.println(connection.getLastModified());

try (InputStream in = connection.getInputStream();) {

	ByteArrayOutputStream output = new ByteArrayOutputStream();
	byte[] buffer = new byte[1024];
	int len = -1;
	while ((len = in.read(buffer)) != -1) {
		output.write(buffer, 0, len);
	}

	System.out.println(new String(output.toByteArray()));

} catch (IOException e) {
	e.printStackTrace();
}
		} catch (MalformedURLException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}

	}

}
