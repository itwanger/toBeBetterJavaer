package com.cmower.java_demo.programcreek.overrideload;

class LaoWang{
    public void write() {
        System.out.println("老王写了一本《基督山伯爵》");
    }

    public void read() {
        System.out.println("老王读了一本《Web全栈开发进阶之路》");
    }

    public void read(String bookname) {
        System.out.println("老王读了一本《" + bookname + "》");
    }
}
public class XiaoWang extends LaoWang {
    @Override
    public void write() {
        System.out.println("小王写了一本《茶花女》");
    }

}
