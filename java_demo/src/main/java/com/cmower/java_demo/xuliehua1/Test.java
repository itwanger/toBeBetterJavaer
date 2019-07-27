package com.cmower.java_demo.xuliehua1;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.ObjectStreamField;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.ArrayList;

public class Test {
	public static void main(String[] args) {
// 初始化
Wanger3 wanger = new Wanger3();
wanger.setName("王二");
wanger.setAge(18);
System.out.println(wanger);

// 把对象写到文件中
try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("chenmo"));) {
	oos.writeObject(wanger);
} catch (IOException e) {
	e.printStackTrace();
}

// 从文件中读出对象
try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(new File("chenmo")));) {
	Wanger3 wanger1 = (Wanger3) ois.readObject();
	System.out.println(wanger1);
} catch (IOException | ClassNotFoundException e) {
	e.printStackTrace();
}

	}

}
