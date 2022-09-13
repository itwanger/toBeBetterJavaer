import{_ as r}from"./plugin-vue_export-helper.21dcd24c.js";import{r as a,o as d,c as l,a as e,b as s,e as t,d as i}from"./app.610296d2.js";const c={},v=t(`<p>\u6279\u91CF\u63D2\u5165\u529F\u80FD\u662F\u6211\u4EEC\u65E5\u5E38\u5DE5\u4F5C\u4E2D\u6BD4\u8F83\u5E38\u89C1\u7684\u4E1A\u52A1\u529F\u80FD\u4E4B\u4E00\uFF0C\u4ECA\u5929\u54B1\u4EEC\u6765\u4E00\u4E2A MyBatis \u6279\u91CF\u63D2\u5165\u7684\u6C47\u603B\u7BC7\uFF0C\u540C\u65F6\u5BF9 3 \u79CD\u5B9E\u73B0\u65B9\u6CD5\u505A\u4E00\u4E2A\u6027\u80FD\u6D4B\u8BD5\uFF0C\u4EE5\u53CA\u76F8\u5E94\u7684\u539F\u7406\u5206\u6790\u3002</p><p>\u5148\u6765\u7B80\u5355\u8BF4\u4E00\u4E0B 3 \u79CD\u6279\u91CF\u63D2\u5165\u529F\u80FD\u5206\u522B\u662F\uFF1A</p><ol><li>\u5FAA\u73AF\u5355\u6B21\u63D2\u5165\uFF1B</li><li>MP \u6279\u91CF\u63D2\u5165\u529F\u80FD\uFF1B</li><li>\u539F\u751F\u6279\u91CF\u63D2\u5165\u529F\u80FD\u3002</li></ol><h2 id="\u51C6\u5907\u5DE5\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u51C6\u5907\u5DE5\u4F5C" aria-hidden="true">#</a> \u51C6\u5907\u5DE5\u4F5C</h2><p>\u5F00\u59CB\u4E4B\u524D\u6211\u4EEC\u5148\u6765\u521B\u5EFA\u6570\u636E\u5E93\u548C\u6D4B\u8BD5\u6570\u636E\uFF0C\u6267\u884C\u7684 SQL \u811A\u672C\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>-- ----------------------------
-- \u521B\u5EFA\u6570\u636E\u5E93
-- ----------------------------
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
DROP DATABASE IF EXISTS \`testdb\`;
CREATE DATABASE \`testdb\`;
USE \`testdb\`;

-- ----------------------------
-- \u521B\u5EFA user \u8868
-- ----------------------------
DROP TABLE IF EXISTS \`user\`;
CREATE TABLE \`user\`  (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  \`password\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  \`createtime\` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- \u6DFB\u52A0\u6D4B\u8BD5\u6570\u636E
-- ----------------------------
INSERT INTO \`user\` VALUES (1, &#39;\u8D75\u4E91&#39;, &#39;123456&#39;, &#39;2021-09-10 18:11:16&#39;);
INSERT INTO \`user\` VALUES (2, &#39;\u5F20\u98DE&#39;, &#39;123456&#39;, &#39;2021-09-10 18:11:28&#39;);
INSERT INTO \`user\` VALUES (3, &#39;\u5173\u7FBD&#39;, &#39;123456&#39;, &#39;2021-09-10 18:11:34&#39;);
INSERT INTO \`user\` VALUES (4, &#39;\u5218\u5907&#39;, &#39;123456&#39;, &#39;2021-09-10 18:11:41&#39;);
INSERT INTO \`user\` VALUES (5, &#39;\u66F9\u64CD&#39;, &#39;123456&#39;, &#39;2021-09-10 18:12:02&#39;);

SET FOREIGN_KEY_CHECKS = 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6570\u636E\u5E93\u7684\u6700\u7EC8\u6548\u679C\u5982\u4E0B\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jiantmybatisplcrdzffwtsjsyforeachjxm-c58f5d09-cd1d-4bc9-9095-286a645acd6c.jpg" alt=""></p><h2 id="_1-\u5FAA\u73AF\u5355\u6B21\u63D2\u5165" tabindex="-1"><a class="header-anchor" href="#_1-\u5FAA\u73AF\u5355\u6B21\u63D2\u5165" aria-hidden="true">#</a> 1.\u5FAA\u73AF\u5355\u6B21\u63D2\u5165</h2><p>\u63A5\u4E0B\u6765\u6211\u4EEC\u5C06\u4F7F\u7528 Spring Boot \u9879\u76EE\uFF0C\u6279\u91CF\u63D2\u5165 10W \u6761\u6570\u636E\u6765\u5206\u522B\u6D4B\u8BD5\u5404\u4E2A\u65B9\u6CD5\u7684\u6267\u884C\u65F6\u95F4\u3002</p><p>\u5FAA\u73AF\u5355\u6B21\u63D2\u5165\u7684\uFF08\u6D4B\u8BD5\uFF09\u6838\u5FC3\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import com.example.demo.model.User;
import com.example.demo.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UserControllerTest {

    // \u6700\u5927\u5FAA\u73AF\u6B21\u6570
    private static final int MAXCOUNT = 100000;

    @Autowired
    private UserServiceImpl userService;

    /**

     * \u5FAA\u73AF\u5355\u6B21\u63D2\u5165

     */
    @Test
    void save() {
        long stime = System.currentTimeMillis(); // \u7EDF\u8BA1\u5F00\u59CB\u65F6\u95F4
        for (int i = 0; i &lt; MAXCOUNT; i++) {
            User user = new User();
            user.setName(&quot;test:&quot; + i);
            user.setPassword(&quot;123456&quot;);
            userService.save(user);
        }
        long etime = System.currentTimeMillis(); // \u7EDF\u8BA1\u7ED3\u675F\u65F6\u95F4
        System.out.println(&quot;\u6267\u884C\u65F6\u95F4\uFF1A&quot; + (etime - stime));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD0\u884C\u4EE5\u4E0A\u7A0B\u5E8F\uFF0C\u82B1\u8D39\u4E86 88574 \u6BEB\u79D2\uFF0C\u5982\u4E0B\u56FE\u6240\u793A\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jiantmybatisplcrdzffwtsjsyforeachjxm-9d65d2e5-c528-47ba-a219-79b2797c3207.jpg" alt=""></p><h2 id="_2-mp-\u6279\u91CF\u63D2\u5165" tabindex="-1"><a class="header-anchor" href="#_2-mp-\u6279\u91CF\u63D2\u5165" aria-hidden="true">#</a> 2.MP \u6279\u91CF\u63D2\u5165</h2><p>MP \u6279\u91CF\u63D2\u5165\u529F\u80FD\u6838\u5FC3\u5B9E\u73B0\u7C7B\u6709\u4E09\u4E2A\uFF1AUserController\uFF08\u63A7\u5236\u5668\uFF09\u3001UserServiceImpl\uFF08\u4E1A\u52A1\u903B\u8F91\u5B9E\u73B0\u7C7B\uFF09\u3001UserMapper\uFF08\u6570\u636E\u5E93\u6620\u5C04\u7C7B\uFF09\uFF0C\u5B83\u4EEC\u7684\u8C03\u7528\u6D41\u7A0B\u5982\u4E0B:</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jiantmybatisplcrdzffwtsjsyforeachjxm-d31a8de8-a3de-4e16-8bac-10b0f093c972.jpg" alt=""></p><p>\u6CE8\u610F\u6B64\u65B9\u6CD5\u5B9E\u73B0\u9700\u8981\u5148\u6DFB\u52A0 MP \u6846\u67B6\uFF0C\u6253\u5F00 pom.xml \u6587\u4EF6\u6DFB\u52A0\u5982\u4E0B\u5185\u5BB9\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;com.baomidou&lt;/groupId&gt;
    &lt;artifactId&gt;mybatis-plus-boot-starter&lt;/artifactId&gt;
    &lt;version&gt;mybatis-plus-latest-version&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u6CE8\u610F\uFF1Amybatis-plus-latest-version \u8868\u793A MP \u6846\u67B6\u7684\u6700\u65B0\u7248\u672C\u53F7\uFF0C\u53EF\u8BBF\u95EE https://mvnrepository.com/artifact/com.baomidou/mybatis-plus-boot-starter \u67E5\u8BE2\u6700\u65B0\u7248\u672C\u53F7\uFF0C\u4F46\u5728\u4F7F\u7528\u7684\u65F6\u5019\u8BB0\u5F97\u4E00\u5B9A\u8981\u5C06\u4E0A\u9762\u7684 \u201Cmybatis-plus-latest-version\u201D\u66FF\u6362\u6210\u6362\u6210\u5177\u4F53\u7684\u7248\u672C\u53F7\uFF0C\u5982 3.4.3 \u624D\u80FD\u6B63\u5E38\u7684\u5F15\u5165\u6846\u67B6\u3002</p></blockquote><p>\u66F4\u591A MP \u6846\u67B6\u7684\u4ECB\u7ECD\u8BF7\u79FB\u6B65\u5B83\u7684\u5B98\u7F51\uFF1Ahttps://baomidou.com/guide/</p><h3 id="_1-\u63A7\u5236\u5668\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_1-\u63A7\u5236\u5668\u5B9E\u73B0" aria-hidden="true">#</a> \u2460 \u63A7\u5236\u5668\u5B9E\u73B0</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import com.example.demo.model.User;
import com.example.demo.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(&quot;/u&quot;)
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    /**

     * \u6279\u91CF\u63D2\u5165\uFF08\u81EA\u5B9A\u4E49\uFF09

     */
    @RequestMapping(&quot;/mysavebatch&quot;)
    public boolean mySaveBatch(){
        List&lt;User&gt; list = new ArrayList&lt;&gt;();
        // \u5F85\u6DFB\u52A0\uFF08\u7528\u6237\uFF09\u6570\u636E
        for (int i = 0; i &lt; 1000; i++) {
            User user = new User();
            user.setName(&quot;test:&quot;+i);
            user.setPassword(&quot;123456&quot;);
            list.add(user);
        }
        return userService.saveBatchCustom(list);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-\u4E1A\u52A1\u903B\u8F91\u5C42\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_2-\u4E1A\u52A1\u903B\u8F91\u5C42\u5B9E\u73B0" aria-hidden="true">#</a> \u2461 \u4E1A\u52A1\u903B\u8F91\u5C42\u5B9E\u73B0</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.mapper.UserMapper;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserServiceImpl extends ServiceImpl&lt;UserMapper,User&gt;

        implements UserService {

    @Autowired
    private UserMapper userMapper;

    public boolean saveBatchCustom(List&lt;User&gt; list){
        return userMapper.saveBatchCustom(list);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-\u6570\u636E\u6301\u4E45\u5C42\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_3-\u6570\u636E\u6301\u4E45\u5C42\u5B9E\u73B0" aria-hidden="true">#</a> \u2462 \u6570\u636E\u6301\u4E45\u5C42\u5B9E\u73B0</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.model.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper extends BaseMapper&lt;User&gt;{

    boolean saveBatchCustom(List&lt;User&gt; list);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7ECF\u8FC7\u4EE5\u4E0A\u4EE3\u7801\u5B9E\u73B0\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u4F7F\u7528 MP \u6765\u5B9E\u73B0\u6570\u636E\u7684\u6279\u91CF\u63D2\u5165\u529F\u80FD\u4E86\uFF0C\u4F46\u672C\u7BC7\u9664\u4E86\u5177\u4F53\u7684\u5B9E\u73B0\u4EE3\u7801\u4E4B\u5916\uFF0C\u6211\u4EEC\u8FD8\u8981\u77E5\u9053\u6BCF\u79CD\u65B9\u6CD5\u7684\u6267\u884C\u6548\u7387\uFF0C\u6240\u4EE5\u63A5\u4E0B\u6765\u6211\u4EEC\u6765\u7F16\u5199 MP \u7684\u6D4B\u8BD5\u4EE3\u7801\u3002</p><h3 id="mp-\u6027\u80FD\u6D4B\u8BD5" tabindex="-1"><a class="header-anchor" href="#mp-\u6027\u80FD\u6D4B\u8BD5" aria-hidden="true">#</a> MP \u6027\u80FD\u6D4B\u8BD5</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import com.example.demo.model.User;
import com.example.demo.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class UserControllerTest {

    // \u6700\u5927\u5FAA\u73AF\u6B21\u6570
    private static final int MAXCOUNT = 100000;

    @Autowired
    private UserServiceImpl userService;

    /**

     * MP \u6279\u91CF\u63D2\u5165

     */
    @Test
    void saveBatch() {
        long stime = System.currentTimeMillis(); // \u7EDF\u8BA1\u5F00\u59CB\u65F6\u95F4
        List&lt;User&gt; list = new ArrayList&lt;&gt;();
        for (int i = 0; i &lt; MAXCOUNT; i++) {
            User user = new User();
            user.setName(&quot;test:&quot; + i);
            user.setPassword(&quot;123456&quot;);
            list.add(user);
        }
        // MP \u6279\u91CF\u63D2\u5165
        userService.saveBatch(list);
        long etime = System.currentTimeMillis(); // \u7EDF\u8BA1\u7ED3\u675F\u65F6\u95F4
        System.out.println(&quot;\u6267\u884C\u65F6\u95F4\uFF1A&quot; + (etime - stime));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4EE5\u4E0A\u7A0B\u5E8F\u7684\u6267\u884C\u603B\u5171\u82B1\u8D39\u4E86 6088 \u6BEB\u79D2\uFF0C\u5982\u4E0B\u56FE\u6240\u793A\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jiantmybatisplcrdzffwtsjsyforeachjxm-4a267c42-a363-4dd0-8397-385e58bfc0ee.jpg" alt=""></p><p>\u4ECE\u4E0A\u8FF0\u7ED3\u679C\u53EF\u77E5\uFF0C\u4F7F\u7528 MP \u7684\u6279\u91CF\u63D2\u5165\u529F\u80FD\uFF08\u63D2\u5165\u6570\u636E 10W \u6761\uFF09\uFF0C\u5B83\u7684\u6027\u80FD\u6BD4\u5FAA\u73AF\u5355\u6B21\u63D2\u5165\u7684\u6027\u80FD\u63D0\u5347\u4E86 14.5 \u500D\u3002</p><h3 id="mp-\u6E90\u7801\u5206\u6790" tabindex="-1"><a class="header-anchor" href="#mp-\u6E90\u7801\u5206\u6790" aria-hidden="true">#</a> MP \u6E90\u7801\u5206\u6790</h3><p>\u4ECE MP \u548C\u5FAA\u73AF\u5355\u6B21\u63D2\u5165\u7684\u6267\u884C\u65F6\u95F4\u6211\u4EEC\u53EF\u4EE5\u770B\u51FA\uFF0C\u4F7F\u7528 MP \u5E76\u4E0D\u662F\u50CF\u6709\u4E9B\u670B\u53CB\u8BA4\u4E3A\u7684\u90A3\u6837\uFF0C\u8FD8\u662F\u5FAA\u73AF\u5355\u6B21\u6267\u884C\u7684\uFF0C\u4E3A\u4E86\u66F4\u6E05\u695A\u7684\u8BF4\u660E\u6B64\u95EE\u9898\uFF0C\u6211\u4EEC\u67E5\u770B\u4E86 MP \u7684\u6E90\u7801\u3002</p><p>MP \u7684\u6838\u5FC3\u5B9E\u73B0\u4EE3\u7801\u662F saveBatch \u65B9\u6CD5\uFF0C\u6B64\u65B9\u6CD5\u7684\u6E90\u7801\u5982\u4E0B\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jiantmybatisplcrdzffwtsjsyforeachjxm-d3373660-274a-473e-b958-07731fdf9fa5.jpg" alt=""></p><p>\u6211\u4EEC\u7EE7\u7EED\u8DDF\u8FDB saveBatch \u7684\u91CD\u8F7D\u65B9\u6CD5\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jiantmybatisplcrdzffwtsjsyforeachjxm-a8427c2f-7dca-4b15-be72-14c2d9c22563.jpg" alt=""></p><p>\u4ECE\u4E0A\u8FF0\u6E90\u7801\u53EF\u4EE5\u770B\u51FA\uFF0CMP \u662F\u5C06\u8981\u6267\u884C\u7684\u6570\u636E\u5206\u6210 N \u4EFD\uFF0C\u6BCF\u4EFD 1000 \u6761\uFF0C\u6BCF\u6EE1 1000 \u6761\u5C31\u4F1A\u6267\u884C\u4E00\u6B21\u6279\u91CF\u63D2\u5165\uFF0C\u6240\u4EE5\u5B83\u7684\u6027\u80FD\u8981\u6BD4\u5FAA\u73AF\u5355\u6B21\u63D2\u5165\u7684\u6027\u80FD\u9AD8\u5F88\u591A\u3002</p><p>\u90A3\u4E3A\u4EC0\u4E48\u8981\u5206\u6279\u6267\u884C\uFF0C\u800C\u4E0D\u662F\u4E00\u6B21\u6267\u884C\uFF1F\u522B\u7740\u6025\uFF0C\u5F53\u6211\u4EEC\u770B\u4E86\u7B2C 3 \u79CD\u5B9E\u73B0\u65B9\u6CD5\u4E4B\u540E\u6211\u4EEC\u5C31\u660E\u767D\u4E86\u3002</p><h2 id="_3-\u539F\u751F\u6279\u91CF\u63D2\u5165" tabindex="-1"><a class="header-anchor" href="#_3-\u539F\u751F\u6279\u91CF\u63D2\u5165" aria-hidden="true">#</a> 3.\u539F\u751F\u6279\u91CF\u63D2\u5165</h2><p>\u539F\u751F\u6279\u91CF\u63D2\u5165\u65B9\u6CD5\u662F\u4F9D\u9760 MyBatis \u4E2D\u7684 foreach \u6807\u7B7E\uFF0C\u5C06\u6570\u636E\u62FC\u63A5\u6210\u4E00\u6761\u539F\u751F\u7684 insert \u8BED\u53E5\u4E00\u6B21\u6027\u6267\u884C\u7684\uFF0C\u6838\u5FC3\u5B9E\u73B0\u4EE3\u7801\u5982\u4E0B\u3002</p><h3 id="_1-\u4E1A\u52A1\u903B\u8F91\u5C42\u6269\u5C55" tabindex="-1"><a class="header-anchor" href="#_1-\u4E1A\u52A1\u903B\u8F91\u5C42\u6269\u5C55" aria-hidden="true">#</a> \u2460 \u4E1A\u52A1\u903B\u8F91\u5C42\u6269\u5C55</h3><p>\u5728 UserServiceImpl \u6DFB\u52A0 saveBatchByNative \u65B9\u6CD5\uFF0C\u5B9E\u73B0\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.demo.mapper.UserMapper;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl extends ServiceImpl&lt;UserMapper, User&gt;

        implements UserService {

    @Autowired
    private UserMapper userMapper;

    public boolean saveBatchByNative(List&lt;User&gt; list) {
        return userMapper.saveBatchByNative(list);
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-\u6570\u636E\u6301\u4E45\u5C42\u6269\u5C55" tabindex="-1"><a class="header-anchor" href="#_2-\u6570\u636E\u6301\u4E45\u5C42\u6269\u5C55" aria-hidden="true">#</a> \u2461 \u6570\u636E\u6301\u4E45\u5C42\u6269\u5C55</h3><p>\u5728 UserMapper \u6DFB\u52A0 saveBatchByNative \u65B9\u6CD5\uFF0C\u5B9E\u73B0\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.model.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper extends BaseMapper&lt;User&gt; {

    boolean saveBatchByNative(List&lt;User&gt; list);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-\u6DFB\u52A0-usermapper-xml" tabindex="-1"><a class="header-anchor" href="#_3-\u6DFB\u52A0-usermapper-xml" aria-hidden="true">#</a> \u2462 \u6DFB\u52A0 UserMapper.xml</h3><p>\u521B\u5EFA UserMapper.xml \u6587\u4EF6\uFF0C\u4F7F\u7528 foreach \u6807\u7B7E\u62FC\u63A5 SQL\uFF0C\u5177\u4F53\u5B9E\u73B0\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;!DOCTYPE mapper PUBLIC &quot;-//mybatis.org//DTD Mapper 3.0//EN&quot; &quot;http://mybatis.org/dtd/mybatis-3-mapper.dtd&quot;&gt;
&lt;mapper namespace=&quot;com.example.demo.mapper.UserMapper&quot;&gt;
    &lt;insert id=&quot;saveBatchByNative&quot;&gt;
        INSERT INTO \`USER\`(\`NAME\`,\`PASSWORD\`) VALUES
        &lt;foreach collection=&quot;list&quot; separator=&quot;,&quot; item=&quot;item&quot;&gt;
            (#{item.name},#{item.password})
        &lt;/foreach&gt;
    &lt;/insert&gt;

&lt;/mapper&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7ECF\u8FC7\u4EE5\u4E0A\u6B65\u9AA4\uFF0C\u6211\u4EEC\u539F\u751F\u7684\u6279\u91CF\u63D2\u5165\u529F\u80FD\u5C31\u5B9E\u73B0\u7684\u5DEE\u4E0D\u591A\u4E86\uFF0C\u63A5\u4E0B\u6765\u6211\u4EEC\u4F7F\u7528\u5355\u5143\u6D4B\u8BD5\u6765\u67E5\u770B\u4E00\u4E0B\u6B64\u65B9\u6CD5\u7684\u6267\u884C\u6548\u7387\u3002</p><h3 id="\u539F\u751F\u6279\u91CF\u63D2\u5165\u6027\u80FD\u6D4B\u8BD5" tabindex="-1"><a class="header-anchor" href="#\u539F\u751F\u6279\u91CF\u63D2\u5165\u6027\u80FD\u6D4B\u8BD5" aria-hidden="true">#</a> \u539F\u751F\u6279\u91CF\u63D2\u5165\u6027\u80FD\u6D4B\u8BD5</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import com.example.demo.model.User;
import com.example.demo.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class UserControllerTest {

    // \u6700\u5927\u5FAA\u73AF\u6B21\u6570
    private static final int MAXCOUNT = 100000;

    @Autowired
    private UserServiceImpl userService;
    
    /**

     * \u539F\u751F\u81EA\u5DF1\u62FC\u63A5 SQL\uFF0C\u6279\u91CF\u63D2\u5165

     */
    @Test
    void saveBatchByNative() {
        long stime = System.currentTimeMillis(); // \u7EDF\u8BA1\u5F00\u59CB\u65F6\u95F4
        List&lt;User&gt; list = new ArrayList&lt;&gt;();
        for (int i = 0; i &lt; MAXCOUNT; i++) {
            User user = new User();
            user.setName(&quot;test:&quot; + i);
            user.setPassword(&quot;123456&quot;);
            list.add(user);
        }
        // \u6279\u91CF\u63D2\u5165
        userService.saveBatchByNative(list);
        long etime = System.currentTimeMillis(); // \u7EDF\u8BA1\u7ED3\u675F\u65F6\u95F4
        System.out.println(&quot;\u6267\u884C\u65F6\u95F4\uFF1A&quot; + (etime - stime));
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u800C\uFF0C\u5F53\u6211\u4EEC\u8FD0\u884C\u7A0B\u5E8F\u65F6\u5374\u53D1\u751F\u4E86\u4EE5\u4E0B\u60C5\u51B5\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jiantmybatisplcrdzffwtsjsyforeachjxm-a9007c24-5db5-46fc-9d64-fb721184817b.jpg" alt=""></p><p>\u7EB3\u5C3C\uFF1F\u7A0B\u5E8F\u7684\u6267\u884C\u7ADF\u7136\u62A5\u9519\u4E86\u3002</p><h3 id="\u7F3A\u70B9\u5206\u6790" tabindex="-1"><a class="header-anchor" href="#\u7F3A\u70B9\u5206\u6790" aria-hidden="true">#</a> \u7F3A\u70B9\u5206\u6790</h3><p>\u4ECE\u4E0A\u8FF0\u62A5\u9519\u4FE1\u606F\u53EF\u4EE5\u770B\u51FA\uFF0C\u5F53\u6211\u4EEC\u4F7F\u7528\u539F\u751F\u65B9\u6CD5\u5C06 10W \u6761\u6570\u636E\u62FC\u63A5\u6210\u4E00\u4E2A SQL \u6267\u884C\u65F6\uFF0C\u7531\u4E8E\u62FC\u63A5\u7684 SQL \u8FC7\u5927\uFF084.56M\uFF09\u4ECE\u800C\u5BFC\u81F4\u7A0B\u5E8F\u6267\u884C\u62A5\u9519\uFF0C\u56E0\u4E3A\u9ED8\u8BA4\u60C5\u51B5\u4E0B MySQL \u53EF\u4EE5\u6267\u884C\u7684\u6700\u5927 SQL\uFF08\u5927\u5C0F\uFF09\u4E3A 4M\uFF0C\u6240\u4EE5\u7A0B\u5E8F\u5C31\u62A5\u9519\u4E86\u3002</p><p>\u8FD9\u5C31\u662F\u539F\u751F\u6279\u91CF\u63D2\u5165\u65B9\u6CD5\u7684\u7F3A\u70B9\uFF0C\u4E5F\u662F\u4E3A\u4EC0\u4E48 MP \u9700\u8981\u5206\u6279\u6267\u884C\u7684\u539F\u56E0\uFF0C\u5C31\u662F\u4E3A\u4E86\u9632\u6B62\u7A0B\u5E8F\u5728\u6267\u884C\u65F6\uFF0C\u56E0\u4E3A\u89E6\u53D1\u4E86\u6570\u636E\u5E93\u7684\u6700\u5927\u6267\u884C SQL \u800C\u5BFC\u81F4\u7A0B\u5E8F\u6267\u884C\u62A5\u9519\u3002</p><h4 id="\u89E3\u51B3\u65B9\u6848" tabindex="-1"><a class="header-anchor" href="#\u89E3\u51B3\u65B9\u6848" aria-hidden="true">#</a> \u89E3\u51B3\u65B9\u6848</h4><p>\u5F53\u7136\u6211\u4EEC\u4E5F\u53EF\u4EE5\u901A\u8FC7\u8BBE\u7F6E MySQL \u7684\u6700\u5927\u6267\u884C SQL \u6765\u89E3\u51B3\u62A5\u9519\u7684\u95EE\u9898\uFF0C\u8BBE\u7F6E\u547D\u4EE4\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>-- \u8BBE\u7F6E\u6700\u5927\u6267\u884C SQL \u4E3A 10M
set global max_allowed_packet=10*1024*1024;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u4E0B\u56FE\u6240\u793A\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jiantmybatisplcrdzffwtsjsyforeachjxm-c2ce0dc0-3791-4d7c-8f05-c96246700438.jpg" alt=""></p><blockquote><p>\u6CE8\u610F\uFF1A\u4EE5\u4E0A\u547D\u4EE4\u9700\u8981\u5728 MySQL \u8FDE\u63A5\u7684\u5BA2\u6237\u7AEF\u4E2D\u6267\u884C\u3002</p></blockquote><p>\u4F46\u4EE5\u4E0A\u89E3\u51B3\u65B9\u6848\u4ECD\u662F\u6CBB\u6807\u4E0D\u6CBB\u672C\uFF0C\u56E0\u4E3A\u6211\u4EEC\u65E0\u6CD5\u9884\u6D4B\u7A0B\u5E8F\u4E2D\u6700\u5927\u7684\u6267\u884C SQL \u5230\u5E95\u6709\u591A\u5927\uFF0C\u90A3\u4E48\u6700\u666E\u4E16\u7684\u65B9\u6CD5\u5C31\u662F\u5206\u914D\u6267\u884C\u6279\u91CF\u63D2\u5165\u7684\u65B9\u6CD5\u4E86\uFF08\u4E5F\u5C31\u662F\u50CF MP \u5B9E\u73B0\u7684\u90A3\u6837\uFF09\u3002</p><p>\u5F53\u6211\u4EEC\u5C06 MySQL \u7684\u6700\u5927\u6267\u884C SQL \u8BBE\u7F6E\u4E3A 10M \u4E4B\u540E\uFF0C\u8FD0\u884C\u4EE5\u4E0A\u5355\u5143\u6D4B\u8BD5\u4EE3\u7801\uFF0C\u6267\u884C\u7684\u7ED3\u679C\u5982\u4E0B\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jiantmybatisplcrdzffwtsjsyforeachjxm-a701da82-ba81-4715-9c24-4b9aaa6594ec.jpg" alt=""></p><h2 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h2><p>\u672C\u6587\u6211\u4EEC\u4ECB\u7ECD\u4E86 MyBatis \u6279\u91CF\u63D2\u5165\u7684 3 \u79CD\u65B9\u6CD5\uFF0C\u5176\u4E2D\u5FAA\u73AF\u5355\u6B21\u63D2\u5165\u7684\u6027\u80FD\u6700\u4F4E\uFF0C\u4E5F\u662F\u6700\u4E0D\u53EF\u53D6\u7684\uFF1B\u4F7F\u7528 MyBatis \u62FC\u63A5\u539F\u751F SQL \u4E00\u6B21\u6027\u63D2\u5165\u7684\u65B9\u6CD5\u6027\u80FD\u6700\u9AD8\uFF0C\u4F46\u6B64\u65B9\u6CD5\u53EF\u80FD\u4F1A\u5BFC\u81F4\u7A0B\u5E8F\u6267\u884C\u62A5\u9519\uFF08\u89E6\u53D1\u4E86\u6570\u636E\u5E93\u6700\u5927\u6267\u884C SQL \u5927\u5C0F\u7684\u9650\u5236\uFF09\uFF0C\u6240\u4EE5\u7EFC\u5408\u4EE5\u4E0A\u60C5\u51B5\uFF0C\u53EF\u4EE5\u8003\u8651\u4F7F\u7528 MP \u7684\u6279\u91CF\u63D2\u5165\u529F\u80FD\u3002</p><hr><p><strong>\u5FAE\u4FE18.0\u5C06\u597D\u53CB\u653E\u5F00\u5230\u4E86\u4E00\u4E07\uFF0C\u5C0F\u4F19\u4F34\u53EF\u4EE5\u52A0\u6211\u5927\u53F7\u4E86\uFF0C\u5148\u5230\u5148\u5F97\uFF0C\u518D\u6EE1\u5C31\u771F\u6CA1\u4E86</strong></p><p><strong>\u626B\u63CF\u4E0B\u65B9\u4E8C\u7EF4\u7801\u5373\u53EF\u52A0\u6211\u5FAE\u4FE1\u5566\uFF0C<code>2022\uFF0C\u62B1\u56E2\u53D6\u6696\uFF0C\u4E00\u8D77\u725B\u903C\u3002</code></strong></p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jiantmybatisplcrdzffwtsjsyforeachjxm-700e6458-ee4b-469c-ba22-063b303d6b5e.jpg" alt=""></p><h2 id="\u63A8\u8350\u9605\u8BFB" tabindex="-1"><a class="header-anchor" href="#\u63A8\u8350\u9605\u8BFB" aria-hidden="true">#</a> \u63A8\u8350\u9605\u8BFB</h2>`,77),m={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502973&idx=1&sn=171e2cb9b0c3f6f244aa5727c36ba796&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},o=i("4 \u79CD\u5FAE\u670D\u52A1\u914D\u7F6E\u4E2D\u5FC3\u6280\u672F\u9009\u578B\uFF0Cyyds\uFF01"),u={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502966&idx=1&sn=43490aa0563c97e1647112e671499697&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},b=i("\u653E\u5F03FastDFS\uFF01SpringBoot\u6574\u5408MinIO\u5B9E\u73B0\u5206\u5E03\u5F0F\u6587\u4EF6\u670D\u52A1\uFF0C\u771F\u9999\uFF01"),p={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502905&idx=1&sn=fbe18f29585f57fac3a9b2450a5a2d66&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},h=i("\u770B\u4E86\u6211\u5E38\u7528\u7684IDEA\u63D2\u4EF6\uFF0C\u540C\u4E8B\u4E5F\u5F00\u59CB\u6084\u6084\u5B89\u88C5\u4E86..."),g={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502786&idx=1&sn=331e34d3a03e94306c8637c65e86aae0&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},f=i("\u6280\u672F\u603B\u76D1\u4EB2\u81EA\u4E0A\u9635\uFF0C\u624B\u64B8\u4E86\u4E2A\u7535\u5546\u53EF\u89C6\u5316\u9762\u677F\uFF0C\u4EA7\u54C1\u7ECF\u7406\u60CA\u5446\u4E86\u3002\u3002\u3002"),x={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502723&idx=1&sn=82a1ee739178f5abe69deed34e758951&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},_=i("\u6362\u6389Typora\uFF01\u8FD9\u6B3E\u652F\u6301\u4E91\u7AEF\u540C\u6B65\u7684\u5F00\u6E90\u7B14\u8BB0\u5E94\u7528\uFF0C\u592A\u70AB\u9177\u4E86\uFF01"),M={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502551&idx=1&sn=5017e6bf5b9aaabebcad8fb9f3fc7d89&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},S=i("\u8FD8\u5728\u624B\u5199SQL\u5B9E\u73B0\uFF1F\u8BD5\u8BD5MyBatis-Plus\u540C\u6B3EIDEA\u63D2\u4EF6\u5427\uFF01"),U={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247499376&idx=1&sn=3ed28795cdd35fbaa3506e74a56703b0&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},j=i("\u91CD\u78C5\u66F4\u65B0\uFF01Mall\u5B9E\u6218\u6559\u7A0B\u5168\u9762\u5347\u7EA7\uFF0C\u77AC\u95F4\u9AD8\u5927\u4E0A\u4E86\uFF01"),y={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247486684&idx=1&sn=807fd808adac8019eb2095ba088efe54&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},w=i("40K+Star\uFF01Mall\u7535\u5546\u5B9E\u6218\u9879\u76EE\u5F00\u6E90\u56DE\u5FC6\u5F55\uFF01"),T=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-jiantmybatisplcrdzffwtsjsyforeachjxm-f56912cd-115c-4f76-88e2-9cb2b4386ce5.jpg",alt:""})],-1),N=i("\u53C2\u8003\u94FE\u63A5\uFF1A"),q={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502982&idx=1&sn=db9beac3eedacc587392d7b1800c752b&chksm=fc2c708ecb5bf99803a64716c6ccf77fcf116697cce40bbbfb993f9ee05eb47efeb72af359fd#rd",target:"_blank",rel:"noopener noreferrer"},L=i("https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247502982&idx=1&sn=db9beac3eedacc587392d7b1800c752b&chksm=fc2c708ecb5bf99803a64716c6ccf77fcf116697cce40bbbfb993f9ee05eb47efeb72af359fd#rd"),E=i("\uFF0C\u51FA\u5904\uFF1Amacrozheng\uFF0C\u6574\u7406\uFF1A\u6C89\u9ED8\u738B\u4E8C");function A(B,I){const n=a("ExternalLinkIcon");return d(),l("div",null,[v,e("ul",null,[e("li",null,[e("a",m,[o,s(n)])]),e("li",null,[e("a",u,[b,s(n)])]),e("li",null,[e("a",p,[h,s(n)])]),e("li",null,[e("a",g,[f,s(n)])]),e("li",null,[e("a",x,[_,s(n)])]),e("li",null,[e("a",M,[S,s(n)])]),e("li",null,[e("a",U,[j,s(n)])]),e("li",null,[e("a",y,[w,s(n)])])]),T,e("blockquote",null,[e("p",null,[N,e("a",q,[L,s(n)]),E])])])}var k=r(c,[["render",A],["__file","jiantmybatisplcrdzffwtsjsyforeachjxm.html.vue"]]);export{k as default};
