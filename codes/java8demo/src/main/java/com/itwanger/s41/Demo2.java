package com.itwanger.s41;

import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class Demo2 {
    private String mHost;
    private int mPort;
    private Socket mSocket;
    private final Object mLock = new Object();

    public void run() {
        if (mSocket == null) {
            initSocket();
        }
        try {
            OutputStream out = mSocket.getOutputStream();
            byte[] buffer = new byte[1024];
            int n;
            while ((n = System.in.read(buffer)) > 0) {
                out.write(buffer, 0, n);
            }
        } catch (IOException e) {
            e.printStackTrace();
            initSocket();
        }
    }

    private void initSocket() {
        while (true) {
            try {
                Socket socket = new Socket(mHost, mPort);
                synchronized (mLock) {
                    mSocket = socket;
                }
                break;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
}
