---
title: 从根上理解生产者-消费者模式
shortTitle: 生产者-消费者模式
description: 生产者-消费者模式是计算机科学中一种常见的并发设计模式，常用于在生产者和消费者之间传递数据。在这种模式中，两个（或多个）进程共享一个固定大小的缓冲区，作为中间存储。生产者的任务是生成数据、将其放入缓冲区，而消费者的任务是从缓冲区中移除数据并消费它。
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,生产者-消费者,生产者消费者,生产者,消费者
---

# 第三十一节：生产者-消费者模式

生产者-消费者模式是一个十分经典的多线程并发协作模式，弄懂生产者-消费者问题能够让我们对并发编程的理解加深。

所谓的生产者-消费者，实际上包含了两类线程，一种是生产者线程用于生产数据，另一种是消费者线程用于消费数据，为了解耦生产者和消费者的关系，通常会采用共享的数据区域，就像是一个仓库，生产者生产数据之后直接放置在共享数据区中，并不需要关心消费者的行为；而消费者只需要从共享数据区中获取数据，不需要关心生产者的行为。

![](https://cdn.tobebetterjavaer.com/stutymore/shengchanzhe-xiaofeizhe-20230825161048.png)

这个共享数据区域中应该具备这样的线程间并发协作功能：

1. 如果共享数据区已满的话，阻塞生产者继续生产数据；
2. 如果共享数据区为空的话，阻塞消费者继续消费数据；

在实现生产者消费者问题时，可以采用三种方式：

1. 使用 Object 的 wait/notify 的消息通知机制；
2. 使用 Lock [Condition](https://javabetter.cn/thread/condition.html) 的 await/signal 消息通知机制；
3. 使用 [BlockingQueue](https://javabetter.cn/thread/BlockingQueue.html) 实现。

## wait/notify 的消息通知机制

可以通过 Object 对象的 wait 方法和 notify 方法或 notifyAll 方法来实现线程间的通信。

![](https://cdn.tobebetterjavaer.com/stutymore/shengchanzhe-xiaofeizhe-20230825160634.png)

调用 wait 方法将阻塞当前线程，直到其他线程调用了 notify 方法或 notifyAll 方法进行通知，当前线程才能从 wait 方法处返回，继续执行下面的操作。

这些知识我们在讲 [Condition](https://javabetter.cn/thread/condition.html) 的时候其实讲到过，相信大家都还有印象。

01、wait

该方法用来将当前线程置入休眠状态，直到接到通知或被中断为止。

在调用 wait 之前，线程必须获得该对象的监视器锁，即只能在**同步方法或同步块**中调用 wait 方法。调用 wait 方法之后，当前线程会释放锁。如果调用 wait 方法时，线程并未获取到锁的话，则会**抛出 IllegalMonitorStateException**异常。如果再次获取到锁的话，当前线程才能从 wait 方法处成功返回。

02、notify

该方法也需要在同步方法或同步块中调用，即在调用前，线程也必须获得该对象的对象级别锁，如果调用 notify 时没有持有适当的锁，也会抛出 **IllegalMonitorStateException**。

该方法会从 WAITTING 状态的线程中挑选一个进行通知，使得调用 wait 方法的线程从等待队列移入到同步队列中，等待机会再一次获取到锁，从而使得调用 wait 方法的线程能够从 wait 方法处退出。

调用 notify 后，当前线程不会马上释放该对象锁，要等到程序退出同步块后，当前线程才会释放锁。

03、notifyAll

该方法与 notify 方法的工作方式相同，重要的一点差异是：notifyAll 会使所有原来在该对象上 wait 线程统统退出 WAITTING 状态，使得他们全部从等待队列中移入到同步队列中去，等待下一次获取到对象监视器锁的机会。

不过，wait/notify 消息通知存在这样一些问题。

### 1.notify 早期通知

notify 通知的遗漏，即 threadA 还没开始 wait，threadB 已经 notify 了，这样，threadB 通知是没有任何响应的，当 threadB 退出 [synchronized 代码块](https://javabetter.cn/thread/synchronized-1.html)后，threadA 再开始 wait，便会一直阻塞等待，直到被别的线程打断。

下面的示例代码就模拟出了 notify 早期通知带来的问题：

```java
public class EarlyNotify {

    private static String lockObject = "";

    public static void main(String[] args) {
        WaitThread waitThread = new WaitThread(lockObject);
        NotifyThread notifyThread = new NotifyThread(lockObject);
        notifyThread.start();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        waitThread.start();
    }

    static class WaitThread extends Thread {
        private String lock;

        public WaitThread(String lock) {
            this.lock = lock;
        }

        @Override
        public void run() {
            synchronized (lock) {
                try {
                    System.out.println(Thread.currentThread().getName() + "  进去代码块");
                    System.out.println(Thread.currentThread().getName() + "  开始wait");
                    lock.wait();
                    System.out.println(Thread.currentThread().getName() + "   结束wait");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    static class NotifyThread extends Thread {
        private String lock;

        public NotifyThread(String lock) {
            this.lock = lock;
        }

        @Override
        public void run() {
            synchronized (lock) {
                System.out.println(Thread.currentThread().getName() + "  进去代码块");
                System.out.println(Thread.currentThread().getName() + "  开始notify");
                lock.notify();
                System.out.println(Thread.currentThread().getName() + "   结束开始notify");
            }
        }
    }
}
```

示例中开启了**两个线程，一个是 WaitThread，另一个是 NotifyThread。NotifyThread 会先启动调用 notify 方法。然后 WaitThread 线程才启动，调用 wait 方法，但由于通知过了，wait 方法就无法再获取到相应的通知，因此 WaitThread 会一直在 wait 方法处阻塞，这种现象就是通知过早的现象。**

针对这种问题的解决方法是，添加一个状态标志，让 waitThread 调用 wait 方法前先判断状态是否已经改变了，如果通知已经发出，WaitThread 就不再去 wait。对上面的代码进行优化如下：

```java
public class EarlyNotify {

    private static String lockObject = "";
    private static boolean isWait = true;

    public static void main(String[] args) {
        WaitThread waitThread = new WaitThread(lockObject);
        NotifyThread notifyThread = new NotifyThread(lockObject);
        notifyThread.start();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        waitThread.start();
    }

    static class WaitThread extends Thread {
        private String lock;

        public WaitThread(String lock) {
            this.lock = lock;
        }

        @Override
        public void run() {
            synchronized (lock) {
                try {
                    while (isWait) {
                        System.out.println(Thread.currentThread().getName() + "  进去代码块");
                        System.out.println(Thread.currentThread().getName() + "  开始wait");
                        lock.wait();
                        System.out.println(Thread.currentThread().getName() + "   结束wait");
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    static class NotifyThread extends Thread {
        private String lock;

        public NotifyThread(String lock) {
            this.lock = lock;
        }

        @Override
        public void run() {
            synchronized (lock) {
                System.out.println(Thread.currentThread().getName() + "  进去代码块");
                System.out.println(Thread.currentThread().getName() + "  开始notify");
                lock.notifyAll();
                isWait = false;
                System.out.println(Thread.currentThread().getName() + "   结束开始notify");
            }
        }
    }
}
```

这段代码只增加了一个`isWait`状态，NotifyThread 调用 notify 方法后会对状态进行更新，WaitThread 调用 wait 方法之前会先对状态进行判断。

该示例中，调用 notify 后将状态`isWait`改变为 false，因此，在 WaitThread 中 while 对 isWait 判断后就不会执行 wait 方法，从而**避免了 Notify 过早通知造成遗漏的情况。**

**总结：在使用线程的等待/通知机制时，一般都要配合一个 boolean 变量值，在 notify 之前改变该 boolean 变量的值，让 wait 返回后能够退出 while 循环，或在通知被遗漏后不会被阻塞在 wait 方法处。**

### 2.等待 wait 的条件发生变化

如果线程在等待时接收到了通知，但是之后等待的条件发生了变化，并没有再次对等待条件进行判断，也会导致程序出现错误。

下面用一个例子来说明这种情况。

```java
public class ConditionChange {
	private static List<String> lockObject = new ArrayList();


	public static void main(String[] args) {
	    Consumer consumer1 = new Consumer(lockObject);
	    Consumer consumer2 = new Consumer(lockObject);
	    Productor productor = new Productor(lockObject);
	    consumer1.start();
	    consumer2.start();
	    productor.start();
	}


	static class Consumer extends Thread {
	    private List<String> lock;

	    public Consumer(List lock) {
	        this.lock = lock;
	    }

	    @Override
	    public void run() {
	        synchronized (lock) {
	            try {
	                //这里使用if的话，就会存在wait条件变化造成程序错误的问题
	                if (lock.isEmpty()) {
	                    System.out.println(Thread.currentThread().getName() + " list为空");
	                    System.out.println(Thread.currentThread().getName() + " 调用wait方法");
	                    lock.wait();
	                    System.out.println(Thread.currentThread().getName() + "  wait方法结束");
	                }
	                String element = lock.remove(0);
	                System.out.println(Thread.currentThread().getName() + " 取出第一个元素为：" + element);
	            } catch (InterruptedException e) {
	                e.printStackTrace();
	            }
	        }
	    }

	}


	static class Productor extends Thread {
	    private List<String> lock;

	    public Productor(List lock) {
	        this.lock = lock;
	    }

	    @Override
	    public void run() {
	        synchronized (lock) {
	            System.out.println(Thread.currentThread().getName() + " 开始添加元素");
	            lock.add(Thread.currentThread().getName());
	            lock.notifyAll();
	        }
	    }

	}
}
```

会报异常：

```
Exception in thread "Thread-1" Thread-0 list为空
Thread-0 调用wait方法
Thread-1 list为空
Thread-1 调用wait方法
Thread-2 开始添加元素
Thread-1  wait方法结束
java.lang.IndexOutOfBoundsException: Index: 0, Size: 0
```

在这个例子中，一共开启了 3 个线程，Consumer1,Consumer2 以及 Productor。

Consumer1 调用了 wait 方法后，线程处于了 WAITTING 状态，并且将对象锁释放。

此时，Consumer2 获取到对象锁，进入到同步代块中，当执行到 wait 方法时，同样的也会释放对象锁。

然后 productor 获取到对象锁，进入到同步代码块中，向 list 中插入数据，通过 notifyAll 方法通知处于 WAITING 状态的 Consumer1 和 Consumer2 线程。

consumer1 得到对象锁后，从 wait 方法处退出，删除一个元素让 List 为空，方法执行结束，退出同步块，释放掉对象锁。

这个时候 Consumer2 获取到对象锁后，从 wait 方法退出，继续往下执行，这个时候 Consumer2 再执行`lock.remove(0);`就会出错，因为 List 已经为空了。

**解决方案：** 通过上面的分析，可以看出 Consumer2 报错是因为线程从 wait 方法退出之后没有对 wait 条件进行判断，但此时的 wait 条件已经发生了变化。解决办法就是在 wait 退出之后再对条件进行判断。

```java
public class ConditionChange {
	private static List<String> lockObject = new ArrayList();


	public static void main(String[] args) {
	    Consumer consumer1 = new Consumer(lockObject);
	    Consumer consumer2 = new Consumer(lockObject);
	    Productor productor = new Productor(lockObject);
	    consumer1.start();
	    consumer2.start();
	    productor.start();
	}


	static class Consumer extends Thread {
	    private List<String> lock;

	    public Consumer(List lock) {
	        this.lock = lock;
	    }

	    @Override
	    public void run() {
	        synchronized (lock) {
	            try {
	                //这里使用if的话，就会存在wait条件变化造成程序错误的问题
	                while (lock.isEmpty()) {
	                    System.out.println(Thread.currentThread().getName() + " list为空");
	                    System.out.println(Thread.currentThread().getName() + " 调用wait方法");
	                    lock.wait();
	                    System.out.println(Thread.currentThread().getName() + "  wait方法结束");
	                }
	                String element = lock.remove(0);
	                System.out.println(Thread.currentThread().getName() + " 取出第一个元素为：" + element);
	            } catch (InterruptedException e) {
	                e.printStackTrace();
	            }
	        }
	    }

	}


	static class Productor extends Thread {
	    private List<String> lock;

	    public Productor(List lock) {
	        this.lock = lock;
	    }

	    @Override
	    public void run() {
	        synchronized (lock) {
	            System.out.println(Thread.currentThread().getName() + " 开始添加元素");
	            lock.add(Thread.currentThread().getName());
	            lock.notifyAll();
	        }
	    }

	}
}
```

上面的代码与之前的代码相比，仅仅只是将 wait 外围的 if 语句改为了 while 循环，这样当 list 为空时，线程便会继续等待，而不会继续去执行删除 list 中元素中的代码。

总结：在使用线程的等待/通知机制时，一般都要在 while 循环中调用 wait 方法，因此需要配合一个 boolean 变量，满足 while 循环的条件时进入 while 循环，执行 wait 方法，不满足 while 循环条件时，跳出循环，执行后面的代码。

### 3. “假死”状态

现象：如果是多消费者和多生产者情况，使用 notify 方法可能会出现“假死”的情况，即所有的线程都处于等待状态，无法被唤醒。

原因分析：假设当前有多个生产者线程调用了 wait 方法阻塞等待，其中一个生产者线程获取到对象锁之后使用 notify 通知处于 WAITTING 状态的线程，如果唤醒的仍然是生产者线程，就会造成所有的生产者线程都处于等待状态。

解决办法：将 notify 方法替换成 notifyAll 方法，如果使用的是 [lock](https://javabetter.cn/thread/lock.html) 的话，就将 signal 方法替换成 signalAll 方法。

总结：Object 提供的消息通知机制应该遵循如下这些条件：

1. 永远在 while 循环中对条件进行判断而不是在 if 语句中进行 wait 条件的判断；
2. 使用 NotifyAll 而不是使用 notify。

基本的使用范式如下：

```java
// The standard idiom for calling the wait method in Java
synchronized (sharedObject) {
    while (condition) {
    sharedObject.wait();
        // (Releases lock, and reacquires on wakeup)
    }
    // do action based upon condition e.g. take or put into queue
}
```

## wait/notifyAll 实现生产者-消费者

利用 wait/notifyAll 实现生产者和消费者代码如下：

```java
public class ProductorConsumer {


    public static void main(String[] args) {

        LinkedList linkedList = new LinkedList();
        ExecutorService service = Executors.newFixedThreadPool(15);
        for (int i = 0; i < 5; i++) {
            service.submit(new Productor(linkedList, 8));
        }

        for (int i = 0; i < 10; i++) {
            service.submit(new Consumer(linkedList));
        }

    }

    static class Productor implements Runnable {

        private List<Integer> list;
        private int maxLength;

        public Productor(List list, int maxLength) {
            this.list = list;
            this.maxLength = maxLength;
        }

        @Override
        public void run() {
            while (true) {
                synchronized (list) {
                    try {
                        while (list.size() == maxLength) {
                            System.out.println("生产者" + Thread.currentThread().getName() + "  list以达到最大容量，进行wait");
                            list.wait();
                            System.out.println("生产者" + Thread.currentThread().getName() + "  退出wait");
                        }
                        Random random = new Random();
                        int i = random.nextInt();
                        System.out.println("生产者" + Thread.currentThread().getName() + " 生产数据" + i);
                        list.add(i);
                        list.notifyAll();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }

            }
        }
    }


    static class Consumer implements Runnable {

        private List<Integer> list;

        public Consumer(List list) {
            this.list = list;
        }

        @Override
        public void run() {
            while (true) {
                synchronized (list) {
                    try {
                        while (list.isEmpty()) {
                            System.out.println("消费者" + Thread.currentThread().getName() + "  list为空，进行wait");
                            list.wait();
                            System.out.println("消费者" + Thread.currentThread().getName() + "  退出wait");
                        }
                        Integer element = list.remove(0);
                        System.out.println("消费者" + Thread.currentThread().getName() + "  消费数据：" + element);
                        list.notifyAll();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

}
```

输出结果：

```
生产者pool-1-thread-1 生产数据-232820990
生产者pool-1-thread-1 生产数据1432164130
生产者pool-1-thread-1 生产数据1057090222
生产者pool-1-thread-1 生产数据1201395916
生产者pool-1-thread-1 生产数据482766516
生产者pool-1-thread-1  list以达到最大容量，进行wait
消费者pool-1-thread-15  退出wait
消费者pool-1-thread-15  消费数据：1237535349
消费者pool-1-thread-15  消费数据：-1617438932
消费者pool-1-thread-15  消费数据：-535396055
消费者pool-1-thread-15  消费数据：-232820990
消费者pool-1-thread-15  消费数据：1432164130
消费者pool-1-thread-15  消费数据：1057090222
消费者pool-1-thread-15  消费数据：1201395916
消费者pool-1-thread-15  消费数据：482766516
消费者pool-1-thread-15  list为空，进行wait
生产者pool-1-thread-5  退出wait
生产者pool-1-thread-5 生产数据1442969724
生产者pool-1-thread-5 生产数据1177554422
生产者pool-1-thread-5 生产数据-133137235
生产者pool-1-thread-5 生产数据324882560
生产者pool-1-thread-5 生产数据2065211573
生产者pool-1-thread-5 生产数据253569900
生产者pool-1-thread-5 生产数据571277922
生产者pool-1-thread-5 生产数据1622323863
生产者pool-1-thread-5  list以达到最大容量，进行wait
消费者pool-1-thread-10  退出wait
```

## await/signalAll 实现生产者-消费者

参照 Object 的 wait 和 notify/notifyAll 方法，Condition 也提供了同样的方法，即 await 方法和 signal/signalAll 方法。这部分知识我们前面在讲 [Condition](https://javabetter.cn/thread/condition.html) 的时候也讲到过，相信大家都还有印象。

那如果采用 Conditon 的消息通知原理来实现生产者-消费者模型，原理同使用 wait/notifyAll 一样。直接上代码：

```java
public class ProductorConsumer {

    private static ReentrantLock lock = new ReentrantLock();
    private static Condition full = lock.newCondition();
    private static Condition empty = lock.newCondition();

    public static void main(String[] args) {
        LinkedList linkedList = new LinkedList();
        ExecutorService service = Executors.newFixedThreadPool(15);
        for (int i = 0; i < 5; i++) {
            service.submit(new Productor(linkedList, 8, lock));
        }
        for (int i = 0; i < 10; i++) {
            service.submit(new Consumer(linkedList, lock));
        }

    }

    static class Productor implements Runnable {

        private List<Integer> list;
        private int maxLength;
        private Lock lock;

        public Productor(List list, int maxLength, Lock lock) {
            this.list = list;
            this.maxLength = maxLength;
            this.lock = lock;
        }

        @Override
        public void run() {
            while (true) {
                lock.lock();
                try {
                    while (list.size() == maxLength) {
                        System.out.println("生产者" + Thread.currentThread().getName() + "  list以达到最大容量，进行wait");
                        full.await();
                        System.out.println("生产者" + Thread.currentThread().getName() + "  退出wait");
                    }
                    Random random = new Random();
                    int i = random.nextInt();
                    System.out.println("生产者" + Thread.currentThread().getName() + " 生产数据" + i);
                    list.add(i);
                    empty.signalAll();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } finally {
                    lock.unlock();
                }
            }
        }
    }


    static class Consumer implements Runnable {

        private List<Integer> list;
        private Lock lock;

        public Consumer(List list, Lock lock) {
            this.list = list;
            this.lock = lock;
        }

        @Override
        public void run() {
            while (true) {
                lock.lock();
                try {
                    while (list.isEmpty()) {
                        System.out.println("消费者" + Thread.currentThread().getName() + "  list为空，进行wait");
                        empty.await();
                        System.out.println("消费者" + Thread.currentThread().getName() + "  退出wait");
                    }
                    Integer element = list.remove(0);
                    System.out.println("消费者" + Thread.currentThread().getName() + "  消费数据：" + element);
                    full.signalAll();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } finally {
                    lock.unlock();
                }
            }
        }
    }

}
```

输出结果：

```
消费者pool-1-thread-9  消费数据：1146627506
消费者pool-1-thread-9  消费数据：1508001019
消费者pool-1-thread-9  消费数据：-600080565
消费者pool-1-thread-9  消费数据：-1000305429
消费者pool-1-thread-9  消费数据：-1270658620
消费者pool-1-thread-9  消费数据：1961046169
消费者pool-1-thread-9  消费数据：-307680655
消费者pool-1-thread-9  list为空，进行wait
消费者pool-1-thread-13  退出wait
消费者pool-1-thread-13  list为空，进行wait
消费者pool-1-thread-10  退出wait
生产者pool-1-thread-5  退出wait
生产者pool-1-thread-5 生产数据-892558288
生产者pool-1-thread-5 生产数据-1917220008
生产者pool-1-thread-5 生产数据2146351766
生产者pool-1-thread-5 生产数据452445380
生产者pool-1-thread-5 生产数据1695168334
生产者pool-1-thread-5 生产数据1979746693
生产者pool-1-thread-5 生产数据-1905436249
生产者pool-1-thread-5 生产数据-101410137
生产者pool-1-thread-5  list以达到最大容量，进行wait
生产者pool-1-thread-1  退出wait
生产者pool-1-thread-1  list以达到最大容量，进行wait
生产者pool-1-thread-4  退出wait
生产者pool-1-thread-4  list以达到最大容量，进行wait
生产者pool-1-thread-2  退出wait
生产者pool-1-thread-2  list以达到最大容量，进行wait
生产者pool-1-thread-3  退出wait
生产者pool-1-thread-3  list以达到最大容量，进行wait
消费者pool-1-thread-9  退出wait
消费者pool-1-thread-9  消费数据：-892558288
```

## BlockingQueue 实现生产者-消费者

在讲 [BlockingQueue](https://javabetter.cn/thread/BlockingQueue.html) 的时候，我们就讲过，BlockingQueue 非常适合用来实现生产者-消费者模型。

其原因是 BlockingQueue 提供了可阻塞的插入和移除的方法。当队列容器已满，生产者线程会被阻塞，直到队列未满；当队列容器为空时，消费者线程会被阻塞，直至队列非空时为止。

![](https://cdn.tobebetterjavaer.com/stutymore/shengchanzhe-xiaofeizhe-20230825160139.png)

有了这个队列，生产者就只需要关注生产，而不用管消费者的消费行为，更不用等待消费者线程执行完；消费者也只管消费，不用管生产者是怎么生产的，更不用等着生产者生产。

下面直接上代码：

```java
public class ProductorConsumer {

    private static LinkedBlockingQueue<Integer> queue = new LinkedBlockingQueue<>();

    public static void main(String[] args) {
        ExecutorService service = Executors.newFixedThreadPool(15);
        for (int i = 0; i < 5; i++) {
            service.submit(new Productor(queue));
        }
        for (int i = 0; i < 10; i++) {
            service.submit(new Consumer(queue));
        }
    }


    static class Productor implements Runnable {

        private BlockingQueue queue;

        public Productor(BlockingQueue queue) {
            this.queue = queue;
        }

        @Override
        public void run() {
            try {
                while (true) {
                    Random random = new Random();
                    int i = random.nextInt();
                    System.out.println("生产者" + Thread.currentThread().getName() + "生产数据" + i);
                    queue.put(i);
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    static class Consumer implements Runnable {
        private BlockingQueue queue;

        public Consumer(BlockingQueue queue) {
            this.queue = queue;
        }

        @Override
        public void run() {
            try {
                while (true) {
                    Integer element = (Integer) queue.take();
                    System.out.println("消费者" + Thread.currentThread().getName() + "正在消费数据" + element);
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

}
```

输出结果：

```
消费者pool-1-thread-7正在消费数据1520577501
生产者pool-1-thread-4生产数据-127809610
消费者pool-1-thread-8正在消费数据504316513
生产者pool-1-thread-2生产数据1994678907
消费者pool-1-thread-11正在消费数据1967302829
生产者pool-1-thread-1生产数据369331507
消费者pool-1-thread-9正在消费数据1994678907
生产者pool-1-thread-2生产数据-919544017
消费者pool-1-thread-12正在消费数据-127809610
生产者pool-1-thread-4生产数据1475197572
消费者pool-1-thread-14正在消费数据-893487914
生产者pool-1-thread-3生产数据906921688
消费者pool-1-thread-6正在消费数据-1292015016
生产者pool-1-thread-5生产数据-652105379
生产者pool-1-thread-5生产数据-1622505717
生产者pool-1-thread-3生产数据-1350268764
消费者pool-1-thread-7正在消费数据906921688
生产者pool-1-thread-4生产数据2091628867
消费者pool-1-thread-13正在消费数据1475197572
消费者pool-1-thread-15正在消费数据-919544017
生产者pool-1-thread-2生产数据564860122
生产者pool-1-thread-2生产数据822954707
消费者pool-1-thread-14正在消费数据564860122
消费者pool-1-thread-10正在消费数据369331507
生产者pool-1-thread-1生产数据-245820912
消费者pool-1-thread-6正在消费数据822954707
生产者pool-1-thread-2生产数据1724595968
生产者pool-1-thread-2生产数据-1151855115
消费者pool-1-thread-12正在消费数据2091628867
生产者pool-1-thread-4生产数据-1774364499
生产者pool-1-thread-4生产数据2006106757
消费者pool-1-thread-14正在消费数据-1774364499
生产者pool-1-thread-3生产数据-1070853639
消费者pool-1-thread-9正在消费数据-1350268764
消费者pool-1-thread-11正在消费数据-1622505717
生产者pool-1-thread-5生产数据355412953
```

可以看出，使用 BlockingQueue 来实现生产者-消费者很简洁，这正是 BlockingQueue 的优势所在。

## 生产者-消费者模式的应用场景

生产者-消费者模式一般用于将生产数据的一方和消费数据的一方分割开来，将生产数据与消费数据的过程解耦开来。

### 01、Excutor 任务执行框架：

通过将任务的提交和任务的执行解耦开来，提交任务的操作相当于生产者，执行任务的操作相当于消费者。

例如使用 Excutor 构建 Web 服务器，用于处理线程的请求：生产者将任务提交给线程池，线程池创建线程处理任务，如果需要运行的任务数大于线程池的基本线程数，那么就把任务扔到阻塞队列（通过线程池+阻塞队列的方式比只使用一个阻塞队列的效率高很多，因为消费者能够处理就直接处理掉了，不用每个消费者都要先从阻塞队列中取出任务再执行）

### 02、消息中间件 MQ:

双十一的时候，会产生大量的订单，那么不可能同时处理那么多的订单，需要将订单放入一个队列里面，然后由专门的线程处理订单。

这里用户下单就是生产者，处理订单的线程就是消费者；再比如 12306 的抢票功能，先由一个容器存储用户提交的订单，然后再由专门处理订单的线程慢慢处理，这样可以在短时间内支持高并发服务。

### 03、任务的处理时间比较长的情况下：

比如上传附件并处理，那么这个时候可以将用户上传和处理附件分成两个过程，用一个队列暂时存储用户上传的附件，然后立刻返回用户上传成功，然后有专门的线程处理队列中的附件。

生产者-消费者模式的优点：

- 解耦：将生产者类和消费者类进行解耦，消除代码之间的依赖性，简化工作负载的管理
- 复用：通过将生产者类和消费者类独立开来，对生产者类和消费者类进行独立的复用与扩展
- 调整并发数：由于生产者和消费者的处理速度是不一样的，可以调整并发数，给予慢的一方多的并发数，来提高任务的处理速度
- 异步：对于生产者和消费者来说能够各司其职，生产者只需要关心缓冲区是否还有数据，不需要等待消费者处理完；对于消费者来说，也只需要关注缓冲区的内容，不需要关注生产者，通过异步的方式支持高并发，将一个耗时的流程拆成生产和消费两个阶段，这样生产者因为执行 put 的时间比较短，可以支持高并发
- 支持分布式：生产者和消费者通过队列进行通讯，所以不需要运行在同一台机器上，在分布式环境中可以通过 redis 的 list 作为队列，而消费者只需要轮询队列中是否有数据。同时还能支持集群的伸缩性，当某台机器宕掉的时候，不会导致整个集群宕掉

## 小结

本文主要讲解了线程的等待/通知机制，包括 wait/notify/notifyAll 方法的使用，以及使用 wait/notifyAll 实现生产者-消费者模型的示例代码。

还有 Condition 的 await/signalAll 方法的使用，以及使用 Condition 的 await/signalAll 实现生产者-消费者模型的示例代码。最后还讲解了使用 BlockingQueue 实现生产者-消费者模型的示例代码。

> 编辑：沉默王二，部分内容来自于CL0610的 GitHub 仓库[https://github.com/CL0610/Java-concurrency](https://github.com/CL0610/Java-concurrency/blob/master/27.一篇文章，让你彻底弄懂生产者--消费者问题/一篇文章，让你彻底弄懂生产者--消费者问题.md)，部分图片和内容来资源知乎[这篇帖子](https://zhuanlan.zhihu.com/p/73442055)。

---

GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第二份 PDF 《[并发编程小册](https://javabetter.cn/thread/)》终于来了！包括线程的基本概念和使用方法、Java的内存模型、sychronized、volatile、CAS、AQS、ReentrantLock、线程池、并发容器、ThreadLocal、生产者消费者模型等面试和开发必须掌握的内容，共计 15 万余字，200+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，二哥的并发编程进阶之路.pdf](https://javabetter.cn/thread/)

[加入二哥的编程星球](https://javabetter.cn/thread/)，在星球的第二个置顶帖「[知识图谱](https://javabetter.cn/thread/)」里就可以获取 PDF 版本。

![](https://cdn.tobebetterjavaer.com/stutymore/wangzhe-thread-20230904125125.png)
