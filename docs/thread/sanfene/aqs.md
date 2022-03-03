AbstractQueuedSynchronizer 抽象同步队列，简称 AQS ，它是Java并发包的根基，并发包中的锁就是基于AQS实现的。

*   AQS是基于一个FIFO的双向队列，其内部定义了一个节点类Node，Node 节点内部的 SHARED 用来标记该线程是获取共享资源时被阻挂起后放入AQS 队列的， EXCLUSIVE 用来标记线程是 取独占资源时被挂起后放入AQS 队列
*   AQS 使用一个 volatile 修饰的 int 类型的成员变量 state 来表示同步状态，修改同步状态成功即为获得锁，volatile 保证了变量在多线程之间的可见性，修改 State 值时通过 CAS 机制来保证修改的原子性
*   获取state的方式分为两种，独占方式和共享方式，一个线程使用独占方式获取了资源，其它线程就会在获取失败后被阻塞。一个线程使用共享方式获取了资源，另外一个线程还可以通过CAS的方式进行获取。
*   如果共享资源被占用，需要一定的阻塞等待唤醒机制来保证锁的分配，AQS 中会将竞争共享资源失败的线程添加到一个变体的 CLH 队列中。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/aqs-1.png)

先简单了解一下CLH：Craig、Landin and Hagersten 队列，是 **单向链表实现的队列**。申请线程只在本地变量上自旋，**它不断轮询前驱的状态**，如果发现 **前驱节点释放了锁就结束自旋**

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/aqs-2.png)



AQS 中的队列是 CLH 变体的虚拟双向队列，通过将每条请求共享资源的线程封装成一个节点来实现锁的分配：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/aqs-3.png)



AQS 中的 CLH 变体等待队列拥有以下特性：

*   AQS 中队列是个双向链表，也是 FIFO 先进先出的特性
*   通过 Head、Tail 头尾两个节点来组成队列结构，通过 volatile 修饰保证可见性
*   Head 指向节点为已获得锁的节点，是一个虚拟节点，节点本身不持有具体线程
*   获取不到同步状态，会将节点进行自旋获取锁，自旋一定次数失败后会将线程阻塞，相对于 CLH 队列性能较好


> [!ATTENTION]
>  图文详解 60 道Java并发面试高频题，这次面试，一定吊打面试官，整理：沉默王二，戳[转载链接](https://mp.weixin.qq.com/s/bImCIoYsH_JEzTkBx2lj4A)，作者：三分恶，戳[原文链接](https://mp.weixin.qq.com/s/1jhBZrAb7bnvkgN1TgAUpw)。