package com.cmower.java_demo.journal;

import java.io.FileFilter;
import java.nio.file.PathMatcher;

public class LamadaTest {
    public static void main(String[] args) {
        new LamadaTest().work();

//        int limit = 10;
//        Runnable r = () -> {
//            limit = 5;
//            for (int i = 0; i < limit; i++)
//                System.out.println(i);
//        };
//        new Thread(new Runnable() {
//            @Override
//            public void run() {
//                System.out.println("沉默王二");
//            }
//        }).start();


//        new Thread(() -> System.out.println("沉默王二")).start();


        final PathMatcher matchers[] =
                {
                        (path) -> path.toString().endsWith("txt"),
                        (path) -> path.toString().endsWith("java")
                };
    }

    static FileFilter getFilter(String ext) {
        return (pathname) -> pathname.toString().endsWith(ext);
    }

    public void work() {
        System.out.printf("this = %s%n", this);

Runnable r = new Runnable()
{
    @Override
    public void run()
    {
        System.out.printf("this = %s%n", this);
    }
};
        new Thread(r).start();
        new Thread(() -> System.out.printf("this = %s%n", this)).start();
    }
}
