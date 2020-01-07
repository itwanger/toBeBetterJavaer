package com.cmower.java_demo.thinkingjava.neicunyingshe;

import java.io.IOException;
import java.nio.CharBuffer;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.channels.FileChannel.MapMode;
import java.nio.charset.Charset;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class Cmower1 {

    public static void main(String[] args) {
CharBuffer charBuffer = CharBuffer.wrap("沉默王二，《Web全栈开发进阶之路》作者");

Path path = Paths.get("cmower1.txt");

try (FileChannel fileChannel = FileChannel.open(path, StandardOpenOption.READ, StandardOpenOption.WRITE,
        StandardOpenOption.TRUNCATE_EXISTING)) {
    MappedByteBuffer mappedByteBuffer = fileChannel.map(MapMode.READ_WRITE, 0, 1024);

    if (mappedByteBuffer != null) {
        mappedByteBuffer.put(Charset.forName("UTF-8").encode(charBuffer));
    }

} catch (IOException e) {
    e.printStackTrace();
}
    }

}
