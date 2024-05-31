import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as t,c as d,a as e,d as i,b as s,e as a}from"./app-72970f25.js";const c={},o=a('<h1 id="java中9种常见的cms-gc问题分析与解决" tabindex="-1"><a class="header-anchor" href="#java中9种常见的cms-gc问题分析与解决" aria-hidden="true">#</a> Java中9种常见的CMS GC问题分析与解决</h1><p><strong>1.1 引言</strong></p><p>自 Sun 发布 Java 语言以来，开始使用 GC 技术来进行内存自动管理，避免了手动管理带来的悬挂指针（Dangling Pointer）问题，很大程度上提升了开发效率，从此 GC 技术也一举成名。GC 有着非常悠久的历史，1960 年有着“Lisp 之父”和“人工智能之父”之称的 John McCarthy 就在论文中发布了 GC 算法，60 年以来， GC 技术的发展也突飞猛进，但不管是多么前沿的收集器也都是基于三种基本算法的组合或应用，也就是说 GC 要解决的根本问题这么多年一直都没有变过。笔者认为，在不太远的将来， GC 技术依然不会过时，比起日新月异的新技术，GC 这门古典技术更值得我们学习。</p><p>那么，GC 问题处理能力能不能系统性掌握？一些影响因素都是<strong>互为因果</strong>的问题该怎么分析？比如一个服务 RT 突然上涨，有 GC 耗时增大、线程 Block 增多、慢查询增多、CPU 负载高四个表象，到底哪个是诱因？如何判断 GC 有没有问题？使用 CMS 有哪些常见问题？如何判断根因是什么？如何解决或避免这些问题？阅读完本文，相信你将会对 CMS GC 的问题处理有一个系统性的认知，更能游刃有余地解决这些问题，下面就让我们开始吧！文中若有错误之处，还请大家不吝指正。</p><p><strong>1.2 概览</strong></p><p>想要系统性地掌握 GC 问题处理，笔者这里给出一个学习路径，整体文章的框架也是按照这个结构展开，主要分四大步。</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-22ed8367a864013b?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li><p>**建立知识体系：**从 JVM 的内存结构到垃圾收集的算法和收集器，学习 GC 的基础知识，掌握一些常用的 GC 问题分析工具。</p></li><li><p>**确定评价指标：**了解基本 GC 的评价方法，摸清如何设定独立系统的指标，以及在业务场景中判断 GC 是否存在问题的手段。</p></li><li><p>**场景调优实践：**运用掌握的知识和系统评价指标，分析与解决九种 CMS 中常见 GC 问题场景。</p></li><li><p>**总结优化经验：**对整体过程做总结并提出笔者的几点建议，同时将总结到的经验完善到知识体系之中。</p></li></ul><p><strong>2. GC 基础</strong></p><p>在正式开始前，先做些简要铺垫，介绍下 JVM 内存划分、收集算法、收集器等常用概念介绍，基础比较好的同学可以直接跳过这部分。</p><p><strong>2.1 基础概念</strong></p>',11),u=a("<li><p>**GC：**GC 本身有三种语义，下文需要根据具体场景带入不同的语义：</p></li><li><p><strong>Garbage Collection</strong>：垃圾收集技术，名词。</p></li><li><p><strong>Garbage Collector</strong>：垃圾收集器，名词。</p></li><li><p><strong>Garbage Collecting</strong>：垃圾收集动作，动词。</p></li><li><p>**Mutator：**生产垃圾的角色，也就是我们的应用程序，垃圾制造者，通过 Allocator 进行 allocate 和 free。</p></li><li><p>**TLAB：**Thread Local Allocation Buffer 的简写，基于 CAS 的独享线程（Mutator Threads）可以优先将对象分配在 Eden 中的一块内存，因为是 Java 线程独享的内存区没有锁竞争，所以分配速度更快，每个 TLAB 都是一个线程独享的。</p></li>",6),v={href:"https://stackoverflow.com/questions/19154607/how-actually-card-table-and-writer-barrier-works",target:"_blank",rel:"noopener noreferrer"},m=a('<p><strong>2.2 JVM 内存划分</strong></p><p>从 JCP（Java Community Process）的官网中可以看到，目前 Java 版本最新已经到了 Java 16，未来的 Java 17 以及现在的 Java 11 和 Java 8 是 LTS 版本，JVM 规范也在随着迭代在变更，由于本文主要讨论 CMS，此处还是放 Java 8 的内存结构。</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-5379d37a996aabf9?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>GC 主要工作在 Heap 区和 MetaSpace 区（上图蓝色部分），在 Direct Memory 中，如果使用的是 DirectByteBuffer，那么在分配内存不够时则是 GC 通过 <code>Cleaner#clean</code> 间接管理。</p><p>任何自动内存管理系统都会面临的步骤：为新对象分配空间，然后收集垃圾对象空间，下面我们就展开介绍一下这些基础知识。</p><p><strong>2.3 分配对象</strong></p><p>Java 中对象地址操作主要使用 Unsafe 调用了 C 的 allocate 和 free 两个方法，分配方法有两种：</p><ul><li><p>**空闲链表（free list）：**通过额外的存储记录空闲的地址，将随机 IO 变为顺序 IO，但带来了额外的空间消耗。</p></li><li><p>**碰撞指针（bump  pointer）：**通过一个指针作为分界点，需要分配内存时，仅需把指针往空闲的一端移动与对象大小相等的距离，分配效率较高，但使用场景有限。</p></li></ul><p><strong>2.4 收集对象</strong></p><p><strong>2.4.1 识别垃圾</strong></p><ul><li><p>**引用计数法（Reference Counting）：**对每个对象的引用进行计数，每当有一个地方引用它时计数器 +1、引用失效则 -1，引用的计数放到对象头中，大于 0 的对象被认为是存活对象。虽然循环引用的问题可通过 Recycler 算法解决，但是在多线程环境下，引用计数变更也要进行昂贵的同步操作，性能较低，早期的编程语言会采用此算法。</p></li><li><p>**可达性分析，又称引用链法（Tracing GC）：**从 GC Root 开始进行对象搜索，可以被搜索到的对象即为可达对象，此时还不足以判断对象是否存活/死亡，需要经过多次标记才能更加准确地确定，整个连通图之外的对象便可以作为垃圾被回收掉。目前 Java 中主流的虚拟机均采用此算法。</p></li></ul><p>备注：引用计数法是可以处理循环引用问题的，下次面试时不要再这么说啦~ ~</p><p><strong>2.4.2 收集算法</strong></p><p>自从有自动内存管理出现之时就有的一些收集算法，不同的收集器也是在不同场景下进行组合。</p><ul><li><p>**Mark-Sweep（标记-清除）：**回收过程主要分为两个阶段，第一阶段为追踪（Tracing）阶段，即从 GC Root 开始遍历对象图，并标记（Mark）所遇到的每个对象，第二阶段为清除（Sweep）阶段，即回收器检查堆中每一个对象，并将所有未被标记的对象进行回收，整个过程不会发生对象移动。整个算法在不同的实现中会使用三色抽象（Tricolour Abstraction）、位图标记（BitMap）等技术来提高算法的效率，存活对象较多时较高效。</p></li><li><p>**Mark-Compact （标记-整理）：**这个算法的主要目的就是解决在非移动式回收器中都会存在的碎片化问题，也分为两个阶段，第一阶段与 Mark-Sweep 类似，第二阶段则会对存活对象按照整理顺序（Compaction Order）进行整理。主要实现有双指针（Two-Finger）回收算法、滑动回收（Lisp2）算法和引线整理（Threaded Compaction）算法等。</p></li><li><p>**Copying（复制）：**将空间分为两个大小相同的 From 和 To 两个半区，同一时间只会使用其中一个，每次进行回收时将一个半区的存活对象通过复制的方式转移到另一个半区。有递归（Robert R. Fenichel 和 Jerome C. Yochelson提出）和迭代（Cheney 提出）算法，以及解决了前两者递归栈、缓存行等问题的近似优先搜索算法。复制算法可以通过碰撞指针的方式进行快速地分配内存，但是也存在着空间利用率不高的缺点，另外就是存活对象比较大时复制的成本比较高。</p></li></ul><p>三种算法在是否移动对象、空间和时间方面的一些对比，假设存活对象数量为 <em>L</em>、堆空间大小为 <em>H</em>，则：</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-03f497067b9ff350?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>把 mark、sweep、compaction、copying 这几种动作的耗时放在一起看，大致有这样的关系：</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-a1c69e01cb02c636?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>虽然 compaction 与 copying 都涉及移动对象，但取决于具体算法，compaction 可能要先计算一次对象的目标地址，然后修正指针，最后再移动对象。copying 则可以把这几件事情合为一体来做，所以可以快一些。另外，还需要留意 GC 带来的开销不能只看 Collector 的耗时，还得看 Allocator 。如果能保证内存没碎片，分配就可以用 pointer bumping 方式，只需要挪一个指针就完成了分配，非常快。而如果内存有碎片就得用 freelist 之类的方式管理，分配速度通常会慢一些。</p><p><strong>2.5 收集器</strong></p>',21),p={href:"http://mp.weixin.qq.com/s?__biz=MjM5NjQ5MTI5OA==&mid=2651752559&idx=1&sn=c720b67e93db1885d72dab8799bba78c&chksm=bd1251228a65d834db610deb2ce55003e0fc1f90793e84873096db19027936f6add301242545&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},g=e("figure",null,[e("img",{src:"https://upload-images.jianshu.io/upload_images/1179389-6c3339b84c2861cf?imageMogr2/auto-orient/strip|imageView2/2/w/1240",alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1),b=e("p",null,"备注：值得一提的是，早些年国内 GC 技术的布道者 RednaxelaFX （江湖人称 R 大）曾就职于 Azul，本文的一部分材料也参考了他的一些文章。",-1),_=e("p",null,[e("strong",null,"2.5.1 分代收集器")],-1),C=e("li",null,[e("p",null,[i("**ParNew：**一款多线程的收集器，采用复制算法，主要工作在 Young 区，可以通过 "),e("code",null,"-XX:ParallelGCThreads"),i(" 参数来控制收集的线程数，整个过程都是 STW 的，常与 CMS 组合使用。")])],-1),f={href:"https://openjdk.java.net/jeps/363",target:"_blank",rel:"noopener noreferrer"},h=a('<h4 id="_2-5-2-分区收集器" tabindex="-1"><a class="header-anchor" href="#_2-5-2-分区收集器" aria-hidden="true">#</a> 2.5.2 分区收集器</h4><ul><li><p>**G1：**一种服务器端的垃圾收集器，应用在多处理器和大容量内存环境中，在实现高吞吐量的同时，尽可能地满足垃圾收集暂停时间的要求。</p></li><li><p>**ZGC：**JDK11 中推出的一款低延迟垃圾回收器，适用于大内存低延迟服务的内存管理和回收，SPECjbb 2015 基准测试，在 128G 的大堆下，最大停顿时间才 1.68 ms，停顿时间远胜于 G1 和 CMS。</p></li><li><p>**Shenandoah：**由 Red Hat 的一个团队负责开发，与 G1 类似，基于 Region 设计的垃圾收集器，但不需要 Remember Set 或者 Card Table 来记录跨 Region 引用，停顿时间和堆的大小没有任何关系。停顿时间与 ZGC 接近，下图为与 CMS 和 G1 等收集器的 benchmark。</p></li></ul><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-238d04be0f931ddc?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>2.5.3 常用收集器</strong></p><p>目前使用最多的是 CMS 和 G1 收集器，二者都有分代的概念，主要内存结构如下：</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-8082240b37153163.gif?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>2.5.4 其他收集器</strong></p><p>以上仅列出常见收集器，除此之外还有很多，如 Metronome、Stopless、Staccato、Chicken、Clover 等实时回收器，Sapphire、Compressor、Pauseless 等并发复制/整理回收器，Doligez-Leroy-Conthier 等标记整理回收器，由于篇幅原因，不在此一一介绍。</p><p><strong>2.6 常用工具</strong></p><p>工欲善其事，必先利其器，此处列出一些笔者常用的工具，具体情况大家可以自由选择，本文的问题都是使用这些工具来定位和分析的。</p><p><strong>2.6.1 命令行终端</strong></p><ul><li><p><strong>标准终端类</strong>：jps、jinfo、jstat、jstack、jmap</p></li><li><p><strong>功能整合类</strong>：jcmd、vjtools、arthas、greys</p></li></ul><p><strong>2.6.2 可视化界面</strong></p><ul><li><p><strong>简易</strong>：JConsole、JVisualvm、HA、GCHisto、GCViewer</p></li><li><p><strong>进阶</strong>：MAT、JProfiler</p></li></ul>',14),M={href:"https://gceasy.io/",target:"_blank",rel:"noopener noreferrer"},G={href:"https://heaphero.io/",target:"_blank",rel:"noopener noreferrer"},S={href:"https://fastthread.io/",target:"_blank",rel:"noopener noreferrer"},y=a(`<p><strong>3. GC 问题判断</strong></p><p>在做 GC 问题排查和优化之前，我们需要先来明确下到底是不是 GC 直接导致的问题，或者应用代码导致的 GC 异常，最终出现问题。</p><p><strong>3.1 判断 GC 有没有问题？</strong></p><p><strong>3.1.1 设定评价标准</strong></p><p>评判 GC 的两个核心指标：</p><ul><li><p>**延迟（Latency）：**也可以理解为最大停顿时间，即垃圾收集过程中一次 STW 的最长时间，越短越好，一定程度上可以接受频次的增大，GC 技术的主要发展方向。</p></li><li><p>**吞吐量（Throughput）：**应用系统的生命周期内，由于 GC 线程会占用 Mutator 当前可用的 CPU 时钟周期，吞吐量即为 Mutator 有效花费的时间占系统总运行时间的百分比，例如系统运行了 100 min，GC 耗时 1 min，则系统吞吐量为 99%，吞吐量优先的收集器可以接受较长的停顿。</p></li></ul><p>目前各大互联网公司的系统基本都更追求低延时，避免一次 GC 停顿的时间过长对用户体验造成损失，衡量指标需要结合一下应用服务的 SLA，主要如下两点来判断：</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-0116d4ae68567826?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>简而言之，即为<strong>一次停顿的时间不超过应用服务的 TP9999，GC 的吞吐量不小于 99.99%</strong>。举个例子，假设某个服务 A 的 TP9999 为 80 ms，平均 GC 停顿为 30 ms，那么该服务的最大停顿时间最好不要超过 80 ms，GC 频次控制在 5 min 以上一次。如果满足不了，那就需要调优或者通过更多资源来进行并联冗余。（大家可以先停下来，看看监控平台上面的 gc.meantime 分钟级别指标，如果超过了 6 ms 那单机 GC 吞吐量就达不到 4 个 9 了。）</p><p>备注：除了这两个指标之外还有 Footprint（资源量大小测量）、反应速度等指标，互联网这种实时系统追求低延迟，而很多嵌入式系统则追求 Footprint。</p><p><strong>3.1.2 读懂 GC Cause</strong></p><p>拿到 GC 日志，我们就可以简单分析 GC 情况了，通过一些工具，我们可以比较直观地看到 Cause 的分布情况，如下图就是使用 gceasy 绘制的图表：</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-955a1b25ed4cf223?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如上图所示，我们很清晰的就能知道是什么原因引起的 GC，以及每次的时间花费情况，但是要分析 GC 的问题，先要读懂 GC Cause，即 JVM 什么样的条件下选择进行 GC 操作，具体 Cause 的分类可以看一下 Hotspot 源码：src/share/vm/gc/shared/gcCause.hpp 和 src/share/vm/gc/shared/gcCause.cpp 中。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const char* GCCause::to_string(GCCause::Cause cause) {
  switch (cause) {
    case _java_lang_system_gc:
      return &quot;System.gc()&quot;;

    case _full_gc_alot:
      return &quot;FullGCAlot&quot;;

    case _scavenge_alot:
      return &quot;ScavengeAlot&quot;;

    case _allocation_profiler:
      return &quot;Allocation Profiler&quot;;

    case _jvmti_force_gc:
      return &quot;JvmtiEnv ForceGarbageCollection&quot;;

    case _gc_locker:
      return &quot;GCLocker Initiated GC&quot;;

    case _heap_inspection:
      return &quot;Heap Inspection Initiated GC&quot;;

    case _heap_dump:
      return &quot;Heap Dump Initiated GC&quot;;

    case _wb_young_gc:
      return &quot;WhiteBox Initiated Young GC&quot;;

    case _wb_conc_mark:
      return &quot;WhiteBox Initiated Concurrent Mark&quot;;

    case _wb_full_gc:
      return &quot;WhiteBox Initiated Full GC&quot;;

    case _no_gc:
      return &quot;No GC&quot;;

    case _allocation_failure:
      return &quot;Allocation Failure&quot;;

    case _tenured_generation_full:
      return &quot;Tenured Generation Full&quot;;

    case _metadata_GC_threshold:
      return &quot;Metadata GC Threshold&quot;;

    case _metadata_GC_clear_soft_refs:
      return &quot;Metadata GC Clear Soft References&quot;;

    case _cms_generation_full:
      return &quot;CMS Generation Full&quot;;

    case _cms_initial_mark:
      return &quot;CMS Initial Mark&quot;;

    case _cms_final_remark:
      return &quot;CMS Final Remark&quot;;

    case _cms_concurrent_mark:
      return &quot;CMS Concurrent Mark&quot;;

    case _old_generation_expanded_on_last_scavenge:
      return &quot;Old Generation Expanded On Last Scavenge&quot;;

    case _old_generation_too_full_to_scavenge:
      return &quot;Old Generation Too Full To Scavenge&quot;;

    case _adaptive_size_policy:
      return &quot;Ergonomics&quot;;

    case _g1_inc_collection_pause:
      return &quot;G1 Evacuation Pause&quot;;

    case _g1_humongous_allocation:
      return &quot;G1 Humongous Allocation&quot;;

    case _dcmd_gc_run:
      return &quot;Diagnostic Command&quot;;

    case _last_gc_cause:
      return &quot;ILLEGAL VALUE - last gc cause - ILLEGAL VALUE&quot;;

    default:
      return &quot;unknown GCCause&quot;;
  }
  ShouldNotReachHere();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重点需要关注的几个GC Cause：</p><ul><li><p>**System.gc()：**手动触发GC操作。</p></li><li><p>**CMS：**CMS GC 在执行过程中的一些动作，重点关注 CMS Initial Mark 和 CMS Final Remark 两个 STW 阶段。</p></li><li><p>**Promotion Failure：**Old 区没有足够的空间分配给 Young 区晋升的对象（即使总可用内存足够大）。</p></li><li><p>**Concurrent Mode Failure：**CMS GC 运行期间，Old 区预留的空间不足以分配给新的对象，此时收集器会发生退化，严重影响 GC 性能，下面的一个案例即为这种场景。</p></li><li><p>**GCLocker Initiated GC：**如果线程执行在 JNI 临界区时，刚好需要进行 GC，此时 GC Locker 将会阻止 GC 的发生，同时阻止其他线程进入 JNI 临界区，直到最后一个线程退出临界区时触发一次 GC。</p></li></ul><p>什么时机使用这些 Cause 触发回收，大家可以看一下 CMS 的代码，这里就不讨论了，具体在 /src/hotspot/share/gc/cms/concurrentMarkSweepGeneration.cpp 中。</p><p>shouldConcurrentCollect</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>bool CMSCollector::shouldConcurrentCollect() {
  LogTarget(Trace, gc) log;

  if (_full_gc_requested) {
    log.print(&quot;CMSCollector: collect because of explicit  gc request (or GCLocker)&quot;);
    return true;
  }

  FreelistLocker x(this);
  // ------------------------------------------------------------------
  // Print out lots of information which affects the initiation of
  // a collection.
  if (log.is_enabled() &amp;&amp; stats().valid()) {
    log.print(&quot;CMSCollector shouldConcurrentCollect: &quot;);

    LogStream out(log);
    stats().print_on(&amp;out);

    log.print(&quot;time_until_cms_gen_full %3.7f&quot;, stats().time_until_cms_gen_full());
    log.print(&quot;free=&quot; SIZE_FORMAT, _cmsGen-&gt;free());
    log.print(&quot;contiguous_available=&quot; SIZE_FORMAT, _cmsGen-&gt;contiguous_available());
    log.print(&quot;promotion_rate=%g&quot;, stats().promotion_rate());
    log.print(&quot;cms_allocation_rate=%g&quot;, stats().cms_allocation_rate());
    log.print(&quot;occupancy=%3.7f&quot;, _cmsGen-&gt;occupancy());
    log.print(&quot;initiatingOccupancy=%3.7f&quot;, _cmsGen-&gt;initiating_occupancy());
    log.print(&quot;cms_time_since_begin=%3.7f&quot;, stats().cms_time_since_begin());
    log.print(&quot;cms_time_since_end=%3.7f&quot;, stats().cms_time_since_end());
    log.print(&quot;metadata initialized %d&quot;, MetaspaceGC::should_concurrent_collect());
  }
  // ------------------------------------------------------------------

  // If the estimated time to complete a cms collection (cms_duration())
  // is less than the estimated time remaining until the cms generation
  // is full, start a collection.
  if (!UseCMSInitiatingOccupancyOnly) {
    if (stats().valid()) {
      if (stats().time_until_cms_start() == 0.0) {
        return true;
      }
    } else {

      if (_cmsGen-&gt;occupancy() &gt;= _bootstrap_occupancy) {
        log.print(&quot; CMSCollector: collect for bootstrapping statistics: occupancy = %f, boot occupancy = %f&quot;,
                  _cmsGen-&gt;occupancy(), _bootstrap_occupancy);
        return true;
      }
    }
  }
  if (_cmsGen-&gt;should_concurrent_collect()) {
    log.print(&quot;CMS old gen initiated&quot;);
    return true;
  }

  CMSHeap* heap = CMSHeap::heap();
  if (heap-&gt;incremental_collection_will_fail(true /* consult_young */)) {
    log.print(&quot;CMSCollector: collect because incremental collection will fail &quot;);
    return true;
  }

  if (MetaspaceGC::should_concurrent_collect()) {
    log.print(&quot;CMSCollector: collect for metadata allocation &quot;);
    return true;
  }

  // CMSTriggerInterval starts a CMS cycle if enough time has passed.
  if (CMSTriggerInterval &gt;= 0) {
    if (CMSTriggerInterval == 0) {
      // Trigger always
      return true;
    }

    // Check the CMS time since begin (we do not check the stats validity
    // as we want to be able to trigger the first CMS cycle as well)
    if (stats().cms_time_since_begin() &gt;= (CMSTriggerInterval / ((double) MILLIUNITS))) {
      if (stats().valid()) {
        log.print(&quot;CMSCollector: collect because of trigger interval (time since last begin %3.7f secs)&quot;,
                  stats().cms_time_since_begin());
      } else {
        log.print(&quot;CMSCollector: collect because of trigger interval (first collection)&quot;);
      }
      return true;
    }
  }

  return false;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3.2 判断是不是 GC 引发的问题？</strong></p><p>到底是结果（现象）还是原因，在一次 GC 问题处理的过程中，如何判断是 GC 导致的故障，还是系统本身引发 GC 问题。这里继续拿在本文开头提到的一个 Case：“GC 耗时增大、线程 Block 增多、慢查询增多、CPU 负载高等四个表象，如何判断哪个是根因？”，笔者这里根据自己的经验大致整理了四种判断方法供参考：</p><ul><li><p>**时序分析：**先发生的事件是根因的概率更大，通过监控手段分析各个指标的异常时间点，还原事件时间线，如先观察到 CPU 负载高（要有足够的时间 Gap），那么整个问题影响链就可能是：CPU 负载高 -&gt; 慢查询增多 -&gt; GC 耗时增大 -&gt; 线程Block增多 -&gt; RT 上涨。</p></li><li><p>**概率分析：**使用统计概率学，结合历史问题的经验进行推断，由近到远按类型分析，如过往慢查的问题比较多，那么整个问题影响链就可能是：慢查询增多 -&gt; GC 耗时增大 -&gt;  CPU 负载高   -&gt; 线程 Block 增多 -&gt; RT上涨。</p></li><li><p>**实验分析：**通过故障演练等方式对问题现场进行模拟，触发其中部分条件（一个或多个），观察是否会发生问题，如只触发线程 Block 就会发生问题，那么整个问题影响链就可能是：线程Block增多  -&gt; CPU 负载高  -&gt; 慢查询增多  -&gt; GC 耗时增大 -&gt;  RT 上涨。</p></li><li><p>**反证分析：**对其中某一表象进行反证分析，即判断表象的发不发生跟结果是否有相关性，例如我们从整个集群的角度观察到某些节点慢查和 CPU 都正常，但也出了问题，那么整个问题影响链就可能是：GC 耗时增大 -&gt; 线程 Block 增多 -&gt;  RT 上涨。</p></li></ul><p>不同的根因，后续的分析方法是完全不同的。如果是 CPU 负载高那可能需要用火焰图看下热点、如果是慢查询增多那可能需要看下 DB 情况、如果是线程 Block 引起那可能需要看下锁竞争的情况，最后如果各个表象证明都没有问题，那可能 GC 确实存在问题，可以继续分析 GC 问题了。</p><p><strong>3.3 问题分类导读</strong></p><p><strong>3.3.1 Mutator 类型</strong></p><p>Mutator 的类型根据对象存活时间比例图来看主要分为两种，在弱分代假说中也提到类似的说法，如下图所示 “Survival Time” 表示对象存活时间，“Rate” 表示对象分配比例：</p><ul><li><p>**IO 交互型：**互联网上目前大部分的服务都属于该类型，例如分布式 RPC、MQ、HTTP 网关服务等，对内存要求并不大，大部分对象在 TP9999 的时间内都会死亡， Young 区越大越好。</p></li><li><p>**MEM 计算型：**主要是分布式数据计算 Hadoop，分布式存储 HBase、Cassandra，自建的分布式缓存等，对内存要求高，对象存活时间长，Old 区越大越好。</p></li></ul><p>当然，除了二者之外还有介于两者之间的场景，本篇文章主要讨论第一种情况。对象 Survival Time 分布图，对我们设置 GC 参数有着非常重要的指导意义，如下图就可以简单推算分代的边界。</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-60042d509303a8da.gif?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>3.3.2 GC 问题分类</strong></p><p>笔者选取了九种不同类型的 GC 问题，覆盖了大部分场景，如果有更好的场景，欢迎在评论区给出。</p><ul><li><p>**Unexpected GC：**意外发生的 GC，实际上不需要发生，我们可以通过一些手段去避免。</p></li><li><p>**Space Shock：**空间震荡问题，参见“场景一：动态扩容引起的空间震荡”。</p></li><li><p>**Explicit GC：**显示执行 GC 问题，参见“场景二：显式 GC 的去与留”。</p></li><li><p>**Partial GC：**部分收集操作的 GC，只对某些分代/分区进行回收。</p></li><li><p>**CMS：**Old GC 频繁，参见“场景五：CMS Old GC 频繁”。</p></li><li><p>**CMS：**Old GC 不频繁但单次耗时大，参见“场景六：单次 CMS Old GC 耗时长”。</p></li><li><p>**ParNew：**Young GC 频繁，参见“场景四：过早晋升”。</p></li><li><p>**Young GC：**分代收集里面的 Young 区收集动作，也可以叫做 Minor GC。</p></li><li><p>**Old GC：**分代收集里面的 Old 区收集动作，也可以叫做 Major GC，有些也会叫做 Full GC，但其实这种叫法是不规范的，在 CMS 发生 Foreground GC 时才是 Full GC，CMSScavengeBeforeRemark 参数也只是在 Remark 前触发一次Young GC。</p></li><li><p>**Full GC：**全量收集的 GC，对整个堆进行回收，STW 时间会比较长，一旦发生，影响较大，也可以叫做 Major GC，参见“场景七：内存碎片&amp;收集器退化”。</p></li><li><p>**MetaSpace：**元空间回收引发问题，参见“场景三：MetaSpace 区 OOM”。</p></li><li><p>**Direct Memory：**直接内存（也可以称作为堆外内存）回收引发问题，参见“场景八：堆外内存 OOM”。</p></li><li><p>**JNI：**本地 Native 方法引发问题，参见“场景九：JNI 引发的 GC 问题”。</p></li></ul><p><strong>3.3.3 排查难度</strong></p><p>一个问题的<strong>解决难度跟它的常见程度成反比</strong>，大部分我们都可以通过各种搜索引擎找到类似的问题，然后用同样的手段尝试去解决。当一个问题在各种网站上都找不到相似的问题时，那么可能会有两种情况，一种这不是一个问题，另一种就是遇到一个隐藏比较深的问题，遇到这种问题可能就要深入到源码级别去调试了。以下 GC 问题场景，排查难度从上到下依次递增。</p><p><strong>4. 常见场景分析与解决</strong></p><p><strong>4.1 场景一：动态扩容引起的空间震荡</strong></p><p><strong>4.1.1 现象</strong></p><p>服务<strong>刚刚启动时 GC 次数较多</strong>，最大空间剩余很多但是依然发生 GC，这种情况我们可以通过观察 GC 日志或者通过监控工具来观察堆的空间变化情况即可。GC Cause 一般为 Allocation Failure，且在 GC 日志中会观察到经历一次 GC ，堆内各个空间的大小会被调整，如下图所示：</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-67e901a7c5e7e30f?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>4.1.2 原因</strong></p><p>在 JVM 的参数中 <code>-Xms</code> 和 <code>-Xmx</code> 设置的不一致，在初始化时只会初始 <code>-Xms</code> 大小的空间存储信息，每当空间不够用时再向操作系统申请，这样的话必然要进行一次 GC。具体是通过 <code>ConcurrentMarkSweepGeneration::compute_new_size()</code> 方法计算新的空间大小：</p><p>ConcurrentMarkSweepGeneration::compute_new_size()</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>void ConcurrentMarkSweepGeneration::compute_new_size() {
  assert_locked_or_safepoint(Heap_lock);

  // If incremental collection failed, we just want to expand
  // to the limit.
  if (incremental_collection_failed()) {
    clear_incremental_collection_failed();
    grow_to_reserved();
    return;
  }

  // The heap has been compacted but not reset yet.
  // Any metric such as free() or used() will be incorrect.

  CardGeneration::compute_new_size();

  // Reset again after a possible resizing
  if (did_compact()) {
    cmsSpace()-&gt;reset_after_compaction();
  }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，如果空间剩余很多时也会进行缩容操作，JVM 通过 <code>-XX:MinHeapFreeRatio</code> 和 <code>-XX:MaxHeapFreeRatio</code> 来控制扩容和缩容的比例，调节这两个值也可以控制伸缩的时机，例如扩容便是使用  <code>GenCollectedHeap::expand_heap_and_allocate()</code> 来完成的，代码如下：</p><p>GenCollectedHeap::expand_heap_and_allocate()</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>HeapWord* GenCollectedHeap::expand_heap_and_allocate(size_t size, bool   is_tlab) {
  HeapWord* result = NULL;
  if (_old_gen-&gt;should_allocate(size, is_tlab)) {
    result = _old_gen-&gt;expand_and_allocate(size, is_tlab);
  }
  if (result == NULL) {
    if (_young_gen-&gt;should_allocate(size, is_tlab)) {
      result = _young_gen-&gt;expand_and_allocate(size, is_tlab);
    }
  }
  assert(result == NULL || is_in_reserved(result), &quot;result not in heap&quot;);
  return result;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整个伸缩的模型理解可以看这个图，当 committed 的空间大小超过了低水位/高水位的大小，capacity 也会随之调整：</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-3aeae4ad893ad80e?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>4.1.3 策略</strong></p><p><strong>定位</strong>：观察 CMS GC 触发时间点 Old/MetaSpace 区的 committed 占比是不是一个固定的值，或者像上文提到的观察总的内存使用率也可以。</p><p><strong>解决</strong>：尽量<strong>将成对出现的空间大小配置参数设置成固定的</strong>，如 <code>-Xms</code> 和 <code>-Xmx</code>，<code>-XX:MaxNewSize</code> 和 <code>-XX:NewSize</code>，<code>-XX:MetaSpaceSize</code> 和 <code>-XX:MaxMetaSpaceSize</code> 等。</p><p><strong>4.1.4 小结</strong></p><p>一般来说，我们需要保证 Java 虚拟机的堆是稳定的，确保 <code>-Xms</code> 和 <code>-Xmx</code> 设置的是一个值（即初始值和最大值一致），获得一个稳定的堆，同理在 MetaSpace 区也有类似的问题。不过在不追求停顿时间的情况下震荡的空间也是有利的，可以动态地伸缩以节省空间，例如作为富客户端的 Java 应用。</p><p>这个问题虽然初级，但是发生的概率还真不小，尤其是在一些规范不太健全的情况下。</p><p><strong>4.2 场景二：显式 GC 的去与留</strong></p><p><strong>4.2.1 现象</strong></p><p>除了扩容缩容会触发 CMS GC 之外，还有 Old 区达到回收阈值、MetaSpace 空间不足、Young 区晋升失败、大对象担保失败等几种触发条件，如果这些情况都没有发生却触发了 GC ？这种情况有可能是代码中手动调用了 System.gc 方法，此时可以找到 GC 日志中的 GC Cause 确认下。那么这种 GC 到底有没有问题，翻看网上的一些资料，有人说可以添加 <code>-XX:+DisableExplicitGC</code> 参数来避免这种 GC，也有人说不能加这个参数，加了就会影响 Native Memory 的回收。先说结论，笔者这里建议保留 System.gc，那为什么要保留？我们一起来分析下。</p><p><strong>4.2.2 原因</strong></p><p>找到 System.gc 在 Hotspot 中的源码，可以发现增加 <code>-XX:+DisableExplicitGC</code> 参数后，这个方法变成了一个空方法，如果没有加的话便会调用 <code>Universe::heap()::collect</code> 方法，继续跟进到这个方法中，发现 System.gc 会引发一次 STW 的 Full GC，对整个堆做收集。</p><p>DisableExplicitGC</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>JVM_ENTRY_NO_ENV(void, JVM_GC(void))
  JVMWrapper(&quot;JVM_GC&quot;);
  if (!DisableExplicitGC) {
    Universe::heap()-&gt;collect(GCCause::_java_lang_system_gc);
  }
JVM_END
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>GenCollectedHeap::collect()</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>void GenCollectedHeap::collect(GCCause::Cause cause) {
  if (cause == GCCause::_wb_young_gc) {
    // Young collection for the WhiteBox API.
    collect(cause, YoungGen);
  } else {
#ifdef ASSERT
  if (cause == GCCause::_scavenge_alot) {
    // Young collection only.
    collect(cause, YoungGen);
  } else {
    // Stop-the-world full collection.
    collect(cause, OldGen);
  }
#else
    // Stop-the-world full collection.
    collect(cause, OldGen);
#endif
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>保留 System.gc</strong></p><p>此处补充一个知识点，<strong>CMS GC 共分为 Background 和 Foreground 两种模式</strong>，前者就是我们常规理解中的并发收集，可以不影响正常的业务线程运行，但 Foreground Collector 却有很大的差异，他会进行一次压缩式 GC。此压缩式 GC 使用的是跟 Serial Old GC 一样的 LISP2 算法，其使用 Mark-Compact 来做 Full GC，一般称之为 MSC（Mark-Sweep-Compact），它收集的范围是 Java 堆的 Young 区和 Old 区以及 MetaSpace。由上面的算法章节中我们知道 compact 的代价是巨大的，那么使用 Foreground Collector 时将会带来非常长的 STW。如果在应用程序中 System.gc 被频繁调用，那就非常危险了。</p><p><strong>去掉 System.gc</strong></p><p>如果禁用掉的话就会带来另外一个内存泄漏问题，此时就需要说一下 DirectByteBuffer，它有着零拷贝等特点，被 Netty 等各种 NIO 框架使用，会使用到堆外内存。堆内存由 JVM 自己管理，堆外内存必须要手动释放，DirectByteBuffer 没有 Finalizer，它的 Native Memory 的清理工作是通过 <code>sun.misc.Cleaner</code> 自动完成的，是一种基于 PhantomReference 的清理工具，比普通的 Finalizer 轻量些。</p><p>为 DirectByteBuffer 分配空间过程中会显式调用 System.gc ，希望通过 Full GC 来强迫已经无用的 DirectByteBuffer 对象释放掉它们关联的 Native Memory，下面为代码实现：</p><p>reserveMemory</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// These methods should be called whenever direct memory is allocated or
// freed.  They allow the user to control the amount of direct memory
// which a process may access.  All sizes are specified in bytes.
static void reserveMemory(long size) {

    synchronized (Bits.class) {
        if (!memoryLimitSet &amp;&amp; VM.isBooted()) {
            maxMemory = VM.maxDirectMemory();
            memoryLimitSet = true;
        }
        if (size &lt;= maxMemory - reservedMemory) {
            reservedMemory += size;
            return;
        }
    }

    System.gc();
    try {
        Thread.sleep(100);
    } catch (InterruptedException x) {
        // Restore interrupt status
        Thread.currentThread().interrupt();
    }
    synchronized (Bits.class) {
        if (reservedMemory + size &gt; maxMemory)
            throw new OutOfMemoryError(&quot;Direct buffer memory&quot;);
        reservedMemory += size;
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>HotSpot VM 只会在 Old GC 的时候才会对 Old 中的对象做 Reference Processing，而在 Young GC 时只会对 Young 里的对象做 Reference Processing。Young 中的 DirectByteBuffer 对象会在 Young GC 时被处理，也就是说，做 CMS GC 的话会对 Old 做 Reference Processing，进而能触发 Cleaner 对已死的 DirectByteBuffer 对象做清理工作。但如果很长一段时间里没做过 GC 或者只做了 Young GC 的话则不会在 Old 触发 Cleaner 的工作，那么就可能让本来已经死亡，但已经晋升到 Old 的 DirectByteBuffer 关联的 Native Memory 得不到及时释放。这几个实现特征使得依赖于 System.gc 触发 GC 来保证 DirectByteMemory 的清理工作能及时完成。如果打开了 <code>-XX:+DisableExplicitGC</code>，清理工作就可能得不到及时完成，于是就有发生 Direct Memory 的 OOM。</p><h4 id="_4-2-3-策略" tabindex="-1"><a class="header-anchor" href="#_4-2-3-策略" aria-hidden="true">#</a> 4.2.3 策略</h4><p>通过上面的分析看到，无论是保留还是去掉都会有一定的风险点，不过目前互联网中的 RPC 通信会大量使用 NIO，所以笔者在这里建议保留。此外 JVM 还提供了 <code>-XX:+ExplicitGCInvokesConcurrent</code>  和 <code>-XX:+ExplicitGCInvokesConcurrentAndUnloadsClasses</code>  参数来将 System.gc 的触发类型从 Foreground 改为 Background，同时 Background 也会做 Reference Processing，这样的话就能大幅降低了 STW 开销，同时也不会发生 NIO Direct Memory OOM。</p><h4 id="_4-2-4-小结" tabindex="-1"><a class="header-anchor" href="#_4-2-4-小结" aria-hidden="true">#</a> 4.2.4 小结</h4><p>不止 CMS，在 G1 或 ZGC中开启 <code>ExplicitGCInvokesConcurrent</code> 模式，都会采用高性能的并发收集方式进行收集，不过还是建议在代码规范方面也要做好约束，规范好 System.gc 的使用。</p><p>P.S. HotSpot 对 System.gc 有特别处理，最主要的地方体现在一次 System.gc 是否与普通 GC 一样会触发 GC 的统计/阈值数据的更新，HotSpot 里的许多 GC 算法都带有自适应的功能，会根据先前收集的效率来决定接下来的 GC 中使用的参数，但 System.gc 默认不更新这些统计数据，避免用户强行 GC 对这些自适应功能的干扰（可以参考 -XX:+UseAdaptiveSizePolicyWithSystemGC 参数，默认是 false）。</p><p><strong>4.3 场景三：MetaSpace 区 OOM</strong></p><p><strong>4.3.1 现象</strong></p><p>JVM 在启动后或者某个时间点开始，<strong>MetaSpace 的已使用大小在持续增长，同时每次 GC 也无法释放，调大 MetaSpace 空间也无法彻底解决</strong>。</p><p><strong>4.3.2 原因</strong></p><p>在讨论为什么会 OOM 之前，我们先来看一下这个区里面会存什么数据，Java 7 之前字符串常量池被放到了 Perm 区，所有被 intern 的 String 都会被存在这里，由于 String.intern 是不受控的，所以 <code>-XX:MaxPermSize</code> 的值也不太好设置，经常会出现 <code>java.lang.OutOfMemoryError: PermGen space</code> 异常，所以在 Java 7 之后常量池等字面量（Literal）、类静态变量（Class Static）、符号引用（Symbols Reference）等几项被移到 Heap 中。而 Java 8 之后 PermGen 也被移除，取而代之的是 MetaSpace。</p><p>在最底层，JVM 通过 mmap 接口向操作系统申请内存映射，每次申请 2MB 空间，这里是虚拟内存映射，不是真的就消耗了主存的 2MB，只有之后在使用的时候才会真的消耗内存。申请的这些内存放到一个链表中 VirtualSpaceList，作为其中的一个 Node。</p><p>在上层，MetaSpace 主要由 Klass Metaspace 和 NoKlass Metaspace 两大部分组成。</p><ul><li><p>**Klass MetaSpace：**就是用来存 Klass 的，就是 Class 文件在 JVM 里的运行时数据结构，这部分默认放在 Compressed Class Pointer Space 中，是一块连续的内存区域，紧接着 Heap。Compressed Class Pointer Space 不是必须有的，如果设置了 <code>-XX:-UseCompressedClassPointers</code>，或者 <code>-Xmx</code> 设置大于 32 G，就不会有这块内存，这种情况下 Klass 都会存在 NoKlass Metaspace 里。</p></li><li><p>**NoKlass MetaSpace：**专门来存 Klass 相关的其他的内容，比如 Method，ConstantPool 等，可以由多块不连续的内存组成。虽然叫做 NoKlass Metaspace，但是也其实可以存 Klass 的内容，上面已经提到了对应场景。</p></li></ul><p>具体的定义都可以在源码  shared/vm/memory/metaspace.hpp 中找到：</p><p>MetaSpace</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Metaspace : public AllStatic {

  friend class MetaspaceShared;

 public:
  enum MetadataType {
    ClassType,
    NonClassType,
    MetadataTypeCount
  };
  enum MetaspaceType {
    ZeroMetaspaceType = 0,
    StandardMetaspaceType = ZeroMetaspaceType,
    BootMetaspaceType = StandardMetaspaceType + 1,
    AnonymousMetaspaceType = BootMetaspaceType + 1,
    ReflectionMetaspaceType = AnonymousMetaspaceType + 1,
    MetaspaceTypeCount
  };

 private:

  // Align up the word size to the allocation word size
  static size_t align_word_size_up(size_t);

  // Aligned size of the metaspace.
  static size_t _compressed_class_space_size;

  static size_t compressed_class_space_size() {
    return _compressed_class_space_size;
  }

  static void set_compressed_class_space_size(size_t size) {
    _compressed_class_space_size = size;
  }

  static size_t _first_chunk_word_size;
  static size_t _first_class_chunk_word_size;

  static size_t _commit_alignment;
  static size_t _reserve_alignment;
  DEBUG_ONLY(static bool   _frozen;)

  // Virtual Space lists for both classes and other metadata
  static metaspace::VirtualSpaceList* _space_list;
  static metaspace::VirtualSpaceList* _class_space_list;

  static metaspace::ChunkManager* _chunk_manager_metadata;
  static metaspace::ChunkManager* _chunk_manager_class;

  static const MetaspaceTracer* _tracer;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MetaSpace 的对象为什么无法释放，我们看下面两点：</p><ul><li><p>**MetaSpace 内存管理：*<em>类和其元数据的生命周期与其对应的类加载器相同，只要类的类加载器是存活的，在 Metaspace 中的类元数据也是存活的，不能被回收。每个加载器有单独的存储空间，通过 ClassLoaderMetaspace 来进行管理 SpaceManager</em> 的指针，相互隔离的。</p></li><li><p>**MetaSpace 弹性伸缩：**由于 MetaSpace 空间和 Heap 并不在一起，所以这块的空间可以不用设置或者单独设置，一般情况下避免 MetaSpace 耗尽 VM 内存都会设置一个 MaxMetaSpaceSize，在运行过程中，如果实际大小小于这个值，JVM 就会通过 <code>-XX:MinMetaspaceFreeRatio</code> 和 <code>-XX:MaxMetaspaceFreeRatio</code> 两个参数动态控制整个 MetaSpace 的大小，具体使用可以看 <code>MetaSpaceGC::compute_new_size()</code> 方法（下方代码），这个方法会在 CMSCollector 和 G1CollectorHeap 等几个收集器执行 GC 时调用。这个里面会根据 <code>used_after_gc</code>，<code>MinMetaspaceFreeRatio</code> 和 <code>MaxMetaspaceFreeRatio</code> 这三个值计算出来一个新的 <code>_capacity_until_GC</code> 值（水位线）。然后根据实际的 <code>_capacity_until_GC</code> 值使用 <code>MetaspaceGC::inc_capacity_until_GC()</code> 和 <code>MetaspaceGC::dec_capacity_until_GC()</code> 进行 expand 或 shrink，这个过程也可以参照场景一中的伸缩模型进行理解。</p></li></ul><p>MetaspaceGC::compute_new_size()</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>void MetaspaceGC::compute_new_size() {
  assert(_shrink_factor &lt;= 100, &quot;invalid shrink factor&quot;);
  uint current_shrink_factor = _shrink_factor;
  _shrink_factor = 0;
  const size_t used_after_gc = MetaspaceUtils::committed_bytes();
  const size_t capacity_until_GC = MetaspaceGC::capacity_until_GC();

  const double minimum_free_percentage = MinMetaspaceFreeRatio / 100.0;
  const double maximum_used_percentage = 1.0 - minimum_free_percentage;

  const double min_tmp = used_after_gc / maximum_used_percentage;
  size_t minimum_desired_capacity =
    (size_t)MIN2(min_tmp, double(max_uintx));
  // Don&#39;t shrink less than the initial generation size
  minimum_desired_capacity = MAX2(minimum_desired_capacity,
                                  MetaspaceSize);

  log_trace(gc, metaspace)(&quot;MetaspaceGC::compute_new_size: &quot;);
  log_trace(gc, metaspace)(&quot;    minimum_free_percentage: %6.2f  maximum_used_percentage: %6.2f&quot;,
                           minimum_free_percentage, maximum_used_percentage);
  log_trace(gc, metaspace)(&quot;     used_after_gc       : %6.1fKB&quot;, used_after_gc / (double) K);


  size_t shrink_bytes = 0;
  if (capacity_until_GC &lt; minimum_desired_capacity) {
    // If we have less capacity below the metaspace HWM, then
    // increment the HWM.
    size_t expand_bytes = minimum_desired_capacity - capacity_until_GC;
    expand_bytes = align_up(expand_bytes, Metaspace::commit_alignment());
    // Don&#39;t expand unless it&#39;s significant
    if (expand_bytes &gt;= MinMetaspaceExpansion) {
      size_t new_capacity_until_GC = 0;
      bool succeeded = MetaspaceGC::inc_capacity_until_GC(expand_bytes, &amp;new_capacity_until_GC);
      assert(succeeded, &quot;Should always succesfully increment HWM when at safepoint&quot;);

      Metaspace::tracer()-&gt;report_gc_threshold(capacity_until_GC,
                                               new_capacity_until_GC,
                                               MetaspaceGCThresholdUpdater::ComputeNewSize);
      log_trace(gc, metaspace)(&quot;    expanding:  minimum_desired_capacity: %6.1fKB  expand_bytes: %6.1fKB  MinMetaspaceExpansion: %6.1fKB  new metaspace HWM:  %6.1fKB&quot;,
                               minimum_desired_capacity / (double) K,
                               expand_bytes / (double) K,
                               MinMetaspaceExpansion / (double) K,
                               new_capacity_until_GC / (double) K);
    }
    return;
  }

  // No expansion, now see if we want to shrink
  // We would never want to shrink more than this
  assert(capacity_until_GC &gt;= minimum_desired_capacity,
         SIZE_FORMAT &quot; &gt;= &quot; SIZE_FORMAT,
         capacity_until_GC, minimum_desired_capacity);
  size_t max_shrink_bytes = capacity_until_GC - minimum_desired_capacity;

  // Should shrinking be considered?
  if (MaxMetaspaceFreeRatio &lt; 100) {
    const double maximum_free_percentage = MaxMetaspaceFreeRatio / 100.0;
    const double minimum_used_percentage = 1.0 - maximum_free_percentage;
    const double max_tmp = used_after_gc / minimum_used_percentage;
    size_t maximum_desired_capacity = (size_t)MIN2(max_tmp, double(max_uintx));
    maximum_desired_capacity = MAX2(maximum_desired_capacity,
                                    MetaspaceSize);
    log_trace(gc, metaspace)(&quot;    maximum_free_percentage: %6.2f  minimum_used_percentage: %6.2f&quot;,
                             maximum_free_percentage, minimum_used_percentage);
    log_trace(gc, metaspace)(&quot;    minimum_desired_capacity: %6.1fKB  maximum_desired_capacity: %6.1fKB&quot;,
                             minimum_desired_capacity / (double) K, maximum_desired_capacity / (double) K);

    assert(minimum_desired_capacity &lt;= maximum_desired_capacity,
           &quot;sanity check&quot;);

    if (capacity_until_GC &gt; maximum_desired_capacity) {
      // Capacity too large, compute shrinking size
      shrink_bytes = capacity_until_GC - maximum_desired_capacity;
      shrink_bytes = shrink_bytes / 100 * current_shrink_factor;

      shrink_bytes = align_down(shrink_bytes, Metaspace::commit_alignment());

      assert(shrink_bytes &lt;= max_shrink_bytes,
             &quot;invalid shrink size &quot; SIZE_FORMAT &quot; not &lt;= &quot; SIZE_FORMAT,
             shrink_bytes, max_shrink_bytes);
      if (current_shrink_factor == 0) {
        _shrink_factor = 10;
      } else {
        _shrink_factor = MIN2(current_shrink_factor * 4, (uint) 100);
      }
      log_trace(gc, metaspace)(&quot;    shrinking:  initThreshold: %.1fK  maximum_desired_capacity: %.1fK&quot;,
                               MetaspaceSize / (double) K, maximum_desired_capacity / (double) K);
      log_trace(gc, metaspace)(&quot;    shrink_bytes: %.1fK  current_shrink_factor: %d  new shrink factor: %d  MinMetaspaceExpansion: %.1fK&quot;,
                               shrink_bytes / (double) K, current_shrink_factor, _shrink_factor, MinMetaspaceExpansion / (double) K);
    }
  }

  // Don&#39;t shrink unless it&#39;s significant
  if (shrink_bytes &gt;= MinMetaspaceExpansion &amp;&amp;
      ((capacity_until_GC - shrink_bytes) &gt;= MetaspaceSize)) {
    size_t new_capacity_until_GC = MetaspaceGC::dec_capacity_until_GC(shrink_bytes);
    Metaspace::tracer()-&gt;report_gc_threshold(capacity_until_GC,
                                             new_capacity_until_GC,
                                             MetaspaceGCThresholdUpdater::ComputeNewSize);
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由场景一可知，为了避免弹性伸缩带来的额外 GC 消耗，我们会将 <code>-XX:MetaSpaceSize</code> 和 <code>-XX:MaxMetaSpaceSize</code> 两个值设置为固定的，但是这样也会导致在空间不够的时候无法扩容，然后频繁地触发 GC，最终 OOM。所以关键原因就是 ClassLoader 不停地在内存中 load 了新的 Class ，一般这种问题都发生在动态类加载等情况上。</p><p><strong>4.3.3 策略</strong></p><p>了解大概什么原因后，如何定位和解决就很简单了，可以 dump 快照之后通过 JProfiler 或 MAT 观察 Classes 的 Histogram（直方图） 即可，或者直接通过命令即可定位， jcmd 打几次 Histogram 的图，看一下具体是哪个包下的 Class 增加较多就可以定位了。不过有时候也要结合InstBytes、KlassBytes、Bytecodes、MethodAll 等几项指标综合来看下。如下图便是笔者使用 jcmd 排查到一个 Orika 的问题。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>jcmd &lt;PID&gt; GC.class_stats|awk &#39;{print$13}&#39;|sed  &#39;s/\\(.*\\)\\.\\(.*\\)/\\1/g&#39;|sort |uniq -c|sort -nrk1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-ccbcb6abec0be074?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果无法从整体的角度定位，可以添加 <code>-XX:+TraceClassLoading</code> 和 <code>-XX:+TraceClassUnLoading</code> 参数观察详细的类加载和卸载信息。</p><p><strong>4.3.4 小结</strong></p><p>原理理解比较复杂，但定位和解决问题会比较简单，经常会出问题的几个点有 Orika 的 classMap、JSON 的 ASMSerializer、Groovy 动态加载类等，基本都集中在反射、Javasisit 字节码增强、CGLIB 动态代理、OSGi 自定义类加载器等的技术点上。另外就是及时给 MetaSpace 区的使用率加一个监控，如果指标有波动提前发现并解决问题。</p><p>**4.4 场景四：过早晋升 * **</p><p><strong>4.4.1 现象</strong></p><p>这种场景主要发生在分代的收集器上面，专业的术语称为“Premature Promotion”。90% 的对象朝生夕死，只有在 Young 区经历过几次 GC 的洗礼后才会晋升到 Old 区，每经历一次 GC 对象的 GC Age 就会增长 1，最大通过 <code>-XX:MaxTenuringThreshold</code> 来控制。</p><p>过早晋升一般不会直接影响 GC，总会伴随着浮动垃圾、大对象担保失败等问题，但这些问题不是立刻发生的，我们可以观察以下几种现象来判断是否发生了过早晋升。</p><p><strong>分配速率接近于晋升速率</strong>，对象晋升年龄较小。</p><p>GC 日志中出现“Desired survivor size 107347968 bytes, <strong>new threshold 1(max 6)</strong>”等信息，说明此时经历过一次 GC 就会放到 Old 区。</p><p><strong>Full GC 比较频繁</strong>，且经历过一次 GC 之后 Old 区的<strong>变化比例非常大</strong>。</p><p>比如说 Old 区触发的回收阈值是 80%，经历过一次 GC 之后下降到了 10%，这就说明 Old 区的 70% 的对象存活时间其实很短，如下图所示，Old 区大小每次 GC 后从 2.1G 回收到 300M，也就是说回收掉了 1.8G 的垃圾，只有 <strong>300M 的活跃对象</strong>。整个 Heap 目前是 4G，活跃对象只占了不到十分之一。</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-c54bcc03f90e3453?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>过早晋升的危害：</p><ul><li><p>Young GC 频繁，总的吞吐量下降。</p></li><li><p>Full GC 频繁，可能会有较大停顿。</p></li></ul><p><strong>4.4.2 原因</strong></p><p>主要的原因有以下两点：</p><ul><li><p>**Young/Eden 区过小：**过小的直接后果就是 Eden 被装满的时间变短，本应该回收的对象参与了 GC 并晋升，Young GC 采用的是复制算法，由基础篇我们知道 copying 耗时远大于 mark，也就是 Young GC 耗时本质上就是 copy 的时间（CMS 扫描 Card Table 或 G1 扫描 Remember Set 出问题的情况另说），没来及回收的对象增大了回收的代价，所以 Young GC  时间增加，同时又无法快速释放空间，Young GC 次数也跟着增加。</p></li><li><p>**分配速率过大：**可以观察出问题前后 Mutator 的分配速率，如果有明显波动可以尝试观察网卡流量、存储类中间件慢查询日志等信息，看是否有大量数据被加载到内存中。</p></li></ul><p>同时无法 GC 掉对象还会带来另外一个问题，引发动态年龄计算：JVM 通过 <code>-XX:MaxTenuringThreshold</code> 参数来控制晋升年龄，每经过一次 GC，年龄就会加一，达到最大年龄就可以进入 Old 区，最大值为 15（因为 JVM 中使用 4 个比特来表示对象的年龄）。设定固定的 MaxTenuringThreshold 值作为晋升条件：</p><ul><li><p>MaxTenuringThreshold 如果设置得过大，原本应该晋升的对象一直停留在 Survivor 区，直到 Survivor 区溢出，一旦溢出发生，Eden + Survivor 中对象将不再依据年龄全部提升到 Old 区，这样对象老化的机制就失效了。</p></li><li><p>MaxTenuringThreshold 如果设置得过小，过早晋升即对象不能在 Young 区充分被回收，大量短期对象被晋升到 Old 区，Old 区空间迅速增长，引起频繁的 Major GC，分代回收失去了意义，严重影响 GC 性能。</p></li></ul><p>相同应用在不同时间的表现不同，特殊任务的执行或者流量成分的变化，都会导致对象的生命周期分布发生波动，那么固定的阈值设定，因为无法动态适应变化，会造成和上面问题，所以 Hotspot 会使用动态计算的方式来调整晋升的阈值。</p><p>具体动态计算可以看一下 Hotspot 源码，具体在 /src/hotspot/share/gc/shared/ageTable.cpp 的 <code>compute_tenuring_threshold</code> 方法中：</p><p>compute_tenuring_threshold</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>uint ageTable::compute_tenuring_threshold(size_t survivor_capacity) {
  //TargetSurvivorRatio默认50，意思是：在回收之后希望survivor区的占用率达到这个比例
  size_t desired_survivor_size = (size_t)((((double) survivor_capacity)*TargetSurvivorRatio)/100);
  size_t total = 0;
  uint age = 1;
  assert(sizes[0] == 0, &quot;no objects with age zero should be recorded&quot;);
  while (age &lt; table_size) {//table_size=16
    total += sizes[age];
    //如果加上这个年龄的所有对象的大小之后，占用量&gt;期望的大小，就设置age为新的晋升阈值
    if (total &gt; desired_survivor_size) break;
    age++;
  }

  uint result = age &lt; MaxTenuringThreshold ? age : MaxTenuringThreshold;
  if (PrintTenuringDistribution || UsePerfData) {

    //打印期望的survivor的大小以及新计算出来的阈值，和设置的最大阈值
    if (PrintTenuringDistribution) {
      gclog_or_tty-&gt;cr();
      gclog_or_tty-&gt;print_cr(&quot;Desired survivor size &quot; SIZE_FORMAT &quot; bytes, new threshold %u (max %u)&quot;,
        desired_survivor_size*oopSize, result, (int) MaxTenuringThreshold);
    }

    total = 0;
    age = 1;
    while (age &lt; table_size) {
      total += sizes[age];
      if (sizes[age] &gt; 0) {
        if (PrintTenuringDistribution) {
          gclog_or_tty-&gt;print_cr(&quot;- age %3u: &quot; SIZE_FORMAT_W(10) &quot; bytes, &quot; SIZE_FORMAT_W(10) &quot; total&quot;,
                                        age,    sizes[age]*oopSize,          total*oopSize);
        }
      }
      if (UsePerfData) {
        _perf_sizes[age]-&gt;set_value(sizes[age]*oopSize);
      }
      age++;
    }
    if (UsePerfData) {
      SharedHeap* sh = SharedHeap::heap();
      CollectorPolicy* policy = sh-&gt;collector_policy();
      GCPolicyCounters* gc_counters = policy-&gt;counters();
      gc_counters-&gt;tenuring_threshold()-&gt;set_value(result);
      gc_counters-&gt;desired_survivor_size()-&gt;set_value(
        desired_survivor_size*oopSize);
    }
  }

  return result;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到 Hotspot 遍历所有对象时，从所有年龄为 0 的对象占用的空间开始累加，如果加上年龄等于 n 的所有对象的空间之后，使用 Survivor 区的条件值（TargetSurvivorRatio / 100，TargetSurvivorRatio 默认值为 50）进行判断，若大于这个值则结束循环，将 n 和 MaxTenuringThreshold 比较，若 n 小，则阈值为 n，若 n 大，则只能去设置最大阈值为 MaxTenuringThreshold。<strong>动态年龄触发后导致更多的对象进入了 Old 区，造成资源浪费</strong>。</p><h4 id="_4-4-3-策略" tabindex="-1"><a class="header-anchor" href="#_4-4-3-策略" aria-hidden="true">#</a> 4.4.3 策略</h4><p>知道问题原因后我们就有解决的方向，如果是 <strong>Young/Eden 区过小</strong>，我们可以在总的 Heap 内存不变的情况下适当增大 Young 区，具体怎么增加？一般情况下 Old 的大小应当为活跃对象的 2~3 倍左右，考虑到浮动垃圾问题最好在 3 倍左右，剩下的都可以分给 Young 区。</p><p>拿笔者的一次典型过早晋升优化来看，原配置为 Young 1.2G + Old 2.8G，通过观察 CMS GC 的情况找到存活对象大概为 300~400M，于是调整 Old 1.5G 左右，剩下 2.5G 分给 Young 区。仅仅调了一个 Young 区大小参数（<code>-Xmn</code>），整个 JVM 一分钟 Young GC 从 26 次降低到了 11 次，单次时间也没有增加，总的 GC 时间从 1100ms 降低到了 500ms，CMS GC 次数也从 40 分钟左右一次降低到了 7 小时 30 分钟一次。</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-275fb3e2ef819510.gif?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-f35d8959165c9626.gif?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果是分配速率过大：</p><ul><li><p><strong>偶发较大</strong>：通过内存分析工具找到问题代码，从业务逻辑上做一些优化。</p></li><li><p><strong>一直较大</strong>：当前的 Collector 已经不满足 Mutator 的期望了，这种情况要么扩容 Mutator 的 VM，要么调整 GC 收集器类型或加大空间。</p></li></ul><p><strong>4.4.4 小结</strong></p><p>过早晋升问题一般不会特别明显，但日积月累之后可能会爆发一波收集器退化之类的问题，所以我们还是要提前避免掉的，可以看看自己系统里面是否有这些现象，如果比较匹配的话，可以尝试优化一下。一行代码优化的 ROI 还是很高的。</p><p>如果在观察 Old 区前后比例变化的过程中，发现可以回收的比例非常小，如从 80% 只回收到了 60%，说明我们大部分对象都是存活的，Old 区的空间可以适当调大些。</p><p><strong>4.4.5 加餐</strong></p><p>关于在调整 Young 与 Old 的比例时，如何选取具体的 NewRatio 值，这里将问题抽象成为一个蓄水池模型，找到以下关键衡量指标，大家可以根据自己场景进行推算。</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-d2e906333a2d992a.gif?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-db3d904f3a8e35c5.gif?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li><p>NewRatio 的值 r 与 v<sub>a</sub>、v<sub>p</sub>、v<sub>yc</sub>、v<sub>oc</sub>、r<sub>s</sub> 等值存在一定函数相关性（r<sub>s</sub> 越小 r 越大、r 越小 v<sub>p</sub> 越小，…，之前尝试使用 NN 来辅助建模，但目前还没有完全算出具体的公式，有想法的同学可以在评论区给出你的答案 ）。</p></li><li><p>总停顿时间 T  为 Young GC 总时间 T<sub>yc</sub> 和 Old GC 总时间 T<sub>oc</sub> 之和，其中 T<sub>yc</sub> 与 v<sub>yc</sub> 和 v<sub>p</sub> 相关，T<sub>oc</sub> 与 v<sub>oc</sub>相关。</p></li><li><p>忽略掉 GC 时间后，两次 Young GC 的时间间隔要大于 TP9999 时间，这样尽量让对象在 Eden 区就被回收，可以减少很多停顿。</p></li></ul><p>**4.5 场景五：CMS Old GC 频繁 ***</p><p><strong>4.5.1 现象</strong></p><p>Old 区频繁的做 CMS GC，但是每次耗时不是特别长，整体最大 STW 也在可接受范围内，但由于 GC 太频繁导致吞吐下降比较多。</p><p><strong>4.5.2 原因</strong></p><p>这种情况比较常见，基本都是一次 Young GC 完成后，负责处理 CMS GC 的一个后台线程 concurrentMarkSweepThread 会不断地轮询，使用 <code>shouldConcurrentCollect()</code> 方法做一次检测，判断是否达到了回收条件。如果达到条件，使用 <code>collect_in_background()</code> 启动一次 Background 模式 GC。轮询的判断是使用 <code>sleepBeforeNextCycle()</code> 方法，间隔周期为 <code>-XX:CMSWaitDuration</code> 决定，默认为2s。</p><p>具体代码在：src/hotspot/share/gc/cms/concurrentMarkSweepThread.cpp。</p><p>run_service()</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>void ConcurrentMarkSweepThread::run_service() {
  assert(this == cmst(), &quot;just checking&quot;);

  if (BindCMSThreadToCPU &amp;&amp; !os::bind_to_processor(CPUForCMSThread)) {
    log_warning(gc)(&quot;Couldn&#39;t bind CMS thread to processor &quot; UINTX_FORMAT, CPUForCMSThread);
  }

  while (!should_terminate()) {
    sleepBeforeNextCycle();
    if (should_terminate()) break;
    GCIdMark gc_id_mark;
    GCCause::Cause cause = _collector-&gt;_full_gc_requested ?
      _collector-&gt;_full_gc_cause : GCCause::_cms_concurrent_mark;
    _collector-&gt;collect_in_background(cause);
  }
  verify_ok_to_terminate();
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>sleepBeforeNextCycle()</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>void ConcurrentMarkSweepThread::sleepBeforeNextCycle() {
  while (!should_terminate()) {
    if(CMSWaitDuration &gt;= 0) {
      // Wait until the next synchronous GC, a concurrent full gc
      // request or a timeout, whichever is earlier.
      wait_on_cms_lock_for_scavenge(CMSWaitDuration);
    } else {
      // Wait until any cms_lock event or check interval not to call shouldConcurrentCollect permanently
      wait_on_cms_lock(CMSCheckInterval);
    }
    // Check if we should start a CMS collection cycle
    if (_collector-&gt;shouldConcurrentCollect()) {
      return;
    }
    // .. collection criterion not yet met, let&#39;s go back
    // and wait some more
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>判断是否进行回收的代码在：/src/hotspot/share/gc/cms/concurrentMarkSweepGeneration.cpp。</p><p>shouldConcurrentCollect()</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>bool CMSCollector::shouldConcurrentCollect() {
  LogTarget(Trace, gc) log;

  if (_full_gc_requested) {
    log.print(&quot;CMSCollector: collect because of explicit  gc request (or GCLocker)&quot;);
    return true;
  }

  FreelistLocker x(this);
  // ------------------------------------------------------------------
  // Print out lots of information which affects the initiation of
  // a collection.
  if (log.is_enabled() &amp;&amp; stats().valid()) {
    log.print(&quot;CMSCollector shouldConcurrentCollect: &quot;);

    LogStream out(log);
    stats().print_on(&amp;out);

    log.print(&quot;time_until_cms_gen_full %3.7f&quot;, stats().time_until_cms_gen_full());
    log.print(&quot;free=&quot; SIZE_FORMAT, _cmsGen-&gt;free());
    log.print(&quot;contiguous_available=&quot; SIZE_FORMAT, _cmsGen-&gt;contiguous_available());
    log.print(&quot;promotion_rate=%g&quot;, stats().promotion_rate());
    log.print(&quot;cms_allocation_rate=%g&quot;, stats().cms_allocation_rate());
    log.print(&quot;occupancy=%3.7f&quot;, _cmsGen-&gt;occupancy());
    log.print(&quot;initiatingOccupancy=%3.7f&quot;, _cmsGen-&gt;initiating_occupancy());
    log.print(&quot;cms_time_since_begin=%3.7f&quot;, stats().cms_time_since_begin());
    log.print(&quot;cms_time_since_end=%3.7f&quot;, stats().cms_time_since_end());
    log.print(&quot;metadata initialized %d&quot;, MetaspaceGC::should_concurrent_collect());
  }
  // ------------------------------------------------------------------
  if (!UseCMSInitiatingOccupancyOnly) {
    if (stats().valid()) {
      if (stats().time_until_cms_start() == 0.0) {
        return true;
      }
    } else {

      if (_cmsGen-&gt;occupancy() &gt;= _bootstrap_occupancy) {
        log.print(&quot; CMSCollector: collect for bootstrapping statistics: occupancy = %f, boot occupancy = %f&quot;,
                  _cmsGen-&gt;occupancy(), _bootstrap_occupancy);
        return true;
      }
    }
  }

  if (_cmsGen-&gt;should_concurrent_collect()) {
    log.print(&quot;CMS old gen initiated&quot;);
    return true;
  }

  // We start a collection if we believe an incremental collection may fail;
  // this is not likely to be productive in practice because it&#39;s probably too
  // late anyway.
  CMSHeap* heap = CMSHeap::heap();
  if (heap-&gt;incremental_collection_will_fail(true /* consult_young */)) {
    log.print(&quot;CMSCollector: collect because incremental collection will fail &quot;);
    return true;
  }

  if (MetaspaceGC::should_concurrent_collect()) {
    log.print(&quot;CMSCollector: collect for metadata allocation &quot;);
    return true;
  }

  // CMSTriggerInterval starts a CMS cycle if enough time has passed.
  if (CMSTriggerInterval &gt;= 0) {
    if (CMSTriggerInterval == 0) {
      // Trigger always
      return true;
    }

    // Check the CMS time since begin (we do not check the stats validity
    // as we want to be able to trigger the first CMS cycle as well)
    if (stats().cms_time_since_begin() &gt;= (CMSTriggerInterval / ((double) MILLIUNITS))) {
      if (stats().valid()) {
        log.print(&quot;CMSCollector: collect because of trigger interval (time since last begin %3.7f secs)&quot;,
                  stats().cms_time_since_begin());
      } else {
        log.print(&quot;CMSCollector: collect because of trigger interval (first collection)&quot;);
      }
      return true;
    }
  }

  return false;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析其中逻辑判断是否触发 GC，分为以下几种情况：</p><ul><li><p>**触发 CMS GC：**通过调用 <code>_collector-&gt;collect_in_background()</code> 进行触发 Background GC 。</p></li><li><p>CMS 默认采用 JVM 运行时的统计数据判断是否需要触发 CMS GC，如果需要根据 <code>-XX:CMSInitiatingOccupancyFraction</code> 的值进行判断，需要设置参数 <code>-XX:+UseCMSInitiatingOccupancyOnly</code>。</p></li><li><p>如果开启了 <code>-XX:UseCMSInitiatingOccupancyOnly</code> 参数，判断当前 Old 区使用率是否大于阈值，则触发 CMS GC，该阈值可以通过参数 <code>-XX:CMSInitiatingOccupancyFraction</code> 进行设置，如果没有设置，默认为 92%。</p></li><li><p>如果之前的 Young GC 失败过，或者下次 Young 区执行 Young GC 可能失败，这两种情况下都需要触发 CMS GC。</p></li><li><p>CMS 默认不会对 MetaSpace 或 Perm 进行垃圾收集，如果希望对这些区域进行垃圾收集，需要设置参数 <code>-XX:+CMSClassUnloadingEnabled</code>。</p></li><li><p>**触发 Full GC：**直接进行 Full GC，这种情况到场景七中展开说明。</p></li><li><p>如果 <code>_full_gc_requested</code> 为真，说明有明确的需求要进行 GC，比如调用 System.gc。</p></li><li><p>在 Eden 区为对象或 TLAB 分配内存失败，导致一次 Young GC，在 <code>GenCollectorPolicy</code> 类的 <code>satisfy_failed_allocation()</code> 方法中进行判断。</p></li></ul><p>大家可以看一下源码中的日志打印，通过日志我们就可以比较清楚地知道具体的原因，然后就可以着手分析了。</p><p><strong>4.5.3 策略</strong></p><p>我们这里还是拿最常见的达到回收比例这个场景来说，与过早晋升不同的是这些对象确实存活了一段时间，Survival Time 超过了 TP9999 时间，但是又达不到长期存活，如各种数据库、网络链接，带有失效时间的缓存等。</p><p>处理这种常规内存泄漏问题基本是一个思路，主要步骤如下：</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-8d4ff8c462410a8b?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Dump Diff 和 Leak Suspects 比较直观就不介绍了，这里说下其它几个关键点：</p><ul><li><p><strong>内存 Dump：<strong>使用 jmap、arthas 等 dump 堆进行快照时记得摘掉流量，同时</strong>分别在 CMS GC 的发生前后分别 dump 一次</strong>。</p></li><li><p>**分析 Top Component：**要记得按照对象、类、类加载器、包等多个维度观察 Histogram，同时使用 outgoing 和 incoming 分析关联的对象，另外就是 Soft Reference 和 Weak Reference、Finalizer 等也要看一下。</p></li><li><p>**分析 Unreachable：**重点看一下这个，关注下 Shallow 和 Retained 的大小。如下图所示，笔者之前一次 GC 优化，就根据 Unreachable Objects 发现了 Hystrix 的滑动窗口问题。</p></li></ul><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-887b79c6e849022f?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>4.5.4 小结</strong></p><p>经过整个流程下来基本就能定位问题了，不过在优化的过程中记得使用<strong>控制变量</strong>的方法来优化，防止一些会加剧问题的改动被掩盖。</p><p>**4.6 场景六：单次 CMS Old GC 耗时长 ***</p><p><strong>4.6.1 现象</strong></p><p>CMS GC 单次 STW 最大超过 1000ms，不会频繁发生，如下图所示最长达到了 8000ms。某些场景下会引起“雪崩效应”，这种场景非常危险，我们应该尽量避免出现。</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-9be8760d24bfa6bd?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>4.6.2 原因</strong></p><p>CMS 在回收的过程中，STW 的阶段主要是 Init Mark 和 Final Remark 这两个阶段，也是导致 CMS Old GC 最多的原因，另外有些情况就是在 STW 前等待 Mutator 的线程到达 SafePoint 也会导致时间过长，但这种情况较少，我们在此处主要讨论前者。发生收集器退化或者碎片压缩的场景请看场景七。</p><p>想要知道这两个阶段为什么会耗时，我们需要先看一下这两个阶段都会干什么。</p><p>核心代码都在 /src/hotspot/share/gc/cms/concurrentMarkSweepGeneration.cpp 中，内部有个线程 ConcurrentMarkSweepThread 轮询来校验，Old 区的垃圾回收相关细节被完全封装在 <code>CMSCollector</code> 中，调用入口就是 ConcurrentMarkSweepThread 调用的 <code>CMSCollector::collect_in_background</code> 和 <code>ConcurrentMarkSweepGeneration</code> 调用的 <code>CMSCollector::collect</code> 方法，此处我们讨论大多数场景的 <code>collect_in_background</code>。整个过程中会 STW 的主要是 initial Mark 和 Final Remark，核心代码在 <code>VM_CMS_Initial_Mark</code> / <code>VM_CMS_Final_Remark</code> 中，执行时需要将执行权交由 VMThread 来执行。</p><ul><li>CMS Init Mark执行步骤，实现在 <code>CMSCollector::checkpointRootsInitialWork()</code> 和 <code>CMSParInitialMarkTask::work</code> 中，整体步骤和代码如下：</li></ul><p>CMSCollector::checkpointRootsInitialWork()</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>void CMSCollector::checkpointRootsInitialWork() {
  assert(SafepointSynchronize::is_at_safepoint(), &quot;world should be stopped&quot;);
  assert(_collectorState == InitialMarking, &quot;just checking&quot;);

  // Already have locks.
  assert_lock_strong(bitMapLock());
  assert(_markBitMap.isAllClear(), &quot;was reset at end of previous cycle&quot;);

  // Setup the verification and class unloading state for this
  // CMS collection cycle.
  setup_cms_unloading_and_verification_state();

  GCTraceTime(Trace, gc, phases) ts(&quot;checkpointRootsInitialWork&quot;, _gc_timer_cm);

  // Reset all the PLAB chunk arrays if necessary.
  if (_survivor_plab_array != NULL &amp;&amp; !CMSPLABRecordAlways) {
    reset_survivor_plab_arrays();
  }

  ResourceMark rm;
  HandleMark  hm;

  MarkRefsIntoClosure notOlder(_span, &amp;_markBitMap);
  CMSHeap* heap = CMSHeap::heap();

  verify_work_stacks_empty();
  verify_overflow_empty();

  heap-&gt;ensure_parsability(false);  // fill TLABs, but no need to retire them
  // Update the saved marks which may affect the root scans.
  heap-&gt;save_marks();

  // weak reference processing has not started yet.
  ref_processor()-&gt;set_enqueuing_is_done(false);

  // Need to remember all newly created CLDs,
  // so that we can guarantee that the remark finds them.
  ClassLoaderDataGraph::remember_new_clds(true);

  // Whenever a CLD is found, it will be claimed before proceeding to mark
  // the klasses. The claimed marks need to be cleared before marking starts.
  ClassLoaderDataGraph::clear_claimed_marks();

  print_eden_and_survivor_chunk_arrays();

  {
    if (CMSParallelInitialMarkEnabled) {
      // The parallel version.
      WorkGang* workers = heap-&gt;workers();
      assert(workers != NULL, &quot;Need parallel worker threads.&quot;);
      uint n_workers = workers-&gt;active_workers();

      StrongRootsScope srs(n_workers);

      CMSParInitialMarkTask tsk(this, &amp;srs, n_workers);
      initialize_sequential_subtasks_for_young_gen_rescan(n_workers);
      // If the total workers is greater than 1, then multiple workers
      // may be used at some time and the initialization has been set
      // such that the single threaded path cannot be used.
      if (workers-&gt;total_workers() &gt; 1) {
        workers-&gt;run_task(&amp;tsk);
      } else {
        tsk.work(0);
      }
    } else {
      // The serial version.
      CLDToOopClosure cld_closure(&amp;notOlder, true);
      heap-&gt;rem_set()-&gt;prepare_for_younger_refs_iterate(false); // Not parallel.

      StrongRootsScope srs(1);

      heap-&gt;cms_process_roots(&amp;srs,
                             true,   // young gen as roots
                             GenCollectedHeap::ScanningOption(roots_scanning_options()),
                             should_unload_classes(),
                             &amp;notOlder,
                             &amp;cld_closure);
    }
  }

  // Clear mod-union table; it will be dirtied in the prologue of
  // CMS generation per each young generation collection.
  assert(_modUnionTable.isAllClear(),
       &quot;Was cleared in most recent final checkpoint phase&quot;
       &quot; or no bits are set in the gc_prologue before the start of the next &quot;
       &quot;subsequent marking phase.&quot;);

  assert(_ct-&gt;cld_rem_set()-&gt;mod_union_is_clear(), &quot;Must be&quot;);
  // Save the end of the used_region of the constituent generations
  // to be used to limit the extent of sweep in each generation.
  save_sweep_limits();
  verify_overflow_empty();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-e7fa98f83dac0698.gif?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>整个过程比较简单，从 GC Root 出发标记 Old 中的对象，处理完成后借助 BitMap 处理下 Young 区对 Old 区的引用，整个过程基本都比较快，很少会有较大的停顿。</p><ul><li>CMS Final Remark 执行步骤，实现在 <code>CMSCollector::checkpointRootsFinalWork()</code> 中，整体代码和步骤如下：</li></ul><p>CMSCollector::checkpointRootsFinalWork()</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>void CMSCollector::checkpointRootsFinalWork() {
  GCTraceTime(Trace, gc, phases) tm(&quot;checkpointRootsFinalWork&quot;, _gc_timer_cm);

  assert(haveFreelistLocks(), &quot;must have free list locks&quot;);
  assert_lock_strong(bitMapLock());

  ResourceMark rm;
  HandleMark   hm;

  CMSHeap* heap = CMSHeap::heap();

  if (should_unload_classes()) {
    CodeCache::gc_prologue();
  }
  assert(haveFreelistLocks(), &quot;must have free list locks&quot;);
  assert_lock_strong(bitMapLock());

  heap-&gt;ensure_parsability(false);  // fill TLAB&#39;s, but no need to retire them
  // Update the saved marks which may affect the root scans.
  heap-&gt;save_marks();

  print_eden_and_survivor_chunk_arrays();

  {
    if (CMSParallelRemarkEnabled) {
      GCTraceTime(Debug, gc, phases) t(&quot;Rescan (parallel)&quot;, _gc_timer_cm);
      do_remark_parallel();
    } else {
      GCTraceTime(Debug, gc, phases) t(&quot;Rescan (non-parallel)&quot;, _gc_timer_cm);
      do_remark_non_parallel();
    }
  }
  verify_work_stacks_empty();
  verify_overflow_empty();

  {
    GCTraceTime(Trace, gc, phases) ts(&quot;refProcessingWork&quot;, _gc_timer_cm);
    refProcessingWork();
  }
  verify_work_stacks_empty();
  verify_overflow_empty();

  if (should_unload_classes()) {
    CodeCache::gc_epilogue();
  }
  JvmtiExport::gc_epilogue();
  assert(_markStack.isEmpty(), &quot;No grey objects&quot;);
  size_t ser_ovflw = _ser_pmc_remark_ovflw + _ser_pmc_preclean_ovflw +
                     _ser_kac_ovflw        + _ser_kac_preclean_ovflw;
  if (ser_ovflw &gt; 0) {
    log_trace(gc)(&quot;Marking stack overflow (benign) (pmc_pc=&quot; SIZE_FORMAT &quot;, pmc_rm=&quot; SIZE_FORMAT &quot;, kac=&quot; SIZE_FORMAT &quot;, kac_preclean=&quot; SIZE_FORMAT &quot;)&quot;,
                         _ser_pmc_preclean_ovflw, _ser_pmc_remark_ovflw, _ser_kac_ovflw, _ser_kac_preclean_ovflw);
    _markStack.expand();
    _ser_pmc_remark_ovflw = 0;
    _ser_pmc_preclean_ovflw = 0;
    _ser_kac_preclean_ovflw = 0;
    _ser_kac_ovflw = 0;
  }
  if (_par_pmc_remark_ovflw &gt; 0 || _par_kac_ovflw &gt; 0) {
     log_trace(gc)(&quot;Work queue overflow (benign) (pmc_rm=&quot; SIZE_FORMAT &quot;, kac=&quot; SIZE_FORMAT &quot;)&quot;,
                          _par_pmc_remark_ovflw, _par_kac_ovflw);
     _par_pmc_remark_ovflw = 0;
    _par_kac_ovflw = 0;
  }
   if (_markStack._hit_limit &gt; 0) {
     log_trace(gc)(&quot; (benign) Hit max stack size limit (&quot; SIZE_FORMAT &quot;)&quot;,
                          _markStack._hit_limit);
   }
   if (_markStack._failed_double &gt; 0) {
     log_trace(gc)(&quot; (benign) Failed stack doubling (&quot; SIZE_FORMAT &quot;), current capacity &quot; SIZE_FORMAT,
                          _markStack._failed_double, _markStack.capacity());
   }
  _markStack._hit_limit = 0;
  _markStack._failed_double = 0;

  if ((VerifyAfterGC || VerifyDuringGC) &amp;&amp;
      CMSHeap::heap()-&gt;total_collections() &gt;= VerifyGCStartAt) {
    verify_after_remark();
  }

  _gc_tracer_cm-&gt;report_object_count_after_gc(&amp;_is_alive_closure);

  // Change under the freelistLocks.
  _collectorState = Sweeping;
  // Call isAllClear() under bitMapLock
  assert(_modUnionTable.isAllClear(),
      &quot;Should be clear by end of the final marking&quot;);
  assert(_ct-&gt;cld_rem_set()-&gt;mod_union_is_clear(),
      &quot;Should be clear by end of the final marking&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-1a98f9a720335361?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Final Remark 是最终的第二次标记，这种情况只有在 Background GC 执行了 InitialMarking 步骤的情形下才会执行，如果是 Foreground GC 执行的 InitialMarking 步骤则不需要再次执行 FinalRemark。Final Remark 的开始阶段与 Init Mark 处理的流程相同，但是后续多了 Card Table 遍历、Reference 实例的清理并将其加入到 Reference 维护的 <code>pend_list</code> 中，如果要收集元数据信息，还要清理 SystemDictionary、CodeCache、SymbolTable、StringTable 等组件中不再使用的资源。</p><p><strong>4.6.3 策略</strong></p><p>知道了两个 STW 过程执行流程，我们分析解决就比较简单了，由于大部分问题都出在 Final Remark 过程，这里我们也拿这个场景来举例，主要步骤：</p><ul><li>**【方向】**观察详细 GC 日志，找到出问题时 Final Remark 日志，分析下 Reference 处理和元数据处理 real 耗时是否正常，详细信息需要通过 <code>-XX:+PrintReferenceGC</code> 参数开启。<strong>基本在日志里面就能定位到大概是哪个方向出了问题，耗时超过 10% 的就需要关注</strong>。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2019-02-27T19:55:37.920+0800: 516952.915: [GC (CMS Final Remark) 516952.915: [ParNew516952.939: [SoftReference, 0 refs, 0.0003857 secs]516952.939: [WeakReference, 1362 refs, 0.0002415 secs]516952.940: [FinalReference, 146 refs, 0.0001233 secs]516952.940: [PhantomReference, 0 refs, 57 refs, 0.0002369 secs]516952.940: [JNI Weak Reference, 0.0000662 secs][class unloading, 0.1770490 secs]516953.329: [scrub symbol table, 0.0442567 secs]516953.373: [scrub string table, 0.0036072 secs][1 CMS-remark: 1638504K(2048000K)] 1667558K(4352000K), 0.5269311 secs] [Times: user=1.20 sys=0.03, real=0.53 secs]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>**【根因】**有了具体的方向我们就可以进行深入的分析，一般来说最容易出问题的地方就是 Reference 中的 FinalReference 和元数据信息处理中的 scrub symbol table 两个阶段，想要找到具体问题代码就需要内存分析工具 MAT 或 JProfiler 了，注意要 dump 即将开始 CMS GC 的堆。在用 MAT 等工具前也可以先用命令行看下对象 Histogram，有可能直接就能定位问题。</p></li><li><p>对 FinalReference 的分析主要观察 <code>java.lang.ref.Finalizer</code> 对象的 dominator tree，找到泄漏的来源。经常会出现问题的几个点有 Socket 的 <code>SocksSocketImpl</code> 、Jersey 的 <code>ClientRuntime</code>、MySQL 的 <code>ConnectionImpl</code> 等等。</p></li><li><p>scrub symbol table 表示清理元数据符号引用耗时，符号引用是 Java 代码被编译成字节码时，方法在 JVM 中的表现形式，生命周期一般与 Class 一致，当 <code>_should_unload_classes</code> 被设置为 true 时在 <code>CMSCollector::refProcessingWork()</code> 中与 Class Unload、String Table 一起被处理。</p></li></ul><p>CMSCollector::refProcessingWork()</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if (should_unload_classes()) {
    {
      GCTraceTime(Debug, gc, phases) t(&quot;Class Unloading&quot;, _gc_timer_cm);

      // Unload classes and purge the SystemDictionary.
      bool purged_class = SystemDictionary::do_unloading(_gc_timer_cm);

      // Unload nmethods.
      CodeCache::do_unloading(&amp;_is_alive_closure, purged_class);

      // Prune dead klasses from subklass/sibling/implementor lists.
      Klass::clean_weak_klass_links(purged_class);
    }

    {
      GCTraceTime(Debug, gc, phases) t(&quot;Scrub Symbol Table&quot;, _gc_timer_cm);
      // Clean up unreferenced symbols in symbol table.
      SymbolTable::unlink();
    }

    {
      GCTraceTime(Debug, gc, phases) t(&quot;Scrub String Table&quot;, _gc_timer_cm);
      // Delete entries for dead interned strings.
      StringTable::unlink(&amp;_is_alive_closure);
    }
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>**【策略】**知道 GC 耗时的根因就比较好处理了，这种问题不会大面积同时爆发，不过有很多时候单台 STW 的时间会比较长，如果业务影响比较大，及时摘掉流量，具体后续优化策略如下：</p></li><li><p>FinalReference：找到内存来源后通过优化代码的方式来解决，如果短时间无法定位可以增加 <code>-XX:+ParallelRefProcEnabled</code> 对 Reference 进行并行处理。</p></li><li><p>symbol table：观察 MetaSpace 区的历史使用峰值，以及每次 GC 前后的回收情况，一般没有使用动态类加载或者 DSL 处理等，MetaSpace 的使用率上不会有什么变化，这种情况可以通过 <code>-XX:-CMSClassUnloadingEnabled</code> 来避免 MetaSpace 的处理，JDK8 会默认开启 CMSClassUnloadingEnabled，这会使得 CMS 在 CMS-Remark 阶段尝试进行类的卸载。</p></li></ul><p><strong>4.6.4 小结</strong></p><p>正常情况进行的 Background CMS GC，出现问题基本都集中在 Reference 和 Class 等元数据处理上，在 Reference 类的问题处理方面，不管是 FinalReference，还是 SoftReference、WeakReference 核心的手段就是找准时机 dump 快照，然后用内存分析工具来分析。Class 处理方面目前除了关闭类卸载开关，没有太好的方法。</p><p>在 G1 中同样有 Reference 的问题，可以观察日志中的 Ref Proc，处理方法与 CMS 类似。</p><p><strong>4.7 场景七：内存碎片&amp;收集器退化</strong></p><p><strong>4.7.1 现象</strong></p><p>并发的 CMS GC 算法，退化为 Foreground 单线程串行 GC 模式，STW 时间超长，有时会长达十几秒。其中 CMS 收集器退化后单线程串行 GC 算法有两种：</p><ul><li><p>带压缩动作的算法，称为 MSC，上面我们介绍过，使用标记-清理-压缩，单线程全暂停的方式，对整个堆进行垃圾收集，也就是真正意义上的 Full GC，暂停时间要长于普通 CMS。</p></li><li><p>不带压缩动作的算法，收集 Old 区，和普通的 CMS 算法比较相似，暂停时间相对 MSC 算法短一些。</p></li></ul><p><strong>4.7.2 原因</strong></p><p>CMS 发生收集器退化主要有以下几种情况。</p><p><strong>晋升失败（Promotion Failed）</strong></p><p>顾名思义，晋升失败就是指在进行 Young GC 时，Survivor 放不下，对象只能放入 Old，但此时 Old 也放不下。直觉上乍一看这种情况可能会经常发生，但其实因为有 concurrentMarkSweepThread 和担保机制的存在，发生的条件是很苛刻的，除非是短时间将 Old 区的剩余空间迅速填满，例如上文中说的动态年龄判断导致的过早晋升（见下文的增量收集担保失败）。另外还有一种情况就是内存碎片导致的 Promotion Failed，Young GC 以为 Old 有足够的空间，结果到分配时，晋级的大对象找不到连续的空间存放。</p><p>使用 CMS 作为 GC 收集器时，运行过一段时间的 Old 区如下图所示，清除算法导致内存出现多段的不连续，出现大量的内存碎片。</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-46bc05c0c97a2403?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>碎片带来了两个问题：</p><ul><li><p><strong>空间分配效率较低</strong>：上文已经提到过，如果是连续的空间 JVM 可以通过使用 pointer bumping 的方式来分配，而对于这种有大量碎片的空闲链表则需要逐个访问 freelist 中的项来访问，查找可以存放新建对象的地址。</p></li><li><p><strong>空间利用效率变低</strong>：Young 区晋升的对象大小大于了连续空间的大小，那么将会触发 Promotion Failed ，即使整个 Old 区的容量是足够的，但由于其不连续，也无法存放新对象，也就是本文所说的问题。</p></li></ul><p><strong>增量收集担保失败</strong></p><p>分配内存失败后，会判断统计得到的 Young GC 晋升到 Old 的平均大小，以及当前 Young 区已使用的大小也就是最大可能晋升的对象大小，是否大于 Old 区的剩余空间。只要 CMS 的剩余空间比前两者的任意一者大，CMS 就认为晋升还是安全的，反之，则代表不安全，不进行Young GC，直接触发Full GC。</p><p><strong>显式 GC</strong></p><p>这种情况参见场景二。</p><p><strong>并发模式失败（Concurrent Mode Failure）</strong></p><p>最后一种情况，也是发生概率较高的一种，在 GC 日志中经常能看到 Concurrent Mode Failure 关键字。这种是由于并发 Background CMS GC 正在执行，同时又有 Young GC 晋升的对象要放入到了 Old 区中，而此时 Old 区空间不足造成的。</p><p>为什么 CMS GC 正在执行还会导致收集器退化呢？主要是由于 CMS 无法处理浮动垃圾（Floating Garbage）引起的。CMS 的并发清理阶段，Mutator 还在运行，因此不断有新的垃圾产生，而这些垃圾不在这次清理标记的范畴里，无法在本次 GC 被清除掉，这些就是浮动垃圾，除此之外在 Remark 之前那些断开引用脱离了读写屏障控制的对象也算浮动垃圾。所以 Old 区回收的阈值不能太高，否则预留的内存空间很可能不够，从而导致 Concurrent Mode Failure 发生。</p><p><strong>4.7.3 策略</strong></p><p>分析到具体原因后，我们就可以针对性解决了，具体思路还是从根因出发，具体解决策略：</p><ul><li><p>**内存碎片：**通过配置 <code>-XX:UseCMSCompactAtFullCollection=true</code> 来控制 Full GC的过程中是否进行空间的整理（默认开启，注意是Full GC，不是普通CMS GC），以及 <code>-XX: CMSFullGCsBeforeCompaction=n</code> 来控制多少次 Full GC 后进行一次压缩。</p></li><li><p>**增量收集：**降低触发 CMS GC 的阈值，即参数 <code>-XX:CMSInitiatingOccupancyFraction</code> 的值，让 CMS GC 尽早执行，以保证有足够的连续空间，也减少 Old 区空间的使用大小，另外需要使用 <code>-XX:+UseCMSInitiatingOccupancyOnly</code> 来配合使用，不然 JVM 仅在第一次使用设定值，后续则自动调整。</p></li><li><p>**浮动垃圾：**视情况控制每次晋升对象的大小，或者缩短每次 CMS GC 的时间，必要时可调节 NewRatio 的值。另外就是使用 <code>-XX:+CMSScavengeBeforeRemark</code> 在过程中提前触发一次 Young GC，防止后续晋升过多对象。</p></li></ul><p><strong>4.7.4 小结</strong></p><p>正常情况下触发并发模式的 CMS GC，停顿非常短，对业务影响很小，但 CMS GC 退化后，影响会非常大，建议发现一次后就彻底根治。只要能定位到内存碎片、浮动垃圾、增量收集相关等具体产生原因，还是比较好解决的，关于内存碎片这块，如果 <code>-XX:CMSFullGCsBeforeCompaction</code> 的值不好选取的话，可以使用 <code>-XX:PrintFLSStatistics</code> 来观察内存碎片率情况，然后再设置具体的值。</p><p>最后就是在编码的时候也要避免需要连续地址空间的大对象的产生，如过长的字符串，用于存放附件、序列化或反序列化的 byte 数组等，还有就是过早晋升问题尽量在爆发问题前就避免掉。</p><p><strong>4.8 场景八：堆外内存 OOM</strong></p><p><strong>4.8.1 现象</strong></p><p>内存使用率不断上升，甚至开始使用 SWAP 内存，同时可能出现 GC 时间飙升，线程被 Block 等现象，**通过 top 命令发现 Java 进程的 RES 甚至超过了 **<strong><code>-Xmx</code> 的大小</strong>。出现这些现象时，基本可以确定是出现了堆外内存泄漏。</p><p><strong>4.8.2 原因</strong></p><p>JVM 的堆外内存泄漏，主要有两种的原因：</p><ul><li><p>通过 <code>UnSafe#allocateMemory</code>，<code>ByteBuffer#allocateDirect</code> 主动申请了堆外内存而没有释放，常见于 NIO、Netty 等相关组件。</p></li><li><p>代码中有通过 JNI 调用 Native Code 申请的内存没有释放。</p></li></ul><p><strong>4.8.3 策略</strong></p><p>哪种原因造成的堆外内存泄漏？</p>`,223),k={href:"https://docs.oracle.com/javase/8/docs/technotes/guides/troubleshoot/tooldescr007.html",target:"_blank",rel:"noopener noreferrer"},q=e("code",null,"-XX:NativeMemoryTracking=detail",-1),w=e("code",null,"jcmd pid VM.native_memory detail",-1),x=e("code",null,"Unsafe.allocateMemory",-1),T=e("code",null,"DirectByteBuffer",-1),O=a("<p>如果 total 中的 committed 和 top 中的 RES 相差不大，则应为主动申请的堆外内存未释放造成的，如果相差较大，则基本可以确定是 JNI 调用造成的。</p><p><strong>原因一：主动申请未释放</strong></p><p>JVM 使用 <code>-XX:MaxDirectMemorySize=size</code> 参数来控制可申请的堆外内存的最大值。在 Java 8 中，如果未配置该参数，默认和 <code>-Xmx</code> 相等。</p><p>NIO 和 Netty 都会取 <code>-XX:MaxDirectMemorySize</code> 配置的值，来限制申请的堆外内存的大小。NIO 和 Netty 中还有一个计数器字段，用来计算当前已申请的堆外内存大小，NIO 中是 <code>java.nio.Bits#totalCapacity</code>、Netty 中 <code>io.netty.util.internal.PlatformDependent#DIRECT_MEMORY_COUNTER</code>。</p><p>当申请堆外内存时，NIO 和 Netty 会比较计数器字段和最大值的大小，如果计数器的值超过了最大值的限制，会抛出 OOM 的异常。</p><p>NIO 中是：<code>OutOfMemoryError: Direct buffer memory</code>。</p><p>Netty 中是：<code>OutOfDirectMemoryError: failed to allocate capacity byte(s) of direct memory (used: usedMemory , max: DIRECT_MEMORY_LIMIT )</code>。</p><p>我们可以检查代码中是如何使用堆外内存的，NIO 或者是 Netty，通过反射，获取到对应组件中的计数器字段，并在项目中对该字段的数值进行打点，即可准确地监控到这部分堆外内存的使用情况。</p><p>此时，可以通过 Debug 的方式确定使用堆外内存的地方是否正确执行了释放内存的代码。另外，需要检查 JVM 的参数是否有 <code>-XX:+DisableExplicitGC</code> 选项，如果有就去掉，因为该参数会使 System.gc 失效。（场景二：显式 GC 的去与留）</p><p><strong>原因二：通过 JNI 调用的 Native Code 申请的内存未释放</strong></p><p>这种情况排查起来比较困难，我们可以通过 Google perftools + Btrace 等工具，帮助我们分析出问题的代码在哪里。</p>",11),z={href:"http://libtcmalloc.so",target:"_blank",rel:"noopener noreferrer"},I=e("code",null,"Java_java_util_zip_Inflater_init",-1),R=a('<figure><img src="https://upload-images.jianshu.io/upload_images/1179389-11fd0d748962a60e?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>接下来可以使用 Btrace，尝试定位具体的调用栈。Btrace 是 Sun 推出的一款 Java 追踪、监控工具，可以在不停机的情况下对线上的 Java 程序进行监控。如下图所示，通过 Btrace 定位出项目中的 <code>ZipHelper</code> 在频繁调用 <code>GZIPInputStream</code> ，在堆外内存分配对象。</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-78a2708e3652f668?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>最终定位到是，项目中对 <code>GIPInputStream</code> 的使用错误，没有正确的 close()。</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-7aeb1bd968da52f7?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',5),J={href:"http://mp.weixin.qq.com/s?__biz=MjM5NjQ5MTI5OA==&mid=26518700+37&idx=2&sn=847fb15d4413354355c33a46a7bccf55&chksm=bd12a7d88a652ecea5789073973abb9545e76a8972c843968a6efd1fb3a918ef07eed8abb37e&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},F={href:"http://mp.weixin.qq.com/s?__biz=MjM5NjQ5MTI5OA==&mid=2651749037&idx=2&sn=d1d6b0348eea5cd80e2c7a56c8a61fa9&chksm=bd12a3e08a652af684fd8d96e81fc0e0fded69dd847051e6b0f791f3726da0415c9552ee2615&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},N=a(`<p><strong>4.8.4 小结</strong></p><p>首先可以使用 NMT + jcmd 分析泄漏的堆外内存是哪里申请，确定原因后，使用不同的手段，进行原因定位。</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-7bbcc8abc365209c?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>4.9 场景九：JNI 引发的 GC 问题</strong></p><p><strong>4.9.1 现象</strong></p><p>在 GC 日志中，出现 GC Cause 为 GCLocker Initiated GC。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2020-09-23T16:49:09.727+0800: 504426.742: [GC (GCLocker Initiated GC) 504426.742: [ParNew (promotion failed): 209716K-&gt;6042K(1887488K), 0.0843330 secs] 1449487K-&gt;1347626K(3984640K), 0.0848963 secs] [Times: user=0.19 sys=0.00, real=0.09 secs]
2020-09-23T16:49:09.812+0800: 504426.827: [Full GC (GCLocker Initiated GC) 504426.827: [CMS: 1341583K-&gt;419699K(2097152K), 1.8482275 secs] 1347626K-&gt;419699K(3984640K), [Metaspace: 297780K-&gt;297780K(1329152K)], 1.8490564 secs] [Times: user=1.62 sys=0.20, real=1.85 secs]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>4.9.2 原因</strong></p><p>JNI（Java Native Interface）意为 Java 本地调用，它允许 Java 代码和其他语言写的 Native 代码进行交互。</p><p>JNI 如果需要获取 JVM 中的 String 或者数组，有两种方式：</p><ul><li><p>拷贝传递。</p></li><li><p>共享引用（指针），性能更高。</p></li></ul><p>由于 Native 代码直接使用了 JVM 堆区的指针，如果这时发生 GC，就会导致数据错误。因此，在发生此类 JNI 调用时，禁止 GC 的发生，同时阻止其他线程进入 JNI 临界区，直到最后一个线程退出临界区时触发一次 GC。</p><p>GC Locker 实验：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class GCLockerTest {

  static final int ITERS = 100;
  static final int ARR_SIZE =  10000;
  static final int WINDOW = 10000000;

  static native void acquire(int[] arr);
  static native void release(int[] arr);

  static final Object[] window = new Object[WINDOW];

  public static void main(String... args) throws Throwable {
    System.loadLibrary(&quot;GCLockerTest&quot;);
    int[] arr = new int[ARR_SIZE];

    for (int i = 0; i &lt; ITERS; i++) {
      acquire(arr);
      System.out.println(&quot;Acquired&quot;);
      try {
        for (int c = 0; c &lt; WINDOW; c++) {
          window[c] = new Object();
        }
      } catch (Throwable t) {
        // omit
      } finally {
        System.out.println(&quot;Releasing&quot;);
        release(arr);
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#include &lt;jni.h&gt;
#include &quot;GCLockerTest.h&quot;

static jbyte* sink;

JNIEXPORT void JNICALL Java_GCLockerTest_acquire(JNIEnv* env, jclass klass, jintArray arr) {
sink = (*env)-&gt;GetPrimitiveArrayCritical(env, arr, 0);
}

JNIEXPORT void JNICALL Java_GCLockerTest_release(JNIEnv* env, jclass klass, jintArray arr) {
(*env)-&gt;ReleasePrimitiveArrayCritical(env, arr, sink, 0);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行该 JNI 程序，可以看到发生的 GC 都是 GCLocker Initiated GC，并且注意在 “Acquired” 和 “Released” 时不可能发生 GC。</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-be1f08f7671866b1?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>GC Locker 可能导致的不良后果有：</p><ul><li><p>如果此时是 Young 区不够 Allocation Failure 导致的 GC，由于无法进行 Young GC，会将对象直接分配至 Old 区。</p></li><li><p>如果 Old 区也没有空间了，则会等待锁释放，导致线程阻塞。</p></li><li><p>可能触发额外不必要的 Young GC，JDK 有一个 Bug，有一定的几率，本来只该触发一次 GCLocker Initiated GC 的 Young GC，实际发生了一次 Allocation Failure GC 又紧接着一次 GCLocker Initiated GC。是因为 GCLocker Initiated GC 的属性被设为 full，导致两次 GC 不能收敛。</p></li></ul><p><strong>4.9.3 策略</strong></p>`,21),X=e("li",null,[i("添加 "),e("code",null,"-XX+PrintJNIGCStalls"),i(" 参数，可以打印出发生 JNI 调用时的线程，进一步分析，找到引发问题的 JNI 调用。")],-1),P=e("li",null,"JNI 调用需要谨慎，不一定可以提升性能，反而可能造成 GC 问题。",-1),L={href:"https://bugs.openjdk.java.net/browse/JDK-8048556",target:"_blank",rel:"noopener noreferrer"},B=a('<figure><img src="https://upload-images.jianshu.io/upload_images/1179389-dc4a53598d2ffd0a.gif?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>4.9.4 小结</strong></p><p>JNI 产生的 GC 问题较难排查，需要谨慎使用。</p><p><strong>5. 总结</strong></p><p>在这里，我们把整个文章内容总结一下，方便大家整体地理解回顾。</p><p><strong>5.1 处理流程（SOP）</strong></p><p>下图为整体 GC 问题普适的处理流程，重点的地方下面会单独标注，其他的基本都是标准处理流程，此处不再赘述，最后在整个问题都处理完之后有条件的话建议做一下复盘。</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-06b02637605cdf5f?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li><p>**制定标准：**这块内容其实非常重要，但大部分系统都是缺失的，笔者过往面试的同学中只有不到一成的同学能给出自己的系统 GC 标准到底什么样，其他的都是用的统一指标模板，缺少预见性，具体指标制定可以参考 3.1 中的内容，需要结合应用系统的 TP9999 时间和延迟、吞吐量等设定具体的指标，而不是被问题驱动。</p></li><li><p>**保留现场：**目前线上服务基本都是分布式服务，某个节点发生问题后，如果条件允许一定不要直接操作重启、回滚等动作恢复，优先通过摘掉流量的方式来恢复，这样我们可以将堆、栈、GC 日志等关键信息保留下来，不然错过了定位根因的时机，后续解决难度将大大增加。当然除了这些，应用日志、中间件日志、内核日志、各种 Metrics 指标等对问题分析也有很大帮助。</p></li><li><p>**因果分析：**判断 GC 异常与其他系统指标异常的因果关系，可以参考笔者在 3.2 中介绍的时序分析、概率分析、实验分析、反证分析等 4 种因果分析法，避免在排查过程中走入误区。</p></li><li><p>**根因分析：**确实是 GC 的问题后，可以借助上文提到的工具并通过 5 Why 根因分析法以及跟第三节中的九种常见的场景进行逐一匹配，或者直接参考下文的根因鱼骨图，找出问题发生根因，最后再选择优化手段。</p></li></ul><p><strong>5.2 根因鱼骨图</strong></p><p>送上一张问题根因鱼骨图，一般情况下我们在处理一个 GC 问题时，只要能定位到问题的“病灶”，有的放矢，其实就相当于解决了 80%，如果在某些场景下不太好定位，大家可以借助这种根因分析图通过<strong>排除法</strong>去定位。</p><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-7dd5d0e42488ebaa?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>5.3 调优建议</strong></p><ul><li><p>**Trade Off：**与 CAP 注定要缺一角一样，GC 优化要在延迟（Latency）、吞吐量（Throughput）、容量（Capacity）三者之间进行权衡。</p></li><li><p>**最终手段：**GC 发生问题不是一定要对 JVM 的 GC 参数进行调优，大部分情况下是通过 GC 的情况找出一些业务问题，切记上来就对 GC 参数进行调整，当然有明确配置错误的场景除外。</p></li><li><p>**控制变量：**控制变量法是在蒙特卡洛（Monte Carlo）方法中用于减少方差的一种技术方法，我们调优的时候尽量也要使用，每次调优过程尽可能只调整一个变量。</p></li><li><p>**善用搜索：**理论上 99.99% 的 GC 问题基本都被遇到了，我们要学会使用搜索引擎的高级技巧，重点关注 StackOverFlow、Github 上的 Issue、以及各种论坛博客，先看看其他人是怎么解决的，会让解决问题事半功倍。能看到这篇文章，你的搜索能力基本过关了~</p></li><li><p>**调优重点：**总体上来讲，我们开发的过程中遇到的问题类型也基本都符合正态分布，太简单或太复杂的基本遇到的概率很低，笔者这里将中间最重要的三个场景添加了“*”标识，希望阅读完本文之后可以观察下自己负责的系统，是否存在上述问题。</p></li><li><p>**GC 参数：**如果堆、栈确实无法第一时间保留，一定要保留 GC 日志，这样我们最起码可以看到 GC Cause，有一个大概的排查方向。关于 GC 日志相关参数，最基本的 <code>-XX:+HeapDumpOnOutOfMemoryError</code> 等一些参数就不再提了，笔者建议添加以下参数，可以提高我们分析问题的效率。</p></li></ul><figure><img src="https://upload-images.jianshu.io/upload_images/1179389-28d7362e83e88266?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li><p>**其他建议：**上文场景中没有提到，但是对 GC 性能也有提升的一些建议。</p></li><li><p>**主动式 GC：**也有另开生面的做法，通过监控手段监控观测 Old 区的使用情况，即将到达阈值时将应用服务摘掉流量，手动触发一次 Major GC，减少 CMS GC 带来的停顿，但随之系统的健壮性也会减少，如非必要不建议引入。</p></li><li><p><strong>禁用偏向锁：<strong>偏向锁在只有一个线程使用到该锁的时候效率很高，但是在竞争激烈情况会升级成轻量级锁，此时就需要先</strong>消除偏向锁，这个过程是 STW</strong> 的。如果每个同步资源都走这个升级过程，开销会非常大，所以在已知并发激烈的前提下，一般会禁用偏向锁 <code>-XX:-UseBiasedLocking</code> 来提高性能。</p></li><li><p>**虚拟内存：**启动初期有些操作系统（例如 Linux）并没有真正分配物理内存给 JVM ，而是在虚拟内存中分配，使用的时候才会在物理内存中分配内存页，这样也会导致 GC 时间较长。这种情况可以添加 <code>-XX:+AlwaysPreTouch</code> 参数，让 VM 在 commit 内存时跑个循环来强制保证申请的内存真的 commit，避免运行时触发缺页异常。在一些大内存的场景下，有时候能将前几次的 GC 时间降一个数量级，但是添加这个参数后，启动的过程可能会变慢。</p></li></ul><p><strong>6. 写在最后</strong></p><p>最后，再说笔者个人的一些小建议，遇到一些 GC 问题，如果有精力，一定要探本穷源，找出最深层次的原因。另外，在这个信息泛滥的时代，有一些被“奉为圭臬”的经验可能都是错误的，尽量养成看源码的习惯，有一句话说到“源码面前，了无秘密”，也就意味着遇到搞不懂的问题，我们可以从源码中一窥究竟，某些场景下确有奇效。但也不是只靠读源码来学习，如果硬啃源码但不理会其背后可能蕴含的理论基础，那很容易“捡芝麻丢西瓜”，“只见树木，不见森林”，让“了无秘密”变成了一句空话，我们还是要结合一些实际的业务场景去针对性地学习。</p><p><strong>你的时间在哪里，你的成就就会在哪里</strong>。笔者也是在前两年才开始逐步地在 GC 方向上不断深入，查问题、看源码、做总结，每个 Case 形成一个小的闭环，目前初步摸到了 GC 问题处理的一些门道，同时将经验总结应用于生产环境实践，慢慢地形成一个良性循环。</p><p>本篇文章主要是介绍了 CMS GC 的一些常见场景分析，另外一些，如 CodeCache 问题导致 JIT 失效、SafePoint 就绪时间长、Card Table 扫描耗时等问题不太常见就没有花太多篇幅去讲解。Java GC 是在“分代”的思想下内卷了很多年才突破到了“分区”，目前在美团也已经开始使用 G1 来替换使用了多年的 CMS，虽然在小的堆方面 G1 还略逊色于 CMS，但这是一个趋势，短时间无法升级到 ZGC，所以未来遇到的 G1 的问题可能会逐渐增多。目前已经收集到 Remember Set 粗化、Humongous 分配、Ergonomics 异常、Mixed GC 中 Evacuation Failure 等问题，除此之外也会给出 CMS 升级到 G1 的一些建议，接下来笔者将继续完成这部分文章整理，敬请期待。</p><p>“防火”永远要胜于“救火”，<strong>不放过任何一个异常的小指标</strong>（一般来说，任何<strong>不平滑的曲线</strong>都是值得怀疑的） ，就有可能避免一次故障的发生。作为 Java 程序员基本都会遇到一些 GC 的问题，独立解决 GC 问题是我们必须迈过的一道坎。开篇中也提到过 GC 作为经典的技术，非常值得我们学习，一些 GC 的学习材料，如《The Garbage Collection Handbook》、《深入理解Java虚拟机》等也是常读常新，赶紧动起来，苦练 GC 基本功吧。</p><p>最后的最后，再多啰嗦一句，目前所有 GC 调优相关的文章，第一句讲的就是“不要过早优化”，使得很多同学对 GC 优化望而却步。在这里笔者提出不一样的观点，熵增定律（在一个孤立系统里，如果没有外力做功，其总混乱度（即熵）会不断增大）在计算机系统同样适用，<strong>如果不主动做功使熵减，系统终究会脱离你的掌控</strong>，在我们对业务系统和 GC 原理掌握得足够深的时候，可以放心大胆地做优化，因为我们基本可以预测到每一个操作的结果，放手一搏吧，少年！</p>',22),V={href:"https://mp.weixin.qq.com/s/RFwXYdzeRkTG5uaebVoLQw",target:"_blank",rel:"noopener noreferrer"},A=e("hr",null,null,-1),E={href:"https://github.com/itwanger/toBeBetterJavaer",target:"_blank",rel:"noopener noreferrer"},j={href:"https://javabetter.cn/overview/",target:"_blank",rel:"noopener noreferrer"},D=e("p",null,[i("微信搜 "),e("strong",null,"沉默王二"),i(" 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 "),e("strong",null,"222"),i(" 即可免费领取。")],-1),H=e("figure",null,[e("img",{src:"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png",alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1);function W(K,Y){const n=r("ExternalLinkIcon");return t(),d("div",null,[o,e("ul",null,[u,e("li",null,[e("p",null,[i("**Card Table：**中文翻译为卡表，主要是用来标记卡页的状态，每个卡表项对应一个卡页。当卡页中一个对象引用有写操作时，写屏障将会标记对象所在的卡表状态改为 dirty，卡表的本质是用来解决跨代引用的问题。具体怎么解决的可以参考 StackOverflow 上的这个问题 "),e("a",v,[i("how-actually-card-table-and-writer-barrier-works"),s(n)]),i("，或者研读一下 cardTableRS.app 中的源码。")])])]),m,e("p",null,[i("目前在 Hotspot VM 中主要有分代收集和分区收集两大类，具体可以看下面的这个图，不过未来会逐渐向分区收集发展。在美团内部，有部分业务尝试用了 ZGC（感兴趣的同学可以学习下这篇文章《"),e("a",p,[i("新一代垃圾回收器ZGC的探索与实践"),s(n)]),i("》），其余基本都停留在 CMS 和 G1 上。另外在 JDK11 后提供了一个不执行任何垃圾回收动作的回收器 Epsilon（A No-Op Garbage Collector）用作性能分析。另外一个就是 Azul 的 Zing JVM，其 C4（Concurrent Continuously Compacting Collector）收集器也在业内有一定的影响力。")]),g,b,_,e("ul",null,[C,e("li",null,[e("p",null,[i("**CMS：**以获取最短回收停顿时间为目标，采用“标记-清除”算法，分 4 大步进行垃圾收集，其中初始标记和重新标记会 STW ，多数应用于互联网站或者 B/S 系统的服务器端上，JDK9 被标记弃用，JDK14 被删除，详情可见 "),e("a",f,[i("JEP 363"),s(n)]),i("。")])])]),h,e("p",null,[i("命令行推荐 arthas ，可视化界面推荐 JProfiler，此外还有一些在线的平台 "),e("a",M,[i("gceasy"),s(n)]),i("、"),e("a",G,[i("heaphero"),s(n)]),i("、"),e("a",S,[i("fastthread"),s(n)]),i(" ，美团内部的 Scalpel（一款自研的 JVM 问题诊断工具，暂时未开源）也比较好用。")]),y,e("p",null,[i("首先，我们需要确定是哪种原因导致的堆外内存泄漏。这里可以使用 NMT（"),e("a",k,[i("NativeMemoryTracking"),s(n)]),i("） 进行分析。在项目中添加 "),q,i(" JVM参数后重启项目（需要注意的是，打开 NMT 会带来 5%~10% 的性能损耗）。使用命令 "),w,i(" 查看内存分布。重点观察 total 中的 committed，因为 jcmd 命令显示的内存包含堆内内存、Code 区域、通过 "),x,i(" 和 "),T,i(" 申请的内存，但是不包含其他 Native Code（C 代码）申请的堆外内存。")]),O,e("p",null,[i("gperftools 是 Google 开发的一款非常实用的工具集，它的原理是在 Java 应用程序运行时，当调用 malloc 时换用它的 "),e("a",z,[i("libtcmalloc.so"),s(n)]),i("，这样就能对内存分配情况做一些统计。我们使用 gperftools 来追踪分配内存的命令。如下图所示，通过 gperftools 发现 "),I,i(" 比较可疑。")]),R,e("p",null,[i("除了项目本身的原因，还可能有外部依赖导致的泄漏，如 Netty 和 Spring Boot，详细情况可以学习下这两篇文章：《"),e("a",J,[i("疑案追踪：Spring Boot内存泄露排查记"),s(n)]),i("》、《"),e("a",F,[i("Netty堆外内存泄露排查盛宴"),s(n)]),i("》。")]),N,e("ul",null,[X,P,e("li",null,[i("升级 JDK 版本到 14，避免 "),e("a",L,[i("JDK-8048556"),s(n)]),i(" 导致的重复 GC。")])]),B,e("p",null,[i("原文链接："),e("a",V,[i("https://mp.weixin.qq.com/s/RFwXYdzeRkTG5uaebVoLQw"),s(n)])]),A,e("p",null,[i("GitHub 上标星 10000+ 的开源知识库《"),e("a",E,[i("二哥的 Java 进阶之路"),s(n)]),i("》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳："),e("a",j,[i("太赞了，GitHub 上标星 10000+ 的 Java 教程"),s(n)])]),D,H])}const Q=l(c,[["render",W],["__file","meituan-9-gc.html.vue"]]);export{Q as default};
