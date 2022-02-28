Java中创建线程主要有三种方式，分别为继承Thread类、实现Runnable接口、实现Callable接口。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/create-thread-way-1.png)



1）继承Thread类，重写run()方法，调用start()方法启动线程

```
public class ThreadTest {

    /**
     * 继承Thread类
     */
    public static class MyThread extends Thread {
        @Override
        public void run() {
            System.out.println("This is child thread");
        }
    }

    public static void main(String[] args) {
        MyThread thread = new MyThread();
        thread.start();
    }
}
```

2）实现 Runnable 接口，重写run()方法

```
public class RunnableTask implements Runnable {
    public void run() {
        System.out.println("Runnable!");
    }

    public static void main(String[] args) {
        RunnableTask task = new RunnableTask();
        new Thread(task).start();
    }
}
```

上面两种都是没有返回值的，但是如果我们需要获取线程的执行结果，该怎么办呢？

可以实现Callable接口，重写call()方法，这种方式可以通过FutureTask获取任务执行的返回值

```
public class CallerTask implements Callable<String> {
    public String call() throws Exception {
        return "Hello,i am running!";
    }

    public static void main(String[] args) {
        //创建异步任务
        FutureTask<String> task=new FutureTask<String>(new CallerTask());
        //启动线程
        new Thread(task).start();
        try {
            //等待执行完成，并获取返回结果
            String result=task.get();
            System.out.println(result);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```

>作者：三分恶
>原文链接：https://mp.weixin.qq.com/s/1jhBZrAb7bnvkgN1TgAUpw
>整理：沉默王二
>转载链接：https://mp.weixin.qq.com/s/bImCIoYsH_JEzTkBx2lj4A
