package com.itwanger.s42;

/**
 * @author 微信搜「沉默王二」，回复关键字 Java
 */
public class Demo1 {
    static int num = 1000000;
    public static void main(String[] args) {
//        tryFun();
//        fun();
        test1();test2();
    }


    static void tryFun() {
        int sum = 0;
        long t1 = System.currentTimeMillis();
        for(int i=0;i<num;i++) {
            try {
                sum = sum + 1;
                System.out.println(sum);
            } catch (Exception e) {

            }
        }
        long t2 = System.currentTimeMillis();
        System.out.println("有 try catch 的时间：" + (t2-t1));
    }

    static void fun() {
        int sum = 0;
        long t1 = System.currentTimeMillis();
        try {
        for(int i=0;i<num;i++) {
            sum = sum + 1;
            System.out.println(sum);
        }
        } catch (Exception e) {

        }
        long t2 = System.currentTimeMillis();
        System.out.println("无 try catch 的时间：" + (t2-t1));
    }

static void test() {
    int num1, num2;
    try {
        num1 = 0;
        num2 = 62 / num1;
        System.out.println(num2);
        System.out.println("try 块的最后一句");
    }
    catch (ArithmeticException e) {
        // 算术运算发生时跳转到这里
        System.out.println("除数不能为零");
    }
    catch (Exception e) {
        // 通用型的异常意味着可以捕获所有的异常，它应该放在最后面，
        System.out.println("异常发生了");
    }
    System.out.println("try-catch 之外的代码.");
}

static void test1 () {
//    try{
//        int arr[]=new int[7];
//        arr[9]=30/1;
//        System.out.println("try 块的最后");
//    } catch(ArithmeticException | ArrayIndexOutOfBoundsException e){
//        System.out.println("除数必须是 0");
//    }

//    finally {
//
//    }
    System.out.println("try-catch 之外");
}

static int test2 () {
    try {
        System.exit(1);
        return 112;
    }
    finally {
        System.out.println("finally 块");
    }
}
}
