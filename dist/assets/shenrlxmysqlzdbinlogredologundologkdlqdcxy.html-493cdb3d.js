import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as a,c as d,a as e,d as n,b as o,e as r}from"./app-1c5b5ce3.js";const c={},t=r(`<p>球友们好，本来打算自己写一篇 MySQL 的 bin log、redo log、undo log 的，结果看到一篇读者的文章，写得已经非常好了，这里就直接先分享给大家吧。后面写MySQL 专栏的时候再自己重写一版。</p><p>日志是 mysql 数据库的重要组成部分，记录着数据库运行期间各种状态信息。 MySQL 日志主要包括错误日志、查询日志、慢查询日志、事务日志、二进制日志几大类。作为开发，我们重点需要关注的是二进制日志( binlog )和事务日志(包括 redo log 和 undo log )。</p><h2 id="bin-log-二进制日志" tabindex="-1"><a class="header-anchor" href="#bin-log-二进制日志" aria-hidden="true">#</a> bin log（二进制日志）</h2><h3 id="什么是bin-log" tabindex="-1"><a class="header-anchor" href="#什么是bin-log" aria-hidden="true">#</a> 什么是bin log？</h3><blockquote><p>记录数据库执行的写入性操作信息，以二进制的形式保存在磁盘中。</p><p>由服务层产生，所有储存引擎都支持。</p><p>bin log属于逻辑日志。</p></blockquote><p>bin log日志有三种格式：STATMENT、ROW、MIXED。MySQL5.7.7之后默认是ROW。</p><p>简单普及一下逻辑日志和物理日志：</p><ul><li>逻辑日志：记录的sql语句。</li><li>物理日志：记录的数据页变更。</li></ul><h3 id="bin-log的使用场景" tabindex="-1"><a class="header-anchor" href="#bin-log的使用场景" aria-hidden="true">#</a> bin log的使用场景？</h3><ul><li>主从复制：在<code>master</code>端开启bin log，然后<code>master</code>将bin log发送到每个<code>slave</code>端，<code>slave</code>端重放bin log从而达到主从数据一致。</li></ul><p>简单画个图来理解一下MySQL的主从复制流程：</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-shenrlxmysqlzdbinlogredologundologkdlqdcxy-7ed47c4c-8ce7-4f66-8121-6f2f12f9622f.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ol><li>master在准备提交事务之前，将变更记录到bin log中。</li><li>slave启动一个IO线程来读取bin log中的事件，并记录到自己的ready log（中继日志）中。</li><li>同时slave还会启动一个SQL线程，读取ready log中的事件在备库中执行，从而实现备库的数据更新。</li></ol><ul><li>数据恢复：通过使用<code>mysqlbinlog</code>工具来恢复数据。</li><li>增量备份</li></ul><h3 id="如何开启bin-log" tabindex="-1"><a class="header-anchor" href="#如何开启bin-log" aria-hidden="true">#</a> 如何开启bin log？</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code># 查看是否开启bin log，这里可以看到没有开启
mysql&gt; show variables like &#39;%log_bin%&#39;;
+---------------------------------+-------+
| Variable_name                   | Value |
+---------------------------------+-------+
| log_bin                         | OFF   |
| log_bin_basename                |       |
| log_bin_index                   |       |
| log_bin_trust_function_creators | OFF   |
| log_bin_use_v1_row_events       | OFF   |
| sql_log_bin                     | ON    |
+---------------------------------+-------+
6 rows in set (0.05 sec)

# 查看当前MySQL版本
mysql&gt; select version();
+-----------+
| version() |
+-----------+
| 5.7.36    |
+-----------+
1 row in set (0.20 sec)

# 确认已开启bin log
mysql&gt; show variables like &#39;%log_bin%&#39;;
+---------------------------------+-----------------------------+
| Variable_name                   | Value                       |
+---------------------------------+-----------------------------+
| log_bin                         | ON                          |
| log_bin_basename                | /var/lib/mysql/binlog       |
| log_bin_index                   | /var/lib/mysql/binlog.index |
| log_bin_trust_function_creators | OFF                         |
| log_bin_use_v1_row_events       | OFF                         |
| sql_log_bin                     | ON                          |
+---------------------------------+-----------------------------+
6 rows in set (0.03 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果没有开启，编辑<code>/etc/my.cnf</code>文件，添加以下配置：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code># 开启bin log日志
log-bin=binlog
# 配置server-id
server-id=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="如何查看以及修改每个bin-log文件大小最大值" tabindex="-1"><a class="header-anchor" href="#如何查看以及修改每个bin-log文件大小最大值" aria-hidden="true">#</a> 如何查看以及修改每个bin log文件大小最大值？</h3><p>查看本机的bin log文件大小最大值，可以看到是1073741824字节，也就是1G。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mysql<span class="token operator">&gt;</span> show variables like <span class="token string">&#39;max_binlog_size&#39;</span><span class="token punctuation">;</span>
+-----------------+------------+
<span class="token operator">|</span> Variable_name   <span class="token operator">|</span> Value      <span class="token operator">|</span>
+-----------------+------------+
<span class="token operator">|</span> max_binlog_size <span class="token operator">|</span> <span class="token number">1073741824</span> <span class="token operator">|</span>
+-----------------+------------+
<span class="token number">1</span> row <span class="token keyword">in</span> <span class="token builtin class-name">set</span> <span class="token punctuation">(</span><span class="token number">0.00</span> sec<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加或修改MySQL的<code>my.cnf</code>文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">max_binlog_size</span><span class="token operator">=</span>2G
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="如何使用bin-log恢复数据" tabindex="-1"><a class="header-anchor" href="#如何使用bin-log恢复数据" aria-hidden="true">#</a> 如何使用bin log恢复数据？</h3><p>查看 bin log：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code># 查看当前bin log位置
mysql&gt; show master status;
 # 也可以刷新日志，方便后面筛选
mysql&gt; flush logs;
 # 查看二进制日志列表
mysql&gt; show binary logs;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>bin log恢复数据：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 根据事件位置恢复（--start-position是开始位置，--stop-position是结束位置）</span>
mysqlbinlog --start-position<span class="token operator">=</span><span class="token number">16275</span> --stop-position<span class="token operator">=</span><span class="token number">16566</span> <span class="token parameter variable">--database</span><span class="token operator">=</span>just-test /var/lib/mysql/binlog.000004 <span class="token operator">|</span> mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123456</span>
<span class="token comment"># 根据指定时间恢复（--start-datetime是开始时间，--stop-datetime是结束时间）</span>
mysqlbinlog --start-datetime<span class="token operator">=</span><span class="token string">&quot;2022-02-17 12:00:00&quot;</span> --stop-datetime<span class="token operator">=</span><span class="token string">&quot;2022-02-17 18:00:00&quot;</span> <span class="token parameter variable">--database</span><span class="token operator">=</span>just-test /var/lib/mysql/binlog.000004 <span class="token operator">|</span> mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123456</span>

<span class="token comment"># --database是指定只恢复just-test数据库，/var/lib/mysql/binlog.000004是binlog日志文件路径</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>bin log日志解码以及导出到服务器中：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mysqlbinlog <span class="token parameter variable">-vvv</span> --base64-output<span class="token operator">=</span>decode-rows --start-position<span class="token operator">=</span><span class="token number">154</span> --stop-position<span class="token operator">=</span><span class="token number">2150</span> <span class="token parameter variable">--database</span><span class="token operator">=</span>just-test /var/lib/mysql/binlog.000001 <span class="token operator">&gt;</span> /just-test.sql <span class="token operator">|</span> mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p123456</span> <span class="token parameter variable">-f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>-vvv</code>：显示出执行的SQL以及binlog_rows_query_log_events参数。</p><p><code>--base64-output=decode-rows</code>：如果bin log为row格式必须使用该选项对日志进行解析，恢复数据时不能加该选项。</p><p>简单演示一下如何恢复被删掉的数据：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code># 快速创建一个极其简单的数据表来用于测试
mysql&gt; CREATE TABLE \`quick-test-data\` (
  \`id\` bigint(20) DEFAULT NULL,
  \`name\` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

# 分别插入小明和小花两条数据
mysql&gt; INSERT INTO \`quick-test-data\` (\`id\`, \`name\`) VALUES (1, &#39;小明&#39;);
mysql&gt; INSERT INTO \`quick-test-data\` (\`id\`, \`name\`) VALUES (2, &#39;小花&#39;);
mysql&gt; INSERT * FROM \`quick-test-data\`;
+------+--------+
| id   | name   |
+------+--------+
|    1 | 小明   |
|    2 | 小花   |
+------+--------+

# 删掉小花
mysql&gt; DELETE FROM \`quick-test-data\` WHERE \`id\` = 2
mysql&gt; INSERT * FROM \`quick-test-data\`;
+------+--------+
| id   | name   |
+------+--------+
|    1 | 小明   |
+------+--------+

# 查看bin log日志，确定从哪里开始恢复（数据比较多，我在此抽取一部分，binlog.000004是刷新几次之后的日志文件，根据自己实际情况来）
mysql&gt; show binlog events in &#39;binlog.000004&#39;;
+---------------+-------+----------------+-----------+-------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Log_name      | Pos   | Event_type     | Server_id | End_log_pos | Info                                                                                                                                                                                                                     |
+---------------+-------+----------------+-----------+-------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| binlog.000004 | 15636 | Anonymous_Gtid |         1 |       15701 | SET @@SESSION.GTID_NEXT= &#39;ANONYMOUS&#39;                                                                                                                                                                                     |
| binlog.000004 | 15701 | Query          |         1 |       15984 | use \`just-test\`; CREATE TABLE \`just-test\`.\`quick-test-data\`  (
  \`id\` bigint NULL,
  \`name\` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci |
| binlog.000004 | 15984 | Anonymous_Gtid |         1 |       16049 | SET @@SESSION.GTID_NEXT= &#39;ANONYMOUS&#39;                                                                                                                                                                                     |
| binlog.000004 | 16049 | Query          |         1 |       16126 | BEGIN                                                                                                                                                                                                                    |
| binlog.000004 | 16126 | Table_map      |         1 |       16192 | table_id: 116 (just-test.quick-test-data)                                                                                                                                                                                |
| binlog.000004 | 16192 | Write_rows     |         1 |       16244 | table_id: 116 flags: STMT_END_F                                                                                                                                                                                          |
| binlog.000004 | 16244 | Xid            |         1 |       16275 | COMMIT /* xid=1088 */                                                                                                                                                                                                    |
| binlog.000004 | 16275 | Anonymous_Gtid |         1 |       16340 | SET @@SESSION.GTID_NEXT= &#39;ANONYMOUS&#39;                                                                                                                                                                                     |
| binlog.000004 | 16340 | Query          |         1 |       16417 | BEGIN                                                                                                                                                                                                                    |
| binlog.000004 | 16417 | Table_map      |         1 |       16483 | table_id: 116 (just-test.quick-test-data)                                                                                                                                                                                |
| binlog.000004 | 16483 | Write_rows     |         1 |       16535 | table_id: 116 flags: STMT_END_F                                                                                                                                                                                          |
| binlog.000004 | 16535 | Xid            |         1 |       16566 | COMMIT /* xid=1091 */                                                                                                                                                                                                    |
| binlog.000004 | 16566 | Anonymous_Gtid |         1 |       16631 | SET @@SESSION.GTID_NEXT= &#39;ANONYMOUS&#39;                                                                                                                                                                                     |
| binlog.000004 | 16631 | Query          |         1 |       16708 | BEGIN                                                                                                                                                                                                                    |
| binlog.000004 | 16708 | Table_map      |         1 |       16774 | table_id: 116 (just-test.quick-test-data)                                                                                                                                                                                |
| binlog.000004 | 16774 | Delete_rows    |         1 |       16826 | table_id: 116 flags: STMT_END_F                                                                                                                                                                                          |
| binlog.000004 | 16826 | Xid            |         1 |       16857 | COMMIT /* xid=1094 */                                                                                                                                                                                                    |
+---------------+-------+----------------+-----------+-------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

### 分析此处的bin log日志 ###
# 15701~15984：建表quick-test-data
# 15984~16275：插入第一条数据，即小明
# 16275~16566：插入第二条数据，即小花
# 16566~16857：删除小花
## 所以，因为数据表和小明都是存在的，所以，我们的start-position应该是16275，stop-position应该是16566
## 16566~16857这里是删除小花的，所以，这个部分不能被包括进来，不然恢复之后又被删除掉了

# 使用mysqlbinlog工具恢复被删除的小花数据
# 在Linux命令行执行（注意不是在mysql命令行）
[root@lzhpo-light ~]# mysqlbinlog --start-position=16275 --stop-position=16566 --database=just-test /var/lib/mysql/binlog.000004 | mysql -uroot -p123456

# 恢复之后的数据表
mysql&gt; select * from \`quick-test-data\`;
+------+--------+
| id   | name   |
+------+--------+
|    1 | 小明   |
|    2 | 小花   |
+------+--------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="如何正确删除bin-log日志" tabindex="-1"><a class="header-anchor" href="#如何正确删除bin-log日志" aria-hidden="true">#</a> 如何正确删除bin log日志?</h3><ul><li><code>reset master</code>命令：虽然可以清空所有bin log文件，但是会导致从库异常，主从架构下无法使用。</li><li><code>expire_logs_days</code>变量：通过该变量可以指定自动删除日期，如果日志过多，在删除时会有IO过高问题，可能导致性能抖动。</li><li><code>purge</code>命令：推荐方法，可以快速删除指定bin log。</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code># 删除bin log到指定的文件为止
mysql&gt; PURGE MASTER LOGS TO &#39;binlog.000004&#39;
 # 删除指定日期之前的文件
mysql&gt; PURGE MASTER LOGS BEFORE &#39;2022-02-18 18:30:00&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="redo-log-重做日志" tabindex="-1"><a class="header-anchor" href="#redo-log-重做日志" aria-hidden="true">#</a> redo log（重做日志）</h2><h3 id="什么是redo-log" tabindex="-1"><a class="header-anchor" href="#什么是redo-log" aria-hidden="true">#</a> 什么是redo log？</h3><blockquote><p>简单一句话：<strong>redo log就是记录数据页的变更</strong>。</p><p>redo log由InnoDB的存储引擎层产生，是InnoDB 存储引擎特有的。</p><p>redo log属于物理日志，因为，它记录的是数据页的变更。</p></blockquote><p>因为，这种改变记录不是说一定要全部保存下来，所以，redo log采用的是大小固定，循环写入的方式，当从开头开始写到结尾的时候，又会回到开头继续写日志。</p><h3 id="redo-log记录日志的方式-原理" tabindex="-1"><a class="header-anchor" href="#redo-log记录日志的方式-原理" aria-hidden="true">#</a> redo log记录日志的方式（原理）？</h3><p><em>emm…图丑，但能帮助理解就好。</em></p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-shenrlxmysqlzdbinlogredologundologkdlqdcxy-7c27e1cc-8336-42f1-9fa4-f65062550074.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>InnoDB的redo log文件大小是固定的，假设我这里redo log大小为4G，并且我划分为4个部分，redo log就会从<code>ib_logfile_0</code>开始写<code>ib_logfile_1</code>、<code>ib_logfile_2</code>、<code>ib_logfile_3</code>，直到4个部分都写满为止，再重新回到第一个部分<code>ib_logfile_0</code>开始写。</p><p><code>write position</code>：当前记录的LSN（Log Sequence Number，日志序列号）位置。一边写，一边顺时针移动（向前移动）。</p><p><code>check point</code>：当前数据页更改记录刷盘之后所处的LSN（Log Sequence Number，日志序列号）位置。一边写，一边顺时针移动（向前移动）。</p><p><code>check point</code>到<code>write position</code>部分就是待落盘的数据页更改记录。</p><p><code>write position</code>到<code>check point</code>部分就是redo log空闲的部分，用来记录新的操作日志。</p><p>当<code>write position</code>追上<code>check point</code>的时候，会先推动<code>check point</code>顺时针移动（向前移动），等到有空闲的redo log位置的时候再记录新的操作日志。</p><h3 id="redo-log如何进行异常崩溃数据恢复的" tabindex="-1"><a class="header-anchor" href="#redo-log如何进行异常崩溃数据恢复的" aria-hidden="true">#</a> redo log如何进行异常崩溃数据恢复的？</h3><p>每当启动InnoDB的时候，不管上次是正常关闭还是异常关闭，都会进行恢复操作。</p><p>因为<code>redo log</code>记录的是数据页的物理变化，因此恢复的时候速度比逻辑日志(如<code>bin log</code>)要快很多。</p><p>在此，我画一个简单的流程图方便理解</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-shenrlxmysqlzdbinlogredologundologkdlqdcxy-7a574353-5f48-4b4d-907b-f5415583ca5a.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>还有一种比较特殊的情况，数据页LSN也会大于日志LSN：</strong></p><p>当宕机的时候，正在处理<code>check point</code>刷盘过程，且数据页的刷盘进度超过了日志页的刷盘进度，此时，也会出现数据页LSN也会大于日志LSN的情况。</p><p>这种情况的话，数据页剩下的这点redo log日志将不会重做，会正常启动。</p><h3 id="如何查看以及修改redo-log的大小" tabindex="-1"><a class="header-anchor" href="#如何查看以及修改redo-log的大小" aria-hidden="true">#</a> 如何查看以及修改redo log的大小？</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; show variables like &#39;innodb_log%&#39;;
+------------------------------------+----------+
| Variable_name                      | Value    |
+------------------------------------+----------+
| innodb_log_buffer_size             | 16777216 |
| innodb_log_checksums               | ON       |
| innodb_log_compressed_pages        | ON       |
| innodb_log_file_size               | 50331648 |
| innodb_log_files_in_group          | 2        |
| innodb_log_group_home_dir          | ./       |
| innodb_log_spin_cpu_abs_lwm        | 80       |
| innodb_log_spin_cpu_pct_hwm        | 50       |
| innodb_log_wait_for_flush_spin_hwm | 400      |
| innodb_log_write_ahead_size        | 8192     |
| innodb_log_writer_threads          | ON       |
+------------------------------------+----------+
11 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>innodb_log_file_size</code>就是redo log文件大小，50331648字节，也就是48MB。</p><p>要修改的话，打开MySQL的<code>my.cnf</code>文件，添加或编辑配置，比如，我修改为1G：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">innodb_log_file_size</span><span class="token operator">=</span>1G
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="如何自定义在事务提交的时候将log-buffer中的日志刷入log-file中的时机" tabindex="-1"><a class="header-anchor" href="#如何自定义在事务提交的时候将log-buffer中的日志刷入log-file中的时机" aria-hidden="true">#</a> 如何自定义在事务提交的时候将log buffer中的日志刷入log file中的时机？</h3><p>可以通过配置<code>innodb_flush_log_at_trx_commit</code>参数来更改刷入时机。</p><p>查看当前MySQL的配置时机：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>mysql&gt; show variables like &#39;innodb_flush_log_at_trx_commit&#39;;
+--------------------------------+-------+
| Variable_name                  | Value |
+--------------------------------+-------+
| innodb_flush_log_at_trx_commit | 1     |
+--------------------------------+-------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数值解释：</p><ul><li>0：延迟写，延迟刷。</li></ul><p>事务提交的的时候不会将<code>redo log buffer</code>中的日志写入到<code>os buffer</code>，而是每秒写入<code>os buffer</code>并调用<code>fsync()</code>写入到<code>redo log file</code>中。</p><p>这样子可能会导致，当系统崩溃，可能丢失1秒的数据。</p><ul><li>1：实时写，实时刷。</li></ul><p>事务每次提交都会将<code>redo log buffer</code>中的日志写入<code>os buffer</code>并调用<code>fsync()</code>刷到<code>redo log file</code>中。</p><p>这种方式即使系统崩溃也不会丢失任何数据，但是因为每次提交都写入磁盘，IO的性能较差。</p><ul><li>2：实时写，延迟刷。</li></ul><p>事务每次提交都仅写入到<code>os buffer</code>，然后是每秒调用<code>fsync()</code>将<code>os buffer</code>中的日志写入到<code>redo log file</code>。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-shenrlxmysqlzdbinlogredologundologkdlqdcxy-a079ed69-cb61-4221-be23-4c6c613308c2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="undo-log-回滚日志" tabindex="-1"><a class="header-anchor" href="#undo-log-回滚日志" aria-hidden="true">#</a> undo log（回滚日志）</h2><h3 id="什么是undo-log" tabindex="-1"><a class="header-anchor" href="#什么是undo-log" aria-hidden="true">#</a> 什么是undo log？</h3><blockquote><p>MySQL（存储引擎需要能支持事务）在修改记录之前（提交事务之前），会把原先记录的值先保存起来（也就是写入到undo log），然后再修改（提交事务），当出问题的时候MySQL可以利用undo log来回滚事务，即恢复原先的记录值。</p><p>undo log由InnoDB的存储引擎层产生，是InnoDB 存储引擎特有的（和redo log一样）。</p><p>undo log属于逻辑日志。</p></blockquote><p>MySQL的事务四大特性：原子性、隔离性、持久性、一致性。其中，原子性的底层就是靠undo log实现的。</p><h3 id="undo-log的作用" tabindex="-1"><a class="header-anchor" href="#undo-log的作用" aria-hidden="true">#</a> undo log的作用？</h3><h4 id="_1-事务回滚" tabindex="-1"><a class="header-anchor" href="#_1-事务回滚" aria-hidden="true">#</a> 1.事务回滚</h4><p>前面我们说到，当出问题需要回滚事务的时候，可以利用MySQL的undo log来回滚事务，以保证事务的一致性。</p><p>比如：执行一条delete语句:</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>DELETE FROM sys_log WHERE id = 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>undo log就会记录一条与它相反的日志，即记录它的insert语句。</p><p>update语句也是同理，记录与它相反的update语句。</p><p>执行一条update语句：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code># 假设，之前username是小花
UPDATE sys_user SET username = &#39;小明&#39; WHERE id = 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>undo log就会记录与它相反的update语句：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>UPDATE sys_user SET username = &#39;小花&#39; WHERE id = 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-多版本控制-mvcc" tabindex="-1"><a class="header-anchor" href="#_2-多版本控制-mvcc" aria-hidden="true">#</a> 2.多版本控制（MVCC）</h4><blockquote><p>MVCC全称即Multi-Version Concurrency Control。</p></blockquote><p>在MySQL的InnoDB存储引擎中，就是用undo log来实现MVCC的。</p><p>举个例子，当我们读取的某一行被其它事务锁定的时候，InnoDB可以从undo log中分析出该记录历史版本的数据，从而让我们可以读取到当前事务操作之前的数据（也就是快照读）。</p><p>普及一下快照读和当前读：</p><ul><li>快照读：读取的历史版本数据，不会加锁。</li></ul><p>普通的select就是快照读。</p><ul><li>当前读：读取的是最新版本, 会对读取的记录加锁, 以保证其它事务无法对此记录进行变更，保证安全性。</li></ul><p>属于当前读的：update、delete、insert、select … for update、select … lock in share mode（共享读锁）等等。</p><h3 id="undo-log的工作机制" tabindex="-1"><a class="header-anchor" href="#undo-log的工作机制" aria-hidden="true">#</a> undo log的工作机制？</h3><p>在MySQL的InnoDB存储引擎中，undo log是采用分段（segment）的方式保存的，简单来说，就是一种命名为rollback segment的回滚段，每个回滚段中有1024个undo log segment。</p><p>在MySQL5.5之后，能支持128个回滚段，也就是能支持128*1024个undo log segment，在此之前是只支持1个回滚段，也就是1024个undo log segment。</p><h3 id="undo-log工作原理" tabindex="-1"><a class="header-anchor" href="#undo-log工作原理" aria-hidden="true">#</a> undo log工作原理？</h3><p>在此，简单画一张图来理解一下：</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/other-shenrlxmysqlzdbinlogredologundologkdlqdcxy-d20d0db9-54cf-4258-9e3f-56811e52fa5b.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ol><li>事务A提交之前，会备份之前的数据到对应的undo buffer，然后undo log保存之前的记录数据，然后再将最新的数据持久化到ibd文件。</li><li>此时事务B查询，直接读取undo buffer缓存，因为这时候事务A还没提交且它需要回滚事务，所以，这时候事务B是不读取磁盘的，是直接从undo buffer缓存中读取。</li></ol>`,108),b={href:"http://www.lzhpo.com/article/173",target:"_blank",rel:"noopener noreferrer"};function u(v,m){const i=l("ExternalLinkIcon");return a(),d("div",null,[t,e("blockquote",null,[e("p",null,[n("参考链接："),e("a",b,[n("http://www.lzhpo.com/article/173"),o(i)])])])])}const h=s(c,[["render",u],["__file","shenrlxmysqlzdbinlogredologundologkdlqdcxy.html.vue"]]);export{h as default};
