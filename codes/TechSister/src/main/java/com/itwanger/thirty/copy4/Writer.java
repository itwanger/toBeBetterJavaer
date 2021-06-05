package com.itwanger.thirty.copy4;

import java.io.*;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
class Writer implements Serializable {
    private int age;
    private String name;
    private Book book;

    public Writer(int age, String name) {
        this.age = age;
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    @Override
    public String toString() {
        return super.toString().substring(26) +
                " age=" + age +
                ", name='" + name + '\'' +
                ", book=" + book +
                '}';
    }

    //深度拷贝
    public Object deepClone() throws IOException, ClassNotFoundException {
        // 序列化
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(bos);

        oos.writeObject(this);

        // 反序列化
        ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
        ObjectInputStream ois = new ObjectInputStream(bis);

        return ois.readObject();
    }
}
