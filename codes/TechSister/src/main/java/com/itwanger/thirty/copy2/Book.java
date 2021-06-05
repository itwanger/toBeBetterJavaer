package com.itwanger.thirty.copy2;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
class Book {
    private String bookName;
    private int price;

    public Book(String bookName, int price) {
        this.bookName = bookName;
        this.price = price;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return super.toString().substring(26) +
                " bookName='" + bookName + '\'' +
                ", price=" + price +
                '}';
    }
}
