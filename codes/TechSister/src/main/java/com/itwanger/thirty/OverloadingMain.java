package com.itwanger.thirty;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class OverloadingMain {
    public static void main(String[] args) {
        System.out.println("String[] args");
    }

    public static void main(String args) {
        System.out.println("String args");
    }

    public static void main() {
        System.out.println("无参");
    }
}
