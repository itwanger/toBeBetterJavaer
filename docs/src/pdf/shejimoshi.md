---
title: 👏下载→重学 Java 设计模式 PDF
shortTitle: 👏下载→重学Java设计模式
category:
  - PDF
tag:
  - PDF
description: 重学 Java 设计模式 PDF 下载
head:
  - - meta
    - name: keywords
      content: java设计模式,重学 Java 设计模式,重学 Java 设计模式 PDF,java设计模式下载
---

时不时就有读者私信我，“二哥，**我的代码写得很烂，该怎么办呀**？”

写代码确实是门手艺活，这是我们程序员不得不承认的一个事实，毕竟要用手指头来敲啊！不是手艺活是啥（笑）

简单来分析一下代码写得烂的原因哈。其一，可能是刚入门，代码写得少，如果我们满打满算只写过一两千行代码，是不可能写出多优雅的代码的。其二，可能我们不懂设计模式，设计模式是软件设计中常见问题的典型解决方案，它们就像能根据需求进行调整的预制蓝图， 可用于解决代码中反复出现的设计问题，如果不懂设计模式的话，遇到这些问题就只能抓瞎了。

这么说吧，**设计模式玩得炉火纯青，写出的代码就更优雅，阅读起来也会更加舒服，可维护性、可扩展性就更强**。

说到这，我确信大家已经了解设计模式的重要性了！**这里给大家推荐一份全网阅读超过 500 万次的设计模式 PDF，持续霸榜 GitHub Trending。**

微信搜索「**沉默王二**」发送「**10**」关键字领取即可领取，也可以扫描下面的二维码关注后发送「**10**」关键字。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

再来推荐一个网站：Refactoring Guru。  

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-shejmsnb-c582a192-0373-45b2-99de-69e688d31baa.jpg)

网址如下所示：

> [https://refactoring.guru](https://refactoring.guru)

**这虽然是一个国外的网站，却神奇的实现了中文化国际化，爱了爱了，无情地爱了**。据作者说，他建站的初衷就是为了帮助我们程序员，快速地掌握设计模式，但把网站做到这种用心的程度，我只能情不自禁地点赞了！

来看一下设计模式的目录吧（下图中只展现了创建型模式和结构型模式中的一部分，还有行为模式）：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-shejmsnb-e28938e4-f117-4afe-966b-e44d0ec022a0.jpg)

每个模式都会对应一篇图文并茂的文章，阅读起来就好像在读绘本一样，生动有趣，令人印象深刻，学起来就没有半点枯燥的感觉。来看一下工厂方法模式的一部分内容截图，这图片的质量，确实高啊，不服不行！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-shejmsnb-6ab000de-34e7-44f2-9b06-b9d92cc0c043.jpg)

配套的代码示例也非常完整，来看一下 Java 版的：

```
public class WindowsButton implements Button {  

    JPanel panel = new JPanel();  

    JFrame frame = new JFrame();  

    JButton button;  

  

    public void render() {  

        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);  

        JLabel label = new JLabel("Hello World!");  

        label.setOpaque(true);  

        label.setBackground(new Color(235, 233, 126));  

        label.setFont(new Font("Dialog", Font.BOLD, 44));  

        label.setHorizontalAlignment(SwingConstants.CENTER);  

        panel.setLayout(new FlowLayout(FlowLayout.CENTER));  

        frame.getContentPane().add(panel);  

        panel.add(label);  

        onClick();  

        panel.add(button);  

  

        frame.setSize(320, 200);  

        frame.setVisible(true);  

        onClick();  

    }  

  

    public void onClick() {  

        button = new JButton("Exit");  

        button.addActionListener(new ActionListener() {  

            public void actionPerformed(ActionEvent e) {  

                frame.setVisible(false);  

                System.exit(0);  

            }  

        });  

    }  

}  

```

当然了，代码示例不只有 Java 版的，还有 C#、C++、Python、Go 等 8 种常见的编程语言。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-shejmsnb-3a219b1c-be2b-4586-b7d3-5c0ea23975b5.jpg)

这种**图文并茂 + 代码示例**的学习方式，极大地加深了我们程序员对知识的吸收。还有什么赞美的词语？学富五车的我竟然有点词穷了。总之，如果大家也想学好设计模式，赶快点吧！

离线版的 PDF 我也贡献出来了，截取一部分内容供大家预览下。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-shejmsnb-92309f22-ac2d-4cef-81cb-9f83bf9380d6.jpg)

里面有不少图文参照了 Refactoring Guru 这个网站，但也加入了作者自己的思考和理解，读起来也更接地气一点。按照作者说的：

> 很高兴你能拿到这本书，如果你能坚持看完并按照书中的例⼦进行实践，那么在编程开发的世界里，就⼜多了了⼀个可以写出良好代码的⼈，同时也为架构师培养储备了了⼀个⼈才。

如果大家对这份 PDF 感兴趣的话，可以**微信搜索「**沉默王二**」发送**关键字「**设计模式**」获取下载链接：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

也可以扫描上面的二维码关注后发送 「**10** 」获取下载链接  

**一起成为牛逼的程序员！**