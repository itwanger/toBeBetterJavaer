package com.itwanger.thirty.copy3;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
class Writer implements Cloneable{
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

    @Override
    protected Object clone() throws CloneNotSupportedException {
        Writer writer = (Writer) super.clone();
        writer.setBook((Book) writer.getBook().clone());
        return writer;
    }
}
