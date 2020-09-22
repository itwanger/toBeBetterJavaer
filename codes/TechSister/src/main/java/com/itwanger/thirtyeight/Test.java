package com.itwanger.thirtyeight;

/**
 * @author 微信搜「沉默王二」，回复关键字 PDF
 */
public class Test {
    public static void main(String[] args) {
        I i = new B();
        Call call = new Call();
        call.invoke(i);
    }
}

interface I{}
class A implements I {
    public void a() {
        System.out.println("a");
    }
}
class B implements I {
    public void b() {
        System.out.println("b");
    }
}
class Call {
    void invoke(I i) {
        if (i instanceof A) {
            A a = (A)i;
            a.a();
        }
        if (i instanceof B) {
            B b = (B)i;
            b.b();
        }
    }
}
