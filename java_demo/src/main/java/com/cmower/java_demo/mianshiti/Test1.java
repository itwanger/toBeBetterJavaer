package com.cmower.java_demo.mianshiti;


import java.io.IOException;
import java.nio.file.*;

public class Test1 {
    public static void main(String[] args) {
        Path sourcePath      = Paths.get("/Users/maweiqing/test/404.html");
        Path destinationPath = Paths.get("/Users/maweiqing/test/4041.html");
        try {
            Files.move(sourcePath, destinationPath,
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            //moving file failed.
            e.printStackTrace();
        }

try {
    Path path = Paths.get("/Users/maweiqing/test/20191126");
    Path dir = Files.createDirectory(path);




} catch(FileAlreadyExistsException e){
    // the directory already exists.
} catch (IOException e) {
    //something else went wrong
    e.printStackTrace();
}
    }
}
