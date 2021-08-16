package com.itwanger.s41;

import java.io.File;
import java.io.IOException;
import java.net.Socket;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class Demo1 {
    public static void main(String[] args) throws ClassNotFoundException {
        Class clz = Class.forName("com.itwanger.s41.Demo1");

        String serverName = args[0];
        int port = Integer.parseInt(args[1]);
        try {
            Socket client = new Socket(serverName, port);
        } catch (IOException e) {

        }
    }


}
