package com.itwanger.s65;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

class Demo {
    public static void main(String[] args) throws IOException {
//        InputStream is;
//        Reader r;

//int b;
//FileInputStream fis1 = new FileInputStream("fis.txt");
//// 循环读取
//while ((b = fis1.read())!=-1) {
//    System.out.println((char)b);
//}
//// 关闭资源
//fis1.close();
//
//
//FileOutputStream fos = new FileOutputStream("fos.txt");
//fos.write("沉默王二".getBytes());
//fos.close();


//// 1、逐个字符读取
//int b = 0;
//FileReader fileReader = new FileReader("read.txt");
//// 循环读取
//while ((b = fileReader.read())!=-1) {
//    // 自动提升类型提升为 int 类型，所以用 char 强转
//    System.out.println((char)b);
//}
//// 关闭流
//fileReader.close();
//
//
//FileWriter fileWriter = new FileWriter("fw.txt");
//char[] chars = "沉默王二".toCharArray();
//fileWriter.write(chars, 0, chars.length);
//fileWriter.close();


//InputStream is =new BufferedInputStream(
//        new ByteArrayInputStream(
//                "沉默王二".getBytes(StandardCharsets.UTF_8)));
////操作
//byte[] flush =new byte[1024];
//int len =0;
//while(-1!=(len=is.read(flush))){
//    System.out.println(new String(flush,0,len));
//}
////释放资源
//is.close();
//
//
//ByteArrayOutputStream bos =new ByteArrayOutputStream();
//byte[] info ="沉默王二".getBytes();
//bos.write(info, 0, info.length);
////获取数据
//byte[] dest =bos.toByteArray();
////释放资源
//bos.close();

final PipedOutputStream pipedOutputStream = new PipedOutputStream();
final PipedInputStream pipedInputStream = new PipedInputStream(pipedOutputStream);

Thread thread1 = new Thread(new Runnable() {
    @Override
    public void run() {
        try {
            pipedOutputStream.write("沉默王二".getBytes(StandardCharsets.UTF_8));
            pipedOutputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
});

Thread thread2 = new Thread(new Runnable() {
    @Override
    public void run() {
        try {
            byte[] flush =new byte[1024];
            int len =0;
            while(-1!=(len=pipedInputStream.read(flush))){
                System.out.println(new String(flush,0,len));
            }

            pipedInputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
});
thread1.start();
thread2.start();

        DataInputStream dataInputStream;
//        dataInputStream.read

        PrintWriter printWriter;

//StringWriter buffer = new StringWriter();
//try (PrintWriter pw = new PrintWriter(buffer)) {
//    pw.println("沉默王二");
//}
//System.out.println(buffer.toString());


ByteArrayOutputStream buffer = new ByteArrayOutputStream();
try (ObjectOutputStream output = new ObjectOutputStream(buffer)) {
    output.writeUTF("沉默王二");
}
System.out.println(Arrays.toString(buffer.toByteArray()));

try (ObjectInputStream input = new ObjectInputStream(new FileInputStream(
        new File("Person.txt")))) {
    String s = input.readUTF();
}

InputStreamReader isr = new InputStreamReader(
        new FileInputStream("demo.txt"));
char []cha = new char[1024];
int len = isr.read(cha);
System.out.println(new String(cha,0,len));
isr.close();

File f = new File("test.txt") ;
Writer out = new OutputStreamWriter(new FileOutputStream(f)) ; // 字节流变为字符流
out.write("hello world!!") ;    // 使用字符流输出
out.close() ;
    }
}