---
title: 谈谈我工作中的23个设计模式-阿里云开发者社区
shortTitle: 谈谈我工作中的23个设计模式-阿里云开发者社区
description: 从基础的角度看，设计模式是研究类本身或者类与类之间的协作模式，是进行抽象归纳的一个很好的速成思路。后面阅读设计模式后，为了加深理解，对相关图片进行了描绘和微调。从技术的角度已经有很多好的总结，本文会换一种角度思考，既然设计模式研究的是类与类的关系，我们作为工作的个体，一些工作中的策略是不是也可以进行类比，可以更好地去思考这些模式？答案是肯定的。
tag:
  - 优质文章
category:
  - 阿里云
head:
  - - meta
    - name: keywords
      content: 设计模式,缓存,算法,安全,项目管理,开发者
---

从基础的角度看，设计模式是研究类本身或者类与类之间的协作模式，是进行抽象归纳的一个很好的速成思路。为了加深理解，我对相关图片进行了描绘和微调。

从技术的角度已经有很多好的总结，本文会换一种角度思考，既然设计模式研究的是类与类的关系，我们作为工作的个体，一些工作中的策略是不是也可以进行类比，可以更好地去思考这些模式？答案是肯定的。

## 创建型模式 5

### 抽象工厂（Abstract Factory）：多套方案

抽象工厂模式是对创建不同的产品类型的抽象。对应到工作中，我们的确应该具备提供多套方案的能力，这也是我们常说的，要提供选择题。当你有这样的前瞻意识，一般也会被打上思考较多的标签，但是内在来说，的确想问题更加全面了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-bf249c34-87d5-4b0e-90af-f81ce0babfd5.png)

### 生成器（Builder）：善于分解

生成器模式是对一个个体的创建过程进行细分，拆解为不同的创建部分。这个对应到工作中，作为一些项目管理人员或者团队管理者，需要将一个大泥球一样的事务，合理分解，让大家各司其职，充分发挥才能。同样，我们对日常的工作内容，也可以按照结构去进行划分，从而更有条理。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-f4dbb192-5e06-469d-afcf-adf03019a854.png)

### 工厂方法（Factory Method）：抽象思考

工厂方法模式是说将提供某一产品的过程进行抽象，通过接口的模式去规范出来。类似的，我们很多做事的过程，都是面向过程，没有抽象提炼一下。如果经过进一步思考，那么可以往上再提炼一个层次，发现事物的本质：到底在做什么，我们的职责是什么，提供什么样的价值。想的更清楚，做的也会更加准确。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-036fc7a8-2596-4a58-95e3-10094f805e98.png)

### 原型（Prototype）：传承知识

原型模式是说，利用拷贝对象的方法，减少一些复杂的创建过程。这里我们能够学到的是，需要做好日常的积累，很多方案不是每次来都重写，是可以在原来的方案上进行拷贝复用的。这个clone的过程，往往也是知识传承的过程。如果有比较好的传承机制，那么会大大提升服务效率。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-f042b019-9524-4526-b170-b6e5372a67d9.png)

### 单件（Singleton）：专注

单件模式是说在多线程的情况下，要保证对象只创建一遍，作为独一无二的资源。这个我觉得，应该去review一下我们的工作模式，虽然我们常常要并发很多事情，但是如果处处被打断，每件事都想干好，那么可能每件事都干不好。我们要确保在某个时间段竭力地做好一件事。事件是一件件有效解决的，不是一起慢慢解决的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-8a9e42df-bd42-4b71-818f-d777137176cd.png)

## 结构型模式 7

### 适配器（Adapter）：适应能力

适配器是为了结合原来的能力，适配新的接口服务，比如适配不同的协议入口。工作的时候，其实需要适应不同的人和事，有不同的工作方法方式，但是我们的核心能力是一样的，都是解决对应的问题域。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-9289d5b2-adca-4652-bffa-7f4945f1dc2d.png)

### 桥接（Bridge）：合理关系

桥接模式是将原来相互依赖的部分，通过上层接口再往抽象层提一下，减少类之间的直接合作，形成间接关系。这个到对应到工作中来说，有一种场景是，常常开发对开发去case by case解决问题。 如果往产品逻辑层走一下，开发对产品，产品层面可能有更好的抽象。当然为了更好的服务体验，这样的解耦是不多见的，但是这样的思考我们可能要get一下。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-fde80a2c-0dd2-4164-8526-e4eeb672d30f.png)

### 组合（Composite）：递归思考

组合模式通过继承和孩子节点，可以递归地去描述一个对象层次。这个对我们工作来说，要加深思考的层次，可以某个点拆开去再去思考，同时如果能够在递归分解过程中抽象一些共性的点，就能找到一些规律。比如我们的需求分解，每个需求可以分解为子需求，子需求再往下看又可以递归分解。分解完之后，每个部分有这部分的owner去驱动他的下游，形成一个层次结构。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-c4f9c102-23d1-4b5d-acc3-390bd696f937.png)

### 装饰（Decorator）：增量价值

装饰模式是将原来的能力进行包装，并提供新的行为。其实每次功能迭代，我们大多是在原来的基础上添加新的功能。我们要定义好新的能力，首要前提是继承、理解好原来的逻辑。这里还想提的是，很多时候，我们只看到了我们复用了庞大的基础能力，但是也要看到我们在项目中增量的贡献，这是我们的闪光点。不要把“拧螺丝”真的看成了拧螺丝。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-7ce9d508-57d2-4199-9b5b-fb98c28f550b.png)

### 外观（Facade）：深入浅出

外观模式是说我们不需要理解复杂的系统，而是通过一个外观去操作。这里我们的工作思路是，我们不用展示复杂的细节，我们要提供一些高层的理解，汇报如此，系统的包装也是如此。就比如，服务功能孤立来看，可能很多、很杂，但如果有一个统一的站点去引导包装，那么感觉会好很多，也会看上去有点收口和聚焦的感觉。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-557700ef-dfbe-4d4e-9d87-c59ee8f36831.png)

### 享元（Flyweight）：善于链接

享元模式是说，当我们已经存在一些内容的时候，可以通过缓存复用，而不是重新创建，减少开销。我们在工作中也要做好积累，但是更要做好缓存的key，通过怎么样的手段去链接到我们的工作中，是需要我们做好类目管理和持续积累的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-5e432207-a03a-432e-acec-c16af09e9031.png)

### 代理（Proxy）：理解保护

代理是为了包装一个类，对相关操作进行二次转发或者进行一些管控。工作中来说，有些工作模式下，有时候我们可能会抱怨管理者代理了我们的决策等操作，但是换个角度想，他们保护了你不用直接被暴露在业务方侧，能够按照预期内的节奏提供服务，不会被主动设置一些预期外操作或私活。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-c0ff38f6-04e8-48e7-ac45-1496e3bb5b56.png)

## 行为型模式 11

### 责任链（Chain of Responsibility）：能力与责任

责任链是说将请求让队列内的处理器一个个执行，直到找到可以执行的。这里对我们工作的启示是，我们常常抱怨我们得到的机会少，不能成为队列内优先可以处理的处理器，总是处理人家不想做的。但是换个角度看，首先责任链里面的处理器应该是正交的，大家应该各司其职。退一步来说，如果真的有重叠，那么你应该努力提升自己，成为能力强的，从而提高队列内的优先级。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-6616b2ed-d97a-484b-8075-0f014db58dee.png)

### 命令（Command）：加强合作

命令模型是说将请求包装为命令，这样在执行的时候可以与具体的执行逻辑解耦。工作中来说，我们有时候不应该太关心一个事情是怎么完成的，当交给别人完成时，信任他们即可，就是从解决问题的角度来看，不用事事亲为，事事较真。但是这并不妨碍我们主动养成全局视角，了解每个细节。合作才能影响更多的事情。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-f64e816c-3b10-4640-aa6e-d92ee4fb8086.png)

### 解释器（Interpreter）：加强理解

解释器模式是说针对一套上下文，形成一套语言，可以通过解释表达式含义的方式完成对应的任务。这里来说，我们可以形成某个团体的领域语言，内部交流通过相关领域语言交流，可以增加交流效率。此外，其实不同层次都有不同层次的专业术语，有时候一个术语的解释是一个方面的顿悟，还是要多了解工作内容本身。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-dee401b3-9e45-41b2-828b-fd1bb241fea3.png)

### 迭代器（Iterator）：横向职责

