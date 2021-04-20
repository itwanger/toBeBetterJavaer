package com.itwanger.jvm;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class DynamicLinking {
    static abstract class Human {
       protected abstract void sayHello();
    }

    static class Man extends Human {
        @Override
        protected void sayHello() {
            System.out.println("男人哭吧哭吧不是罪");
        }
    }

    static class Woman extends Human {
        @Override
        protected void sayHello() {
            System.out.println("山下的女人是老虎");
        }
    }

    public static void main(String[] args) {
        Human man = new Man();
        Human woman = new Woman();
        man.sayHello();
        woman.sayHello();
        man = new Woman();
        man.sayHello();
    }
}
