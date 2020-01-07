package com.cmower.java_demo.thinkingjava.neicunyingshe;

import java.io.IOException;
import java.nio.CharBuffer;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.channels.FileChannel.MapMode;
import java.nio.charset.Charset;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Cmower {

    public static void main(String[] args) {
        CharBuffer charBuffer = null;
        ClassLoader classLoader = Cmower.class.getClassLoader();
        Path path = Paths.get(classLoader.getResource("cmower.txt").getPath());
        try (FileChannel fileChannel = FileChannel.open(path)) {
            MappedByteBuffer mappedByteBuffer = fileChannel.map(MapMode.READ_ONLY, 0, fileChannel.size());

            if (mappedByteBuffer != null) {
                charBuffer = Charset.forName("UTF-8").decode(mappedByteBuffer);
            }

            System.out.println(charBuffer.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
