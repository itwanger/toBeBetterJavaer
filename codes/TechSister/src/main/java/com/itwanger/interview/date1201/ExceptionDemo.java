package com.itwanger.interview.date1201;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/12/1
 */
public class ExceptionDemo {
    public static void main(String[] args) {
        Super s = new Child();
        s.write();
    }
}
class Super{
    public void write() throws NullPointerException { }
}

class Child extends Super {
    @Override
    public void write() throws RuntimeException { }
}