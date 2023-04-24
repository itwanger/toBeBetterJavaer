---
title: 从根上理解生产者-消费者模式
shortTitle: 从根上理解生产者-消费者模式
description: 从根上理解生产者-消费者模式
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,生产者-消费者
---


生产者-消费者模式是一个十分经典的多线程并发协作的模式，弄懂生产者-消费者问题能够让我们对并发编程的理解加深。所谓生产者-消费者问题，实际上主要是包含了两类线程，一种是生产者线程用于生产数据，另一种是消费者线程用于消费数据，为了解耦生产者和消费者的关系，通常会采用共享的数据区域，就像是一个仓库，生产者生产数据之后直接放置在共享数据区中，并不需要关心消费者的行为；而消费者只需要从共享数据区中去获取数据，就不再需要关心生产者的行为。但是，这个共享数据区域中应该具备这样的线程间并发协作的功能：

1. 如果共享数据区已满的话，阻塞生产者继续生产数据放置入内；
2. 如果共享数据区为空的话，阻塞消费者继续消费数据；


在实现生产者消费者问题时，可以采用三种方式：

1. 使用Object的wait/notify的消息通知机制；

2. 使用Lock的Condition的await/signal的消息通知机制；

3. 使用BlockingQueue实现。本文主要将这三种实现方式进行总结归纳。

## wait/notify的消息通知机制

### 预备知识

Java 中，可以通过配合调用 Object 对象的 wait() 方法和 notify()方法或 notifyAll() 方法来实现线程间的通信。在线程中调用 wait() 方法，将阻塞当前线程，直至等到其他线程调用了调用 notify() 方法或 notifyAll() 方法进行通知之后，当前线程才能从wait()方法出返回，继续执行下面的操作。


1. **wait**

	该方法用来将当前线程置入休眠状态，直到接到通知或被中断为止。在调用 wait()之前，线程必须要获得该对象的对象监视器锁，即只能在**同步方法或同步块**中调用 wait()方法。调用wait()方法之后，当前线程会释放锁。如果调用wait()方法时，线程并未获取到锁的话，则会**抛出IllegalMonitorStateException**异常，这是以个RuntimeException。如果再次获取到锁的话，当前线程才能从wait()方法处成功返回。

2. **notify**

	该方法也要在同步方法或同步块中调用，即在调用前，线程也必须要获得该对象的对象级别锁，如果调用 notify()时没有持有适当的锁，也会抛出 **IllegalMonitorStateException**。
	该方法任意从WAITTING状态的线程中挑选一个进行通知，使得调用wait()方法的线程从等待队列移入到同步队列中，等待有机会再一次获取到锁，从而使得调用wait()方法的线程能够从wait()方法处退出。调用notify后，当前线程不会马上释放该对象锁，要等到程序退出同步块后，当前线程才会释放锁。

3. **notifyAll**
该方法与 notify ()方法的工作方式相同，重要的一点差异是：
notifyAll 使所有原来在该对象上 wait 的线程统统退出WAITTING状态，使得他们全部从等待队列中移入到同步队列中去，等待下一次能够有机会获取到对象监视器锁。

### wait/notify消息通知潜在的一些问题

#### **1.notify早期通知**

notify 通知的遗漏很容易理解，即 threadA 还没开始 wait 的时候，threadB 已经 notify 了，这样，threadB 通知是没有任何响应的，当 threadB 退出 synchronized 代码块后，threadA 再开始 wait，便会一直阻塞等待，直到被别的线程打断。比如在下面的示例代码中，就模拟出notify早期通知带来的问题：


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



示例中开启了**两个线程，一个是WaitThread，另一个是NotifyThread。NotifyThread会先启动，先调用notify方法。然后WaitThread线程才启动，调用wait方法，但是由于通知过了，wait方法就无法再获取到相应的通知，因此WaitThread会一直在wait方法出阻塞，这种现象就是通知过早的现象。**针对这种现象，解决方法，一般是添加一个状态标志，让waitThread调用wait方法前先判断状态是否已经改变了没，如果通知早已发出的话，WaitThread就不再去wait。对上面的代码进行更正：

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

这段代码只是增加了一个`isWait`状态变量，NotifyThread调用notify方法后会对状态变量进行更新，在WaitThread中调用wait方法之前会先对状态变量进行判断，在该示例中，调用notify后将状态变量`isWait`改变为false，因此，在WaitThread中while对isWait判断后就不会执行wait方法，从而**避免了Notify过早通知造成遗漏的情况。**

**总结：在使用线程的等待/通知机制时，一般都要配合一个 boolean 变量值（或者其他能够判断真假的条件），在 notify 之前改变该 boolean 变量的值，让 wait 返回后能够退出 while 循环（一般都要在 wait 方法外围加一层 while 循环，以防止早期通知），或在通知被遗漏后，不会被阻塞在 wait 方法处。这样便保证了程序的正确性。**


#### **2.等待wait的条件发生变化**

如果线程在等待时接受到了通知，但是之后等待的条件发生了变化，并没有再次对等待条件进行判断，也会导致程序出现错误。

