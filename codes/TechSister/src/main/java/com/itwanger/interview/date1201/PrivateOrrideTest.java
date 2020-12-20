package com.itwanger.interview.date1201;

/**
 * 微信搜索「沉默王二」，回复 Java
 *
 * @author 沉默王二
 * @date 2020/12/1
 */
class LaoWang{
    public LaoWang() {
        write();
        read();
    }
    public void write() {
        System.out.println("老王写了一本《基督山伯爵》");
    }

    private void read() {
        System.out.println("老王在读《哈姆雷特》");
    }
}
class XiaoWang extends LaoWang {
    @Override
    public void write() {
        System.out.println("小王写了一本《茶花女》");
    }

    private void read() {
        System.out.println("小王在读《威尼斯商人》");
    }
}
public class PrivateOrrideTest {
    public static void main(String[] args) {
        LaoWang wang = new XiaoWang();
    }
}
