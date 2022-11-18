import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as t,a as e,d as i,b as s,e as d,r}from"./app.99eb8281.js";const u={},c=d(`<p>当你加入一家电商公司的话，很有可能会被问到“红包雨🧧如何设计和实现”这个问题，今天就来和球友们聊一聊。</p><p>所谓的红包雨，就是指在某次活动中，红包会以<strong>雨滴</strong>的形式落下，用户点击屏幕上落下的红包，若抢到红包，红包会以现金的形式进入用户账户。</p><p>红包雨是一个典型的高并发场景，短时间内有海量请求访问服务端，为了让系统运行顺畅，抢红包一般会采用基于 <strong>Redis + Lua 脚本</strong>的设计方案。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-shizlllldsjtzhbygndsjysx-c1fd7dd9-3974-41e8-a22c-4a4d25f80e73.jpg" alt="" loading="lazy"></p><h2 id="_1-整体流程" tabindex="-1"><a class="header-anchor" href="#_1-整体流程" aria-hidden="true">#</a> 1 整体流程</h2><p>我们来分析下抢红包的整体流程 ：</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-shizlllldsjtzhbygndsjysx-47986b38-a727-4894-935c-3675811c5069.jpg" alt="" loading="lazy"></p><ol><li>运营系统配置红包雨活动总金额以及红包个数，提前计算出各个红包的金额并存储到 Redis 中；</li><li>抢红包雨界面，用户点击屏幕上落下的红包，发起抢红包请求；</li><li>TCP 网关接收抢红包请求后，调用抢红包的 dubbo 服务，抢红包服务本质上就是执行 Lua 脚本，将结果通过 TCP 网关返回给前端；</li><li>用户若抢到红包，异步任务会从 Redis 中 获取抢得的红包信息，调用余额系统，将金额返回到用户账户。</li></ol><h2 id="_2-红包-redis-设计" tabindex="-1"><a class="header-anchor" href="#_2-红包-redis-设计" aria-hidden="true">#</a> 2 红包 Redis 设计</h2><p>抢红包有如下规则：</p><ul><li>同一活动，用户只能抢红包一次 ；</li><li>红包数量有限，一个红包只能被一个用户抢到。</li></ul><p>如下图，我们设计三种数据类型：</p><ol><li>运营预分配红包列表 ;</li></ol><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-shizlllldsjtzhbygndsjysx-24dd06eb-b6ba-4123-a4da-d546a4415528.jpg" alt="" loading="lazy"></p><p>队列元素 json 数据格式 ：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    //红包编号
    redPacketId : &#39;365628617880842241&#39; 
    //红包金额
    amount : &#39;12.21&#39;          
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>用户红包领取记录列表；</li></ol><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-shizlllldsjtzhbygndsjysx-ef69cad5-d918-40f8-a098-1f1155e1b50e.jpg" alt="" loading="lazy"></p><p>队列元素 json 数据格式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    //红包编号
    redPacketId : &#39;365628617880842241&#39;
    //红包金额
    amount : &#39;12.21&#39;,
    //用户编号
    userId : &#39;265628617882842248&#39;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>用户红包防重 Hash 表；</li></ol><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-shizlllldsjtzhbygndsjysx-6a4f1635-fab2-4c7e-b50c-bd0802389c28.jpg" alt="" loading="lazy"></p><p>抢红包 Redis 操作流程 ：</p><ol><li>通过 hexist 命令判断红包领取记录防重 Hash 表中用户是否领取过红包 ，若用户未领取过红包，流程继续；</li><li>从运营预分配红包列表 rpop 出一条红包数据 ；</li><li>操作红包领取记录防重 Hash 表 ，调用 HSET 命令存储用户领取记录；</li><li>将红包领取信息 lpush 进入用户红包领取记录列表。</li></ol><p>抢红包的过程 ，需要重点关注如下几点 :</p><ul><li>执行多个命令，是否可以保证原子性 , 若一个命令执行失败，是否可以回滚；</li><li>在执行过程中，高并发场景下，是否可以保持隔离性；</li><li>后面的步骤依赖前面步骤的结果。</li></ul><p>Redis 支持两种模式 :  <strong>事务模式</strong> 和 <strong>Lua 脚本</strong>，接下来，我们一一展开。</p><h2 id="_3-事务原理" tabindex="-1"><a class="header-anchor" href="#_3-事务原理" aria-hidden="true">#</a> 3 事务原理</h2><p>Redis 的事务包含如下命令：</p><table><thead><tr><th>序号</th><th>命令及描述</th></tr></thead><tbody><tr><td>1</td><td>MULTI 标记一个事务块的开始。</td></tr><tr><td>2</td><td>EXEC 执行所有事务块内的命令。</td></tr><tr><td>3</td><td>DISCARD 取消事务，放弃执行事务块内的所有命令。</td></tr><tr><td>4</td><td>WATCH key [key ...] 监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断。</td></tr><tr><td>5</td><td>UNWATCH 取消 WATCH 命令对所有 key 的监视。</td></tr></tbody></table><p>事务包含三个阶段：</p><ol><li>事务开启，使用 MULTI , 该命令标志着执行该命令的客户端从非事务状态切换至事务状态 ；</li><li>命令入队，MULTI 开启事务之后，客户端的命令并不会被立即执行，而是放入一个事务队列 ；</li><li>执行事务或者丢弃。如果收到 EXEC 的命令，事务队列里的命令将会被执行 ，如果是 DISCARD 则事务被丢弃。</li></ol><p>下面展示一个事务的例子。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis&gt; MULTI 
OK
redis&gt; SET msg &quot;hello world&quot;
QUEUED
redis&gt; GET msg
QUEUED
redis&gt; EXEC
1) OK
1) hello world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里有一个疑问？在开启事务的时候，Redis key 可以被修改吗？</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-shizlllldsjtzhbygndsjysx-a3fb6aeb-fa05-4731-b10c-16ef6d04eefc.jpg" alt="" loading="lazy"></p><p><strong>在事务执行 EXEC 命令之前 ，Redis key 依然可以被修改</strong>。</p><p>在事务开启之前，我们可以 watch 命令监听 Redis key 。在事务执行之前，我们修改 key 值 ，事务执行失败，返回 <strong>nil</strong> 。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-shizlllldsjtzhbygndsjysx-7fe9ee84-32da-4b83-8692-21515ed8feed.jpg" alt="" loading="lazy"></p><p>通过上面的例子，watch 命令可以<strong>实现类似乐观锁的效果</strong> 。</p><h2 id="_4-事务的acid" tabindex="-1"><a class="header-anchor" href="#_4-事务的acid" aria-hidden="true">#</a> 4 事务的ACID</h2><h3 id="_4-1-原子性" tabindex="-1"><a class="header-anchor" href="#_4-1-原子性" aria-hidden="true">#</a> 4.1 原子性</h3><p>原子性是指：一个事务中的所有操作，或者全部完成，或者全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚到事务开始前的状态，就像这个事务从来没有执行过一样。</p><p>第一个例子：</p><p>在执行 EXEC 命令前，客户端发送的操作命令错误，比如：语法错误或者使用了不存在的命令。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis&gt; MULTI
OK
redis&gt; SET msg &quot;other msg&quot;
QUEUED
redis&gt; wrongcommand  ### 故意写错误的命令
(error) ERR unknown command &#39;wrongcommand&#39; 
redis&gt; EXEC
(error) EXECABORT Transaction discarded because of previous errors.
redis&gt; GET msg
&quot;hello world&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们使用了不存在的命令，导致入队失败，整个事务都将无法执行 。</p><p>第二个例子：</p><p>事务操作入队时，命令和操作的数据类型不匹配 ，入队列正常，但执行 EXEC 命令异常 。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis&gt; MULTI  
OK
redis&gt; SET msg &quot;other msg&quot;
QUEUED
redis&gt; SET mystring &quot;I am a string&quot;
QUEUED
redis&gt; HMSET mystring name  &quot;test&quot;
QUEUED
redis&gt; SET msg &quot;after&quot;
QUEUED
redis&gt; EXEC
1) OK
2) OK
3) (error) WRONGTYPE Operation against a key holding the wrong kind of value
4) OK
redis&gt; GET msg
&quot;after&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子里，Redis 在执行 EXEC 命令时，如果出现了错误，Redis 不会终止其它命令的执行，事务也不会因为某个命令执行失败而回滚 。</p><p>综上，我对 Redis 事务原子性的理解如下：</p><ol><li>命令入队时报错， 会放弃事务执行，保证原子性；</li><li>命令入队时正常，执行 EXEC 命令后报错，不保证原子性；</li></ol><p>也就是：<strong>Redis 事务在特定条件下，才具备一定的原子性</strong> 。</p><h3 id="_4-2-隔离性" tabindex="-1"><a class="header-anchor" href="#_4-2-隔离性" aria-hidden="true">#</a> 4.2 隔离性</h3><p>数据库的隔离性是指：数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。</p><p>事务隔离分为不同级别 ，分别是：</p><ul><li>未提交读（read uncommitted）</li><li>提交读（read committed）</li><li>可重复读（repeatable read）</li><li>串行化（serializable）</li></ul><p>首先，需要明确一点：Redis 并没有事务隔离级别的概念。这里我们讨论 Redis 的隔离性是指：<strong>并发场景下，事务之间是否可以做到互不干扰</strong>。</p><p>我们可以将事务执行可以分为 <strong>EXEC 命令执行前</strong>和 <strong>EXEC 命令执行后</strong>两个阶段，分开讨论。</p><ol><li>EXEC 命令执行前</li></ol><p>在事务原理这一小节，我们发现在事务执行之前 ，Redis key 依然可以被修改。此时，可以使用 <strong>WATCH 机制</strong>来实现乐观锁的效果。</p><ol start="2"><li>EXEC 命令执行后</li></ol><p>因为 Redis 是单线程执行操作命令， EXEC 命令执行后，Redis 会保证命令队列中的所有命令执行完 。 这样就可以保证事务的隔离性。</p><h3 id="_4-3-持久性" tabindex="-1"><a class="header-anchor" href="#_4-3-持久性" aria-hidden="true">#</a> 4.3 持久性</h3><p>数据库的持久性是指 ：事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失。</p><p>Redis 的数据是否持久化取决于 Redis 的持久化配置模式 。</p><ol><li>没有配置 RDB 或者 AOF ，事务的持久性无法保证；</li><li>使用了 RDB模式，在一个事务执行后，下一次的 RDB 快照还未执行前，如果发生了实例宕机，事务的持久性同样无法保证；</li><li>使用了 AOF 模式；AOF 模式的三种配置选项 no 、everysec 都会存在数据丢失的情况 。always 可以保证事务的持久性，但因为性能太差，在生产环境一般不推荐使用。</li></ol><p>综上，<strong>redis 事务的持久性是无法保证的</strong> 。</p><h3 id="_4-4-一致性" tabindex="-1"><a class="header-anchor" href="#_4-4-一致性" aria-hidden="true">#</a> 4.4 一致性</h3><p>一致性的概念一直很让人困惑，在我搜寻的资料里，有两类不同的定义。</p><ol><li>维基百科</li></ol><p>我们先看下维基百科上一致性的定义：</p><blockquote><p>Consistency ensures that a transaction can only bring the database from one valid state to another, maintaining database invariants: any data written to the database must be valid according to all defined rules, including constraints, cascades, triggers, and any combination thereof. This prevents database corruption by an illegal transaction, but does not guarantee that a transaction is correct. Referential integrity guarantees the primary key – foreign key relationship.</p></blockquote><p>在这段文字里，一致性的核心是“<strong>约束</strong>”，“<strong>any data written to the database must be valid according to all defined rules</strong> ”。</p><p>如何理解约束？这里引用知乎问题 <strong>如何理解数据库的内部一致性和外部一致性</strong>，蚂蚁金服 OceanBase 研发专家韩富晟回答的一段话：</p><blockquote><p>“约束”由数据库的使用者告诉数据库，使用者要求数据一定符合这样或者那样的约束。当数据发生修改时，数据库会检查数据是否还符合约束条件，如果约束条件不再被满足，那么修改操作不会发生。</p><p>关系数据库最常见的两类约束是“唯一性约束”和“完整性约束”，表格中定义的主键和唯一键都保证了指定的数据项绝不会出现重复，表格之间定义的参照完整性也保证了同一个属性在不同表格中的一致性。</p><p>“ Consistency in ACID ”是如此的好用，以至于已经融化在大部分使用者的血液里了，使用者会在表格设计的时候自觉的加上需要的约束条件，数据库也会严格的执行这个约束条件。</p></blockquote><p>所以<strong>事务的一致性和预先定义的约束有关，保证了约束即保证了一致性</strong>。</p><p>我们细细品一品这句话： <strong>This prevents database corruption by an illegal transaction, but does not guarantee that a transaction is correct</strong>。</p><p>写到这里可能大家还是有点模糊，我们举经典<strong>转账</strong>的案例。</p><p>我们开启一个事务，张三和李四账号上的初始余额都是1000元，并且余额字段没有任何约束。张三给李四转账1200元。张三的余额更新为 -200 ， 李四的余额更新为2200。</p><p>从应用层面来看，这个事务明显不合法，因为现实场景中，用户余额不可能小于 0 ， 但是它完全遵循数据库的约束，所以从数据库层面来看，这个事务依然保证了一致性。</p><p>Redis 的事务一致性是指：Redis 事务在执行过程中符合数据库的约束，没有包含非法或者无效的错误数据。</p><p>我们分三种异常场景分别讨论：</p><ol><li>执行 EXEC 命令前，客户端发送的操作命令错误，事务终止，数据保持一致性；</li><li>执行 EXEC 命令后，命令和操作的数据类型不匹配，错误的命令会报错，但事务不会因为错误的命令而终止，而是会继续执行。正确的命令正常执行，错误的命令报错，从这个角度来看，数据也可以保持一致性；</li><li>执行事务的过程中，Redis 服务宕机。这里需要考虑服务配置的持久化模式。</li></ol><ul><li>无持久化的内存模式：服务重启之后，数据库没有保持数据，因此数据都是保持一致性的；</li><li>RDB / AOF 模式： 服务重启后，Redis 通过 RDB / AOF 文件恢复数据，数据库会还原到一致的状态。</li></ul><p>综上所述，<strong>在一致性的核心是约束的语意下，Redis 的事务可以保证一致性</strong>。</p><ol start="2"><li>《设计数据密集型应用》</li></ol><p>这本书是分布式系统入门的神书。在事务这一章节有一段关于 ACID 的解释：</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-shizlllldsjtzhbygndsjysx-bb5347ab-4fc2-4b10-bf75-f19e39dd0345.jpg" alt="" loading="lazy"></p><blockquote><p>Atomicity, isolation, and durability are properties of the database,whereas consistency (in the ACID sense) is a property of the application. The application may rely on the database’s atomicity and isolation properties in order to achieve consistency, but it’s not up to the database alone. Thus, the letter C doesn’t really belong in ACID.</p></blockquote><p>原子性，隔离性和持久性是数据库的属性，而一致性（在 ACID 意义上）是应用程序的属性。应用可能依赖数据库的原子性和隔离属性来实现一致性，但这并不仅取决于数据库。因此，字母 C 不属于 ACID 。</p><p>很多时候，我们一直在纠结的一致性，其实就是指<strong>符合现实世界的一致性</strong>，现实世界的一致性才是事务追求的最终目标。</p><p>为了实现现实世界的一致性，需要满足如下几点：</p><ol><li>保证原子性，持久性和隔离性，如果这些特征都无法保证，那么事务的一致性也无法保证；</li><li>数据库本身的约束，比如字符串长度不能超过列的限制或者唯一性约束；</li><li>业务层面同样需要进行保障 。</li></ol><h3 id="_4-5-总结" tabindex="-1"><a class="header-anchor" href="#_4-5-总结" aria-hidden="true">#</a> 4.5 总结</h3><p>我们通常称 Redis 为内存数据库 , 不同于传统的关系数据库，为了提供了更高的性能，更快的写入速度，在设计和实现层面做了一些平衡，并不能完全支持事务的 ACID。</p><p>Redis 的事务具备如下特点：</p><ul><li>保证隔离性；</li><li>无法保证持久性；</li><li>具备了一定的原子性，但不支持回滚；</li><li>一致性的概念有分歧，假设在一致性的核心是约束的语意下，Redis 的事务可以保证一致性。</li></ul><p>另外，在抢红包的场景下， 因为每个步骤需要依赖上一个步骤返回的结果，需要通过 watch 来实现乐观锁 ，从工程角度来看， Redis 事务并不适合该业务场景。</p><h2 id="_5-lua-脚本" tabindex="-1"><a class="header-anchor" href="#_5-lua-脚本" aria-hidden="true">#</a> 5 Lua 脚本</h2><h3 id="_5-1-简介" tabindex="-1"><a class="header-anchor" href="#_5-1-简介" aria-hidden="true">#</a> 5.1 简介</h3><p>“ Lua ” 在葡萄牙语中是“月亮”的意思，1993年由巴西的 Pontifical Catholic University 开发。</p><p>该语言的设计目的是为了嵌入应用程序中，从而为应用程序提供灵活的扩展和定制功能。</p><p>Lua 脚本可以很容易的被 C/C ++ 代码调用，也可以反过来调用 C/C++ 的函数，这使得 Lua 在应用程序中可以被广泛应用。不仅仅作为扩展脚本，也可以作为普通的配置文件，代替 XML, Ini 等文件格式，并且更容易理解和维护。</p><p>Lua 由标准 C 编写而成，代码简洁优美，几乎在所有操作系统和平台上都可以编译，运行。</p><p>一个完整的 Lua 解释器不过 200 k，在目前所有脚本引擎中，Lua 的速度是最快的。这一切都决定了 Lua 是作为嵌入式脚本的最佳选择。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-shizlllldsjtzhbygndsjysx-b152e7cd-3d20-4c79-849e-d4ffab2bcbbc.jpg" alt="" loading="lazy"></p><p>Lua 脚本在游戏领域大放异彩，大家耳熟能详的《大话西游II》，《魔兽世界》都大量使用 Lua 脚本。</p><p>Java 后端工程师接触过的 api 网关，比如 <strong>Openresty</strong> ，<strong>Kong</strong> 都可以看到 Lua 脚本的身影。</p><p>从 Redis 2.6.0 版本开始， Redis内置的 Lua 解释器，可以实现在 Redis 中运行 Lua 脚本。</p><p>使用 Lua 脚本的好处 ：</p><ul><li>减少网络开销。将多个请求通过脚本的形式一次发送，减少网络时延。</li><li>原子操作。Redis会将整个脚本作为一个整体执行，中间不会被其他命令插入。</li><li>复用。客户端发送的脚本会永久存在 Redis 中，其他客户端可以复用这一脚本而不需要使用代码完成相同的逻辑。</li></ul><p>Redis Lua 脚本常用命令：</p><table><thead><tr><th>序号</th><th>命令及描述</th></tr></thead><tbody><tr><td>1</td><td>EVAL script numkeys key [key ...] arg [arg ...] 执行 Lua 脚本。</td></tr><tr><td>2</td><td>EVALSHA sha1 numkeys key [key ...] arg [arg ...] 执行 Lua 脚本。</td></tr><tr><td>3</td><td>SCRIPT EXISTS script [script ...] 查看指定的脚本是否已经被保存在缓存当中。</td></tr><tr><td>4</td><td>SCRIPT FLUSH 从脚本缓存中移除所有脚本。</td></tr><tr><td>5</td><td>SCRIPT KILL 杀死当前正在运行的 Lua 脚本。</td></tr><tr><td>6</td><td>SCRIPT LOAD script 将脚本 script 添加到脚本缓存中，但并不立即执行这个脚本。</td></tr></tbody></table><h3 id="_5-2-eval-命令" tabindex="-1"><a class="header-anchor" href="#_5-2-eval-命令" aria-hidden="true">#</a> 5.2 EVAL 命令</h3><p>命令格式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>EVAL script numkeys key [key ...] arg [arg ...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>说明：</p><ul><li><code>script</code>是第一个参数，为 Lua 5.1脚本；</li><li>第二个参数<code>numkeys</code>指定后续参数有几个 key；</li><li><code>key [key ...]</code>，是要操作的键，可以指定多个，在 Lua 脚本中通过<code>KEYS[1]</code>, <code>KEYS[2]</code>获取；</li><li><code>arg [arg ...]</code>，参数，在 Lua 脚本中通过<code>ARGV[1]</code>, <code>ARGV[2]</code>获取。</li></ul><p>简单实例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis&gt; eval &quot;return ARGV[1]&quot; 0 100 
&quot;100&quot;
redis&gt; eval &quot;return {ARGV[1],ARGV[2]}&quot; 0 100 101
1) &quot;100&quot;
2) &quot;101&quot;
redis&gt; eval &quot;return {KEYS[1],KEYS[2],ARGV[1]}&quot; 2 key1 key2 first second
1) &quot;key1&quot;
2) &quot;key2&quot;
3) &quot;first&quot;
4) &quot;second&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面演示下 Lua 如何调用 Redis 命令 ，通过<code>redis.call()</code>来执行了 Redis 命令 。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis&gt; set mystring &#39;hello world&#39;
OK
redis&gt; get mystring
&quot;hello world&quot;
redis&gt; EVAL &quot;return redis.call(&#39;GET&#39;,KEYS[1])&quot; 1 mystring
&quot;hello world&quot;
redis&gt; EVAL &quot;return redis.call(&#39;GET&#39;,&#39;mystring&#39;)&quot; 0
&quot;hello world&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-evalsha-命令" tabindex="-1"><a class="header-anchor" href="#_5-3-evalsha-命令" aria-hidden="true">#</a> 5.3 EVALSHA 命令</h3><p>使用 EVAL 命令每次请求都需要传输 Lua 脚本 ，若 Lua 脚本过长，不仅会消耗网络带宽，而且也会对 Redis 的性能造成一定的影响。</p><p>思路是先将 Lua 脚本先缓存起来 , 返回给客户端 Lua 脚本的 sha1 摘要。 客户端存储脚本的 sha1 摘要 ，每次请求执行 EVALSHA 命令即可。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-shizlllldsjtzhbygndsjysx-80555399-ce33-4a0d-baf6-56cb55da5aa6.jpg" alt="" loading="lazy"></p><p>EVALSHA 命令基本语法如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis&gt; EVALSHA sha1 numkeys key [key ...] arg [arg ...] 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>实例如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis&gt; SCRIPT LOAD &quot;return &#39;hello world&#39;&quot;
&quot;5332031c6b470dc5a0dd9b4bf2030dea6d65de91&quot;
redis&gt; EVALSHA 5332031c6b470dc5a0dd9b4bf2030dea6d65de91 0
&quot;hello world&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-事务-vs-lua-脚本" tabindex="-1"><a class="header-anchor" href="#_5-4-事务-vs-lua-脚本" aria-hidden="true">#</a> 5.4 事务 VS Lua 脚本</h3>`,133),o=e("p",null,"从定义上来说， Redis 中的脚本本身就是一种事务， 所以任何在事务里可以完成的事， 在脚本里面也能完成。 并且一般来说， 使用脚本要来得更简单，并且速度更快。",-1),v=e("p",null,"因为脚本功能是 Redis 2.6 才引入的， 而事务功能则更早之前就存在了， 所以 Redis 才会同时存在两种处理事务的方法。",-1),b=e("p",null,"不过我们并不打算在短时间内就移除事务功能， 因为事务提供了一种即使不使用脚本， 也可以避免竞争条件的方法， 而且事务本身的实现并不复杂。",-1),m={href:"https://redis.io/",target:"_blank",rel:"noopener noreferrer"},p=d(`<p>Lua 脚本是另一种形式的事务，他具备一定的原子性，但脚本报错的情况下，事务并不会回滚。Lua 脚本可以保证隔离性，而且可以完美的支持<strong>后面的步骤依赖前面步骤的结果</strong>。</p><p>综上，Lua 脚本是抢红包场景最优的解决方案。</p><p>但在编写 Lua 脚本时，要注意如下两点：</p><ol><li>为了避免 Redis 阻塞，Lua 脚本业务逻辑不能过于复杂和耗时；</li><li>仔细检查和测试 Lua 脚本 ，因为执行 Lua 脚本具备一定的原子性，不支持回滚。</li></ol><h2 id="_6-实战准备" tabindex="-1"><a class="header-anchor" href="#_6-实战准备" aria-hidden="true">#</a> 6 实战准备</h2><p>我选择 Redisson 3.12.0 版本作为 Redis 的客户端，在 Redisson 源码基础上做一层薄薄的封装。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-shizlllldsjtzhbygndsjysx-46036f01-d57c-441e-9584-299e1b3ee7cd.jpg" alt="" loading="lazy"></p><p>创建一个 PlatformScriptCommand 类， 用来执行 Lua 脚本。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 加载 Lua 脚本 
String scriptLoad(String luaScript);
// 执行 Lua 脚本
Object eval(String shardingkey, 

            String luaScript, 

            ReturnType returnType,

            List&lt;Object&gt; keys, 

            Object... values);
// 通过 sha1 摘要执行Lua脚本
Object evalSha(String shardingkey, 

               String shaDigest,

               List&lt;Object&gt; keys, 

               Object... values);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里为什么我们需要添加一个 shardingkey 参数呢 ？</p><p>因为 Redis 集群模式下，我们需要定位哪一个节点执行 Lua 脚本。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public int calcSlot(String key) {
    if (key == null) {
        return 0;
    }
    int start = key.indexOf(&#39;{&#39;);
    if (start != -1) {
        int end = key.indexOf(&#39;}&#39;);
        key = key.substring(start+1, end);
    }
    int result = CRC16.crc16(key.getBytes()) % MAX_SLOT;
    log.debug(&quot;slot {} for {}&quot;, result, key);
    return result;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-抢红包脚本" tabindex="-1"><a class="header-anchor" href="#_7-抢红包脚本" aria-hidden="true">#</a> 7 抢红包脚本</h2><p>客户端执行 Lua 脚本后返回 json 字符串。</p><ul><li>用户抢红包成功</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;code&quot;:&quot;0&quot;,
    //红包金额   
    &quot;amount&quot;:&quot;7.1&quot;,
    //红包编号
    &quot;redPacketId&quot;:&quot;162339217730846210&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>用户已领取过</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;code&quot;:&quot;1&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>用户抢红包失败</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;code&quot;:&quot;-1&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Redis Lua 中内置了 cjson 函数，用于 json 的编解码。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-- KEY[1]: 用户防重领取记录
local userHashKey = KEYS[1];
-- KEY[2]: 运营预分配红包列表
local redPacketOperatingKey = KEYS[2];
-- KEY[3]: 用户红包领取记录 
local userAmountKey = KEYS[3];
-- KEY[4]: 用户编号
local userId = KEYS[4];
local result = {};
-- 判断用户是否领取过 
if redis.call(&#39;hexists&#39;, userHashKey, userId) == 1 then
  result[&#39;code&#39;] = &#39;1&#39;; 
  return cjson.encode(result);
else
   -- 从预分配红包中获取红包数据
   local redPacket = redis.call(&#39;rpop&#39;, redPacketOperatingKey);
   if redPacket
   then
      local data = cjson.decode(redPacket);
      -- 加入用户ID信息
      data[&#39;userId&#39;] = userId; 
     -- 把用户编号放到去重的哈希，value设置为红包编号
      redis.call(&#39;hset&#39;, userHashKey, userId, data[&#39;redPacketId&#39;]);
     --  用户和红包放到已消费队列里
      redis.call(&#39;lpush&#39;, userAmountKey, cjson.encode(data));
     -- 组装成功返回值
      result[&#39;redPacketId&#39;] = data[&#39;redPacketId&#39;];
      result[&#39;code&#39;] = &#39;0&#39;;
      result[&#39;amount&#39;] = data[&#39;amount&#39;];
      return cjson.encode(result);
   else
      -- 抢红包失败
      result[&#39;code&#39;] = &#39;-1&#39;;
      return cjson.encode(result);
   end 
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>脚本编写过程中，难免会有疏漏，如何进行调试？</p><p>个人建议两种方式结合进行。</p><ol><li>编写 junit 测试用例 ；</li><li>从 Redis 3.2 开始，内置了 Lua debugger（简称<code>LDB</code>）, 可以使用 Lua debugger 对 Lua 脚本进行调试。</li></ol><h2 id="_8-异步任务" tabindex="-1"><a class="header-anchor" href="#_8-异步任务" aria-hidden="true">#</a> 8 异步任务</h2><p>在 Redisson 基础上封装了两个类 ，简化开发者的使用成本。</p><ol><li>RedisMessageConsumer :  <strong>消费者类</strong>，配置监听队列名，以及对应的消费监听器</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>String groupName = &quot;userGroup&quot;;
String queueName = &quot;userAmountQueue&quot;;
RedisMessageQueueBuilder buidler =
        redisClient.getRedisMessageQueueBuilder();
RedisMessageConsumer consumer =
        new RedisMessageConsumer(groupName, buidler);
consumer.subscribe(queueName, userAmountMessageListener);
consumer.start();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>RedisMessageListener :  <strong>消费监听器</strong>，编写业务消费代码</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class UserAmountMessageListener implements RedisMessageListener {
  @Override
  public RedisConsumeAction onMessage(RedisMessage redisMessage) {
   try {
    String message = (String) redisMessage.getData();
    // TODO 调用用户余额系统
    // 返回消费成功
    return RedisConsumeAction.CommitMessage;
   }catch (Exception e) {
    logger.error(&quot;userAmountService invoke error:&quot;, e);
    // 消费失败，执行重试操作
    return RedisConsumeAction.ReconsumeLater;
  }
 }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_9-写到最后" tabindex="-1"><a class="header-anchor" href="#_9-写到最后" aria-hidden="true">#</a> 9 写到最后</h2><blockquote><p>&quot;<strong>纸上得来终觉浅, 绝知此事要躬行</strong>&quot; 。</p></blockquote><p>学习 Redis Lua 过程中，查询了很多资料，一个例子一个例子的实践，收获良多。</p><p>非常坦诚的讲 ,  写这篇文章之前，我对 Redis Lua 有很多<strong>想当然</strong>的理解，比如 Redis 的事务不能回滚就让我惊讶不已。</p><p>所以当面对自己不熟悉的知识点时，不要轻易下结论，以谦卑的心态去学习，才是一个工程师需要的心态。</p><p>同时，没有任何一项技术是完美的，在设计和编码之间，有这样或者那样的平衡，这才是真实的世界。</p>`,37),g={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500794&idx=2&sn=c3e404938b5f348514286576b6977d66&chksm=fc2c7ff2cb5bf6e44f9ba46bae686a8a3f45bf03840926d2b9db9d0e9b278016b54ce689f12d#rd",target:"_blank",rel:"noopener noreferrer"};function h(x,y){const n=r("ExternalLinkIcon");return l(),t("div",null,[c,e("blockquote",null,[o,v,b,e("p",null,[i("-- "),e("a",m,[i("https://redis.io/"),s(n)])])]),p,e("blockquote",null,[e("p",null,[i("参考链接："),e("a",g,[i("https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500794&idx=2&sn=c3e404938b5f348514286576b6977d66&chksm=fc2c7ff2cb5bf6e44f9ba46bae686a8a3f45bf03840926d2b9db9d0e9b278016b54ce689f12d#rd"),s(n)])])])])}const f=a(u,[["render",h],["__file","shizlllldsjtzhbygndsjysx.html.vue"]]);export{f as default};