下面用一个例子来说明这种情况


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

	会报异常：
	
	Exception in thread "Thread-1" Thread-0 list为空
	Thread-0 调用wait方法
	Thread-1 list为空
	Thread-1 调用wait方法
	Thread-2 开始添加元素
	Thread-1  wait方法结束
	java.lang.IndexOutOfBoundsException: Index: 0, Size: 0
```


**异常原因分析**：在这个例子中一共开启了3个线程，Consumer1,Consumer2以及Productor。首先Consumer1调用了wait方法后，线程处于了WAITTING状态，并且将对象锁释放出来。因此，Consumer2能够获取对象锁，从而进入到同步代块中，当执行到wait方法时，同样的也会释放对象锁。因此，productor能够获取到对象锁，进入到同步代码块中，向list中插入数据后，通过notifyAll方法通知处于WAITING状态的Consumer1和Consumer2线程。consumer1得到对象锁后，从wait方法出退出，删除了一个元素让List为空，方法执行结束，退出同步块，释放掉对象锁。这个时候Consumer2获取到对象锁后，从wait方法退出，继续往下执行，这个时候Consumer2再执行`lock.remove(0);`就会出错，因为List由于Consumer1删除一个元素之后已经为空了。

**解决方案：**通过上面的分析，可以看出Consumer2报异常是因为线程从wait方法退出之后没有再次对wait条件进行判断，因此，此时的wait条件已经发生了变化。解决办法就是，在wait退出之后再对条件进行判断即可。

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

上面的代码与之前的代码仅仅只是将 wait 外围的 if 语句改为 while 循环即可，这样当 list 为空时，线程便会继续等待，而不会继续去执行删除 list 中元素的代码。

总结：在使用线程的等待/通知机制时，一般都要在 while 循环中调用 wait()方法，因此xuy配合使用一个 boolean 变量（或其他能判断真假的条件，如本文中的 list.isEmpty()），满足 while 循环的条件时，进入 while 循环，执行 wait()方法，不满足 while 循环的条件时，跳出循环，执行后面的代码。


#### **3. “假死”状态**

现象：如果是多消费者和多生产者情况，如果使用notify方法可能会出现“假死”的情况，即唤醒的是同类线程。

原因分析：假设当前多个生产者线程会调用wait方法阻塞等待，当其中的生产者线程获取到对象锁之后使用notify通知处于WAITTING状态的线程，如果唤醒的仍然是生产者线程，就会造成所有的生产者线程都处于等待状态。

解决办法：将notify方法替换成notifyAll方法，如果使用的是lock的话，就将signal方法替换成signalAll方法。


> 总结

在Object提供的消息通知机制应该遵循如下这些条件：

1. 永远在while循环中对条件进行判断而不是if语句中进行wait条件的判断；
2. 使用NotifyAll而不是使用notify。

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


### wait/notifyAll实现生产者-消费者

利用wait/notifyAll实现生产者和消费者代码如下：


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
 
	输出结果：

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


## 使用Lock中Condition的await/signalAll实现生产者-消费者

参照Object的wait和notify/notifyAll方法，Condition也提供了同样的方法：

### 针对wait方法

`void await() throws InterruptedException`：当前线程进入等待状态，如果其他线程调用condition的signal或者signalAll方法并且当前线程获取Lock从await方法返回，如果在等待状态中被中断会抛出被中断异常；

`long awaitNanos(long nanosTimeout)`：当前线程进入等待状态直到被通知，中断或者超时；

`boolean await(long time, TimeUnit unit)throws InterruptedException`：同第二种，支持自定义时间单位

`boolean awaitUntil(Date deadline) throws InterruptedException`：当前线程进入等待状态直到被通知，中断或者到了某个时间


### 针对notify方法

`void signal()`：唤醒一个等待在condition上的线程，将该线程从等待队列中转移到同步队列中，如果在同步队列中能够竞争到Lock则可以从等待方法中返回。

`void signalAll()`：与1的区别在于能够唤醒所有等待在condition上的线程

也就是说wait--->await，notify---->Signal。

如果采用lock中Conditon的消息通知原理来实现生产者-消费者问题，原理同使用wait/notifyAll一样。直接上代码：

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

	输出结果：

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


## 使用BlockingQueue实现生产者-消费者 

由于BlockingQueue内部实现就附加了两个阻塞操作。即当队列已满时，阻塞向队列中插入数据的线程，直至队列中未满；当队列为空时，阻塞从队列中获取数据的线程，直至队列非空时为止。可以利用BlockingQueue实现生产者-消费者为题，阻塞队列完全可以充当共享数据区域，就可以很好的完成生产者和消费者线程之间的协作。


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


输出结果：

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

可以看出，使用BlockingQueue来实现生产者-消费者很简洁，这正是利用了BlockingQueue插入和获取数据附加阻塞操作的特性。


---

>编辑：沉默王二，内容大部分来源以下三个开源仓库：
>- [深入浅出 Java 多线程](http://concurrent.redspider.group/)
>- [并发编程知识总结](https://github.com/CL0610/Java-concurrency)
>- [Java八股文](https://github.com/CoderLeixiaoshuai/java-eight-part)

----

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
