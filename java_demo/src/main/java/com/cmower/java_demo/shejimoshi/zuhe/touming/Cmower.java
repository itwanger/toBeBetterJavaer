package com.cmower.java_demo.shejimoshi.zuhe.touming;

public class Cmower {

    public static void main(String[] args) {
// boss 杰克
Shangceng jieke = new Shangceng();

// 中层领导 瘪三
Shangceng biesan = new Shangceng();

// 底层海盗 王二
Diceng wanger = new Diceng();

biesan.add(wanger);
jieke.add(biesan);

display(jieke);
    }

public static void display(Pirate boos) {
    for (Pirate pirate : boos.getChildren()) {
        if (pirate instanceof Diceng) {
            pirate.snatchGoldCoins();
        } else {
            display(pirate);
        }
    }
}
}
