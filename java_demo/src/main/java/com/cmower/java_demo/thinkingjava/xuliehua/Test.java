package com.cmower.java_demo.thinkingjava.xuliehua;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class Test {

    public static void main(String[] args) {
      // 初始化
        Wanger wanger = new Wanger();
        wanger.setName("王二");
        wanger.setAge(18);
        System.out.println(wanger);

        // 把对象写到文件中
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("chenmo"));){
            oos.writeObject(wanger);
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        Wanger.pre ="不沉默";

        // 从文件中读出对象
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(new File("chenmo")));){
            Wanger wanger1 = (Wanger) ois.readObject();
            System.out.println(wanger1);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

}