迭代器模式是将集合的访问功能独立出来，通过迭代的模式去访问。这种独立职责的操作，工作中我们常常会看到，我们会将需求管理，缺陷管理，资金安全的一些事情独立出来看。一个方面是这些功能块从主体来说是比较内聚的，另一个来方面说，对工作职责的细分，可以让大家把自己的事情干好，发挥团队作战的效能：开发把开发干好，测试把测试干好，资损防护同学把资损防护干好，整体也就做好了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-b9d13650-97bd-4b93-9b7a-8dc1d0943f53.png)

### 中介者（Mediator）：协调能力

中介模式是说：当多个类之间要协调的时候，往往引入中介者进行协调，减少大家的知识成本。这个我们常常需要一些PM、PMO这样的角色去管理项目，系统中也需要一些协调层去协调各个域。因此我们也注重培养协调事务、具备全局观的能力。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-59d28e20-801a-4237-92a6-50c1e5ab2a7b.png)

### 备忘录（Memento）：小步快跑

备忘录模式是对操作的一些记录，已被可以恢复到之前的版本。在日常工作中，我们常常需要及时备份、及时保存、及时提交等操作，这样在程序崩溃的时候可以快速恢复到之前版本。但从抽象来说，一些比较长时费力的事情，我们应该分解来做，及时锁住部分收益。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-266e0988-40b4-41f0-9367-ed32f3d91e28.png)

### 观察者（Observer）：主观能动性

观察者模式是说我们通过注册、回掉这样的协作设计，完成变化通知的协作机制。这个工作中来说，换个角度思考，我们可以将一些被动的工作，变成主动的思考。比如：我需要干某部分工作，从工作的角度来说，不得不做，从主动的角度来说，就是需要培养某块的能力。如果对工作内容不太满意，也可以沟通协调，而不是事后爆发，凡是都是可以主观驱动的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-b522ca53-bf97-4714-a8f5-a7a4b16e53df.png)

### 状态（State）：管理自己

状态模式是说在不同的状态下，有不同的处理行为。对工作中来说，我们可能有状态好的时候，有状态不好的时候，主观的处理的手段是调整状态。但是如果调整不过来，我们应该进行不同的操作。比如，脑子好的时候，想一些复杂问题；脑子嗡嗡的时候，做一些简单整理。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-684c897d-d7e4-4fb1-973c-520f561730ee.png)

### 策略（Strategy）：理解决策

策略模式是说完成一个事情有不同的算法，可以进行相关切换。我们在工作中，常常会提供不同的方案，不同的方案有不同的成本和收益，但是这些方案的选择时候，往往不是我们能决定的，而是客户client主动判断的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-9a83c621-23fa-40b5-bca2-90e9b3ff1216.png)

### 模板（Template）：标准化能力

模版模式是说对一个执行过程进行抽象分解，通过骨架和扩展方法完成一个标准的主体逻辑和扩展。我们很多时候，做xxx平台也都是这样的：对过程进行标准化，对变化进行定义，形成一个平台逻辑和业务扩展，完成一个产品模版。只是说这个模版是站点，还是扩展点，还是其他的展示形式。这样标准化的能力也是需要长期训练的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-3f9c89bf-55b8-4a0f-bf69-069e7b838f4c.png)

### 访问者（Visitor）：学会放手

访问者模式是说把对元素的访问操作交给访问者来操作，因为对访问者来说常常有不同的访问行为。在工作中，往往我们只能陈述事实，这个内容消化后，每个人都有自己的理解。代码协作也是一样，比如：页面到底长什么样，其实还是要交还给业务本身，我们应该专注于提供基础的能力。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/aliyun-tantwgzzdgsjmsalykfzsq-1a90ffef-ea90-4cec-8c6b-091deee3d1f6.png)

## 总结

作为开发者，我们对于如何写出优雅的代码，表示疑惑。因为常常背后是复杂的问题域，优雅的设计往往产生于局部，很难整体都很优雅。

作为工作者，我们对于如何做出好的表现，表示疑惑。因为背后常常是综合素质与机遇的结合，好的结果往往产生于一个阶段，长期需要较快且持续的成长。

但是，如果我们有一些指导性的原则，往往我们能够明白事务的折中点，做出更加合理的设计，以及更加关键的贡献。



>参考链接：[https://developer.aliyun.com/article/1080105](https://developer.aliyun.com/article/1080105)
