package com.cmower.java_demo.thinkingjava.duoxiancheng;

class Chenmo {
    private int lineCount = 0;
    private int wordCount = 0;
    public void write() {
        String words = "我这一辈子，走过需要地方的路，行过需要地方的桥，看过许多次的云，喝过许多种类的酒，却只爱过一个正当年龄的人。";
        System.out.println(words);
        
        synchronized (this) {
            lineCount++;
            wordCount++;
        }
    }
}
