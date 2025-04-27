---
title: 图解 Transformer，一文吃透工作原理
shortTitle: 图解 Transformer，一文吃透工作原理
description: 本文深入浅出地解析了 Transformer 模型，一种革命性的深度学习架构，其自注意力机制和多头注意力机制在机器翻译等任务中展现出卓越性能。文章通过动画和图表，详细介绍了 Transformer 的结构和工作原理，助你全面理解其核心技术。
author: Jay Alammar
category:
  - 微信公众号
---


最近发现，大家在大厂面试的时候，会被问到很多AI 方面的基础知识，所以二哥这里也收录了一些经典的内容到知识库中，方便大家做个参考。尤其是准备和 AI 相关的面试的时候，可以利用语雀的 AI 提炼总结一些口述内容。

Attention —— 一种在现代深度学习模型中广泛使用的方法。Attention 的引入显著提升了神经机器翻译系统的性能。在这篇文章中，我们将进一步探讨 Transformer —— 一种以 Attention 为核心、加快训练速度的模型架构。Transformer 在某些任务中甚至超越了 Google Neural Machine Translation 模型。而 Transformer 最大的优势在于其结构非常适合并行化计算。事实上，Google Cloud 官方就推荐使用 Transformer 作为参考模型，充分发挥 Cloud TPU 的性能。

  

因此，接下来我们会一步步拆解这个模型，看看它是如何运作的。

  

Transformer 最初是在论文《Attention is All You Need》中提出的。它在 TensorFlow 中的实现可以通过 Tensor2Tensor 工具包获取，而哈佛大学 NLP 小组则基于该论文开发了 PyTorch 注解教程。在这篇文章中，我们会尝试对原理进行适当简化，逐步引入相关概念，帮助没有专业背景的读者更容易理解。

  

我们制作了一门免费课程，配有动画讲解，对本文的内容进行了更新与扩展：

  

![](https://mmbiz.qpic.cn/mmbiz_jpg/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HkP8HI7R9Mbf8olqUN37me4nHoUk5MR4yGQ6cShfR6on9oAC1n96moA/640?wx_fmt=jpeg&from=appmsg)

  

## 01、整体视角

  

我们先从高层角度看一下这个模型，把它当作一个黑盒来看。在机器翻译的应用中，它接收一段源语言的句子，输出目标语言的翻译结果。

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HSflWYC8EwhOVW4z7vPyAbxonGMMflC6QT0OlC7mShyGG4vpiaZtbsYw/640?from=appmsg)

如果我们“打开”这个像擎天柱一样强大的结构，会看到里面主要包括三个部分：一个编码器模块、一个解码器模块，以及它们之间的连接。

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HrtdOOnNSyomnXWGeKicLN2J8ppjTzqK0GyuibJF6OYVK4JTAianUxXzqA/640?from=appmsg)

编码器模块由多个编码器堆叠而成（论文中是堆叠了六层编码器——这个数字并没有什么神奇之处，完全可以尝试其他层数的组合）。解码器模块也是相同数量的解码器堆叠而成。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HfiaE7ib9flDuKyzBeeiciaiaa6fxyTS7KOU5uTKHSZUO60EcTpAsibMibmJIA/640?from=appmsg)

  

每个编码器结构都完全相同（但它们之间并不共享参数）。每个编码器又被细分为两个子层：

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HnIl9I6gRCeWVYACUAIF9CIs5jJ2vWzpMlTrIp7EmKtbEQpic3wFNI2w/640?from=appmsg)

编码器的输入首先会流经一个自注意力层（self-attention），这个子层的作用是，在编码当前词的时候，同时参考输入句子中的其他词，从而获得更丰富的上下文信息。我们稍后会详细介绍 self-attention 的工作原理。

  

self-attention 层的输出接着会传递给一个前馈神经网络（feed-forward neural network）。这个前馈网络在每一个位置上都是完全相同的，并且是独立应用的，也就是说每个位置单独计算，不共享信息。

  

解码器中也包含了这两种层（自注意力层和前馈网络层），但在它们之间还插入了一个额外的注意力层，用来帮助解码器专注于输入句子中与当前生成词相关的部分（这和传统 seq2seq 模型中的 attention 机制非常相似）。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6H7M7y35AQ4ibNkjEA6LBT6HQ5QA2PGsrgnWsopVyP2JbzNrSPibue6n8w/640?from=appmsg)

  

## 02、引入张量的视角

现在我们已经了解了模型的主要组成部分，接下来我们开始关注向量（或张量）是如何在这些组件之间流动的，从而把一个训练好的模型输入，转化为输出。

  

就像大多数 NLP 应用中一样，首先我们要做的是将每个输入词转换为一个向量，这一步通常通过嵌入算法（embedding）完成。

  

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HtOiaHdNiburct0fBBP2daZdK6ZtzJiaLVFrciafdzqg8IzyCOldmqOsbgA/640?from=appmsg)

  

每个词都会被嵌入成一个长度为 512 的向量。我们可以把这些向量用简化的方块来表示。

  词嵌入只发生在最底层的编码器中。所有编码器的一个共同抽象是：它们接收的是一个由若干长度为 512 的向量组成的列表——在底层编码器中，这些向量是词嵌入；而在其他编码器中，这些向量则是下方编码器的输出。这个列表的长度是一个超参数，通常设定为训练数据中最长句子的长度。

  

在我们完成对输入序列中每个词的嵌入之后，它们就会依次通过编码器中的两个子层进行处理。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HOdxlsz0lNWUWp4gHSQZ2hZSicgSmmfXVGVBoBj7t2Y5iaurE5VkScwgg/640?from=appmsg)

  

这时候我们开始看到 Transformer 的一个关键特性：每个位置上的词向量会沿着自己的路径在编码器中流动。在 self-attention 层中，这些路径之间是存在依赖关系的；但在后面的前馈层中，各条路径之间则没有依赖，因此这些路径可以并行计算，提高效率。

  

接下来我们会把例子换成一个更短的句子，来看看编码器中每个子层是如何处理的。

  

## 03、进入编码阶段

  

就像前面提到的，编码器的输入是一个向量列表。编码器的处理流程是：先把这些向量传入 self-attention 层，然后传入前馈神经网络，最后将处理后的结果输出，交给上方的下一个编码器继续处理。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HSgDsvkwspUiaaAW12Hwnmp1dwmZdQfvAvlNOd7TMLGz4quWy2N5503Q/640?from=appmsg)

每个位置上的词向量都会先经过一次 self-attention 处理，然后再分别通过一个前馈神经网络——注意，这个网络在所有位置上都是相同的，但每个向量是独立地通过它的。

  

## 04、高层次理解

  

别被我频繁提起 “self-attention” 这个词吓到了，好像这是大家都应该熟悉的概念。实际上，在我读《Attention is All You Need》这篇论文之前，我自己也从来没接触过这个概念。现在我们来简要提炼一下它的工作原理。

  

假设我们要翻译下面这个输入句子：

  

“The animal didn't cross the street because it was too tired.”

（这只动物没有过马路，因为它太累了。）

  

这个句子中的 “it” 指代的是谁？是街道（street）还是动物（animal）？对人类来说这是个很简单的问题，但对于算法来说却没那么容易。

  

当模型处理到 “it” 这个词时，self-attention 机制能帮助它将 “it” 与 “animal” 建立起关联。

  

当模型逐个处理输入序列中的每个词（也就是每个位置）时，self-attention 允许模型去查看输入序列中其他位置的信息，从中寻找对当前词的更好编码所需的“线索”。

  

如果你熟悉 RNN，可以联想到它是通过维护一个 hidden state（隐藏状态）来融合之前处理过的词向量与当前词的表示。而在 Transformer 中，self-attention 就是它用来实现对其他相关词进行“理解”的方式，它能将这些信息融入到当前正在处理的词中。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6Hnia84r04whr1tRMZjWKaUVjCicpceKYouMozXyfrQMGV6LRmbD36xseQ/640?from=appmsg)

当我们在第 5 层编码器（也就是整个编码器堆栈的最顶层）中对单词 “it” 进行编码时，self-attention 机制会将部分注意力集中在 “The animal” 上，并将 “animal” 的部分语义表示“融合进”对 “it” 的编码中。

  

你可以查看 Tensor2Tensor 的 notebook 示例，它提供了一个可以加载 Transformer 模型并进行交互式可视化的工具，非常值得一试。

  

## 05、Self-Attention 机制详解


  

我们先来看一下如何用向量来计算 self-attention，然后再讲它是如何通过矩阵运算真正实现的。

  

### 第一步

  

从每个编码器的输入向量（也就是每个词的 embedding）中生成三个新向量：Query 向量、Key 向量 和 Value 向量。也就是说，每个词都会被转换成这三个向量。

  

这三个向量是通过将 embedding 与三组训练得到的矩阵相乘得到的。这些矩阵是在模型训练过程中学习出来的。

  

需要注意的是，这些新的向量的维度要比原始的 embedding 向量小。通常情况下，Query、Key 和 Value 的维度为 64，而 embedding 以及编码器输入/输出的向量维度是 512。当然它们也**不一定非得更小**，这只是出于架构设计上的考虑——主要是为了让多头注意力（multi-head attention）的计算保持稳定。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HndpAWbxNLz64eibBs8AShwiaspZ4kuxPB3e8Jdmcr33pVnkiavhknpvHA/640?from=appmsg)

将输入向量 x₁ 与权重矩阵 WQ 相乘后，我们就得到了 q₁，也就是这个词对应的 “query” 向量。以此类推，我们会为输入句子中的每个词生成一个 “query” 向量、一个 “key” 向量和一个 “value” 向量，也可以理解为每个词都经历了这三种线性映射。

  

那么，“query”、“key” 和 “value” 向量到底是什么？

  

它们是对注意力机制计算过程的抽象表达，有助于我们理解和实现 self-attention。只要你继续读下去，了解注意力是如何计算的，就会逐步明白每个向量在其中扮演的角色。

  

### 第二步

  

**计算打分（score）**，比如我们正在对句子中的第一个词 “Thinking” 计算 self-attention，那么我们就需要将这个词与输入句子中的每一个词进行打分对比。这个分数用于衡量我们在编码当前位置这个词时，应该关注输入句子的其他哪些部分、关注多少。

  

具体来说，分数是通过将当前词的 query 向量与其他每个词的 key 向量进行点积（dot product）计算得到的。比如我们处理的是位置 1 的词，那么第一个分数就是 q₁ 和 k₁ 的点积，第二个分数就是 q₁ 和 k₂ 的点积，以此类推。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HaNISCfZzYoPZvF3TNJRm17a5MS2KOPBoF2jcMu6sKkia0l03ibyiaTcPg/640?from=appmsg)

  

### 第三步和第四步

  

**先将打分除以 8**（这个值是 key 向量维度的平方根，论文中用的是 64，所以 √64 = 8。这样做的主要目的是为了让梯度更加稳定。当然，也可以使用其他值，但这是默认的做法），**然后将结果输入 softmax 函数**。

  

softmax 的作用是对所有打分进行归一化处理，使它们变成一组非负数，并且总和为 1。这样，模型就能将注意力分配在输入序列中不同位置的词上，每个词的权重表示它对当前词的贡献程度。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HPeEDibGCLNWIhCgJBj9G5k5mJfCPAjdsicpQYW4B7oxupwIyPH29RjgQ/640?from=appmsg)

  

softmax 分值决定着在这个位置，每个词的表达程度（关注度）。很明显，这个位置的词应该有最高的归一化分数，但大部分时候总是有助于关注该词的相关的词。

  

### 第五步

  

**将每个 value 向量乘以对应的 softmax 得分**（为了将它们加起来做准备）。这里的直觉是：保留我们想要关注的词的值，同时通过将不相关的词乘上非常小的数（比如 0.001）来“抑制”它们的影响。

  

### 第六步

  

**将加权后的 value 向量求和**。这会得到当前位置（例如第一个词）在自注意力层的输出结果。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HDWw8xQDFLZtFTZIuicOSmrog9cCIq4k7xptce0I1Cng9iaYia3Z2IhodQ/640?from=appmsg)

  

这就完成了自注意力计算。结果向量可以被传递到前馈神经网络中。然而，在实际的实现中，这个计算是以矩阵形式进行的，以便更快地处理。所以，现在我们已经理解了单词级别的计算直觉，接下来我们来看一下如何在矩阵形式下计算自注意力。

  

## 06、矩阵计算自注意力

  

第一步计算 Query、Key 和 Value 矩阵。我们通过将嵌入向量打包成一个矩阵 X，然后将其分别乘以我们训练好的权重矩阵（WQ、WK、WV）来实现。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HE4mGRicDXS0Ps0mUl88X45WKxDYK25uDgYFTnsyWCkXmfgsuP6lETVA/640?from=appmsg)

X 矩阵中的每一行都对应输入句子中的一个单词。我们再次看到嵌入向量（512，图中是 4 个框）与 q/k/v 向量（64，图中是 3 个框）大小的差异。

  

最后，由于我们处理的是矩阵运算，我们可以将步骤二到六合并为一个公式来计算自注意力层的输出。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HSDCSmhe2ia4MzydSzJp9AzRhC0udzLEMAJqghvq57Ub2hUe5kQfKQJA/640?from=appmsg)

自注意力计算的矩阵形式

  

## 07、多头注意力机制

  

论文通过添加一种叫做“多头”注意力机制进一步优化了自注意力层。这提升了注意力层的性能，主要体现在两个方面：

  

1. 它扩展了模型关注不同位置的能力。是的，在上面的例子中，z1 包含了每个其他编码的一些信息，但它可能会被实际的单词本身主导。如果我们正在翻译一个像“那只动物没有穿越街道，因为它太累了”的句子，了解“它”指的是哪个单词将会非常有用。

  

2. 它为注意力层提供了多个“表示子空间”。正如我们接下来将看到的，使用多头注意力时，我们不仅有一个，而是多个查询/键/值权重矩阵（Transformer 使用了八个注意力头，因此每个编码器/解码器会有八组）。这些矩阵是随机初始化的，然后在训练后，每组都会将输入的嵌入（或者来自较低层编码器/解码器的向量）映射到一个不同的表示子空间。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HIV2St8v2GcYE33znqIRAyJaDsAz0bXic6bJk8ZcqRHgwicCQOd5vBBiaw/640?from=appmsg)

通过多头注意力机制，我们为每个头保持独立的 Q/K/V 权重矩阵，从而得到不同的 Q/K/V 矩阵。像之前一样，我们将 X 与 WQ/WK/WV 矩阵相乘，以生成 Q/K/V 矩阵。

  

如果我们按照之前概述的方式，使用不同的权重矩阵分别计算八次自注意力机制，我们最终会得到八个不同的 Z 矩阵。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6Hv2lJUHwBIbxXiaUgIeMLL28RjnTQM8PvtwtyojRLzPVZteKvIGP2nicQ/640?from=appmsg)

这给我们带来了一些挑战。因为前馈层并不期望八个矩阵，而是期望一个矩阵（每个词对应一个向量）。所以我们需要一种方法将这八个矩阵压缩成一个矩阵。

  

我们怎么做到这一点呢？我们将这些矩阵拼接起来，然后用一个额外的权重矩阵 WO 进行乘法运算。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6Hn6nib1yXkII4IMicq2eBjRhwwpJdYuBnrge6OibhC6NmQaUZaJPULPcaw/640?from=appmsg)

这就是多头自注意力的全部内容了。我知道涉及了不少矩阵。让我试着把它们都放在一个图示里，我们可以在一个地方一起查看它们。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HLf3Krr3KtXP2sXbXrktL09rbyQZQVzP7nYsY7y0pKWUswBViaX1dPJA/640?from=appmsg)

  

现在我们已经讲解了注意力头，让我们回到之前的例子，看看在编码句子中 “it” 这个词时，不同的注意力头分别关注了哪些部分：

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6H47rGsWwn1M9UflzFubgeYkXhIEWQJ0tT2b8HT7xt9aybibiaVYDXc0bg/640?from=appmsg)

当我们编码 “it” 这个词时，一个注意力头主要关注 “the animal” ，而另一个则主要关注 “tired” ——在某种意义上，模型对 “it” 这个词的表示同时包含了 “animal” 和 “tired” 这两个词的一部分表示。

  

然而，如果我们将所有注意力头都加到图中，事情可能就变得难以解释了：

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HJhum1nghxPH16C0M0YBtxcY6ZdIhOgzia7uVSdv0SuCicAr9orQqib5bA/640?from=appmsg)

  

## 08、使用位置编码表示序列顺序

  

在我们目前描述的模型中，缺少一个非常重要的部分，那就是如何考虑输入序列中单词的顺序。

  

为了解决这个问题，Transformer 在每个输入的嵌入向量上加上了一个位置编码向量。这些向量遵循特定的模式，模型通过学习这些模式来帮助它判断每个单词的位置，或者不同单词之间的距离。这样做的直觉是，在将嵌入向量投影到 Q/K/V 向量并进行点积注意力计算时，这些位置编码可以提供有意义的位置信息。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HvXeBGQSD3M6pQRY3PzSLBB8W40cY5rvW65f0vs8a4OjL7pibG6xyatg/640?from=appmsg)

为了让模型理解单词的顺序，我们在每个输入的嵌入向量上加上了位置编码向量，这些向量的值遵循特定的模式。

  

假设嵌入向量的维度为 4，那么实际的位置编码会像这样：

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6H0CNdwrwibP0H8jicRyRFEr347FfEx4dh7PicpCjDWc7Ticvibu61f8LTvUw/640?from=appmsg)

一个真实的例子，使用大小为 4 的嵌入向量来展示位置编码

  

这个模式是什么样的呢？

  

在下图中，每一行对应一个位置编码向量。所以第一行就是我们会加到输入序列中第一个单词嵌入向量上的那个位置编码。每一行包含 512 个值——每个值的范围在 1 到 -1 之间。我们通过颜色编码使得这个模式更加明显。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HGu71rr647V8bicSKFFNZH2Qz4wuDnPQFXRb3yvzasYIuMfGV6XiaEgWQ/640?from=appmsg)

这是一个真实的例子，展示了 20 个单词（行）和 512 维嵌入大小（列）的位置编码。你可以看到它似乎在中间被分成了两半。这是因为左半部分的值是通过一个函数（使用正弦函数）生成的，而右半部分的值是通过另一个函数（使用余弦函数）生成的。然后它们被拼接在一起，形成每个位置编码向量。

  

位置编码的公式在论文（第 3.5 节）中有描述。你可以在 get\_timing\_signal\_1d() 中看到生成位置编码的代码。这并不是唯一的可能方法，然而它有一个优点，就是能够扩展到未见过的序列长度（例如，如果我们训练的模型被要求翻译一个比训练集中的任何句子都长的句子）。

  

上面展示的位置编码来自于 Tensor2Tensor 实现的 Transformer。论文中展示的方法略有不同，它并没有直接拼接，而是将两个信号交织在一起。下图展示了这个效果。这是生成它的代码：

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HFq7KhkQhQ3xsoHyRhicJCykHoicobibafqsFGgwQvJjMnOe13NDM54fpQ/640?from=appmsg)

  

## 09、残差连接

  

在我们继续之前，需要提到一个编码器架构中的细节：每个编码器中的每个子层（自注意力层、前馈神经网络层）都有一个残差连接，并且每个子层之后都会进行层归一化。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HEMSw1ufRbYB3UZKjPYu3sklIcic05jfvKxevRy8WvyqUj26fE7y0k9A/640?from=appmsg)

如果我们用图示的方式来展示 self-attention 相关的向量流动和 layer normalization 操作，它大致是这样的：

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HGwgRKAkBpibuRYKbGPVKicyAuq2FUB9z06xBpYePNLiaXicjibob79fBCeQ/640?from=appmsg)

  

这同样适用于解码器的各个子层。如果我们设想一个包含两个堆叠编码器和两个堆叠解码器的 Transformer，它的结构大致如下：

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HB4WzO9oDsOgUljQfViaNWcxCkMcH9ejjiaEiczJvfKClic6F27589YFwLg/640?from=appmsg)

  

## 10、解码器端

  

现在我们了解了编码器端的大部分概念，实际上也就基本掌握了解码器各个组件的工作原理。但我们还是来看看它们是如何协同工作的。

  

编码器首先会处理输入序列。最顶层编码器的输出会被转换成一组 attention 向量 K 和 V。这组向量会被每个解码器在其 “encoder-decoder attention” 层中使用，从而帮助解码器关注输入序列中的关键位置。

  

![](https://mmbiz.qpic.cn/mmbiz_gif/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HkbhkibDzqShib5DOzHLDxzxgYOhpFYUB9RIjQprHfu4Cib0EWjYNCPleA/640?wx_fmt=gif&from=appmsg)

在编码阶段完成后，我们就进入了解码阶段。解码阶段的每一步都会输出目标序列中的一个元素（在这个例子中是英文翻译句子）。

  

这一过程会不断重复，直到生成一个特殊符号，表示 Transformer 的解码器已经完成全部输出。每一步的输出都会作为输入传递给下一时间步的最底层解码器，然后这些解码器会像编码器那样逐层向上传递它们的解码结果。同样地，就像我们在编码器那边对输入做的处理一样，我们也会对解码器的输入进行 embedding，并添加位置编码，用来标识每个词的位置。

  

![](https://mmbiz.qpic.cn/mmbiz_gif/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HG8ib1K6T1s1uPmGiaD7TXnVzwVHvLKgIvDGafuBGXPc5nKAWCLfsVwQA/640?wx_fmt=gif&from=appmsg)

  

解码器中的 self attention 层与编码器中的自注意力层略有不同：

  

在解码器中，self-attention 层只允许关注输出序列中较早的位置。这是通过在自注意力计算的 softmax 步骤之前，将未来的位置掩蔽（设置为 -inf）来实现的。

  

“Encoder-Decoder Attention” 层的工作原理与多头自注意力相同，不同之处在于它从下层生成 Query 矩阵，而从编码器堆叠的输出中获取 Keys 和 Values 矩阵。

  

## 11、最终的线性和 softmax 层

  

解码器堆叠输出的是一个浮动向量。那么我们如何将它转换为一个单词呢？这就是最终线性层的任务，后面跟着一个 softmax 层。

  

线性层是一个简单的全连接神经网络，它将解码器堆叠产生的向量映射到一个更大、更高维的向量中，这个向量称为 logits 向量。

  

假设我们的模型知道 10,000 个独特的英语单词（即我们的模型“输出词汇表”），这些词汇是从训练数据集中学到的。那么 logits 向量就有 10,000 个单元，每个单元对应一个独特单词的得分。这就是我们如何解释经过线性层后的模型输出。

  

softmax 层会将这些得分转换为概率（所有值为正且加起来为 1.0）。然后选择概率最高的单元，关联的单词作为该时间步的输出结果。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6H3EXsR3IBxCvBOr8bUHuwibsa0PGEZ0dKVLsyjicPvLhalsbHGkRpe9WQ/640?from=appmsg)

这张图从底部开始，展示了作为解码器堆叠输出的向量。然后，这个向量被转化为一个输出单词。

  

## 12、训练回顾

现在我们已经覆盖了经过训练的 Transformer 的整个前向传播过程，接下来我们可以简要回顾一下训练模型的直觉。

  

在训练过程中，一个未训练的模型会经过完全相同的前向传播。但是，由于我们是在一个带标签的训练数据集上训练它，我们可以将它的输出与实际的正确输出进行比较。

  

为了可视化这一过程，假设我们的输出词汇表只包含 6 个单词（“a”、“am”、“i”、“thanks”、“student”和“”（即“句子结束”））。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HPIto5Yn8yFwHenldhSMnZc24uDjmbtkXYqib1gg5gcT1aHGxk10xJtg/640?from=appmsg)

我们的模型的输出词汇表是在训练开始之前的预处理阶段创建的。

  

一旦我们定义了输出词汇表，就可以使用一个与词汇表宽度相同的向量来表示词汇表中的每个单词，这也被称为独热编码（one-hot encoding）。例如，我们可以使用以下向量来表示单词 “am”：

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HhpcEicKFBasg53VBdXHZDsG1DjUZQtGBgUiaTtQic6iaibpBuD3qG2tKkrQ/640?from=appmsg)

示例：我们输出词汇表的独热编码

  

回顾完训练过程后，让我们来讨论一下模型的损失函数——在训练阶段我们优化的指标，目的是让模型变得更精确，最终获得一个经过训练并且非常准确的模型。

## 13、损失函数
  

假设我们正在训练我们的模型。假设这是训练阶段的第一步，我们用一个简单的例子进行训练——将 “merci” 翻译成 “thanks”。

  

这意味着，我们希望模型的输出是一个概率分布，指向 “thanks” 这个词。但由于这个模型还没有经过训练，这种情况可能不会马上发生。

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6H6ic1wL8DiblDspIPGdd39roiaZmrWruAvf2d23ZIgx8qHt8bDwTic7aLFg/640?from=appmsg)

由于模型的参数（权重）是随机初始化的，因此（未训练的）模型会为每个单元/单词生成一个带有任意值的概率分布。我们可以将这个输出与实际的目标输出进行比较，然后通过反向传播调整模型的所有权重，使得输出尽可能接近预期的目标输出。

  

如何比较两个概率分布呢？我们简单地将一个从另一个中减去。

  

不过需要注意的是，这只是一个过于简化的例子。更实际的情况是，我们会处理一个比单个单词更长的句子。例如——输入是：“je suis étudiant”，期望输出是：“i am a student”。这意味着，我们希望模型依次输出概率分布，其中：

  

*   每个概率分布由一个宽度为 vocab\_size 的向量表示（在我们的简单示例中是 6，但在实际情况中可能是 30,000 或 50,000 这样的数字）
*   第一个概率分布中，单词 “i” 对应的单元拥有最高的概率
*   第二个概率分布中，单词 “am” 对应的单元拥有最高的概率
*   以此类推，直到第五个输出分布指示 ‘<end of sentence>’ 符号，该符号也与来自 10,000 元素词汇表的一个单元相关联。

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6HU9nT4K2SKficWKkSib7LUSugqUicibZl2VurVFq3D4eWm5kDosbYIpvWIw/640?from=appmsg)

我们将在训练示例中为单个句子训练模型的目标概率分布。

  

在对模型进行足够长时间的训练，并且使用了足够大的数据集后，我们希望生成的概率分布看起来像这样：

  

![](https://mmbiz.qpic.cn/mmbiz_png/13hL2eRjySibby5RK2jJ32FIsEbIC0e6H5YjMbCEvzljqm5Ih6KianyomYnicfhEPlXjzUnQn0pUTIjNah3yPgq2w/640?from=appmsg)

希望经过训练后，模型能够输出我们期望的正确翻译。当然，这并不能真正证明该短语是否出现在训练数据集中。注意，即使某个位置的输出概率不大，它也会得到一点点概率，这就是 softmax 的一个非常有用的特性，能够帮助训练过程。

  

现在，由于模型是一次输出一个单词，我们可以假设模型从该概率分布中选择概率最高的单词，并忽略其他的单词。这就是一种做法（称为贪婪解码）。另一种方法是保留前两个最有可能的单词（例如 ‘I’ 和 ‘a’），然后在下一步中，运行模型两次：一次假设第一个输出位置是单词 ‘I’ ，另一次假设第一个输出位置是单词 ‘a’，然后根据考虑位置 #1 和 #2 的错误程度，保留生成误差较小的版本。

  

我们对位置 #2 和 #3 等进行重复此过程。这种方法称为“束搜索”（beam search），在我们的示例中，束宽（beam\_size）为 2（这意味着在任何时候，模型会在内存中保留两个部分假设，即未完成的翻译），而返回束（top\_beams）也是 2（这意味着我们最终会返回两个翻译）。这些都是你可以实验的超参数。

  

## 14、写在最后

如果你想更深入了解 Transformer，建议你：

  

*   阅读《Attention Is All You Need》论文原文

https://arxiv.org/abs/1706.03762
*   阅读相关博客：

Transformer: A Novel Neural Network Architecture for Language Understanding

https://ai.googleblog.com/2017/08/transformer-novel-neural-network.html
*   Tensor2Tensor 公告

https://ai.googleblog.com/2017/06/accelerating-deep-learning-research.html
*   观看 Łukasz Kaiser 的演讲视频，详细介绍了模型及其细节

https://www.youtube.com/watch?v=rBCqOTEfxvg
*   自己尝试一下代码：

Jupyter Notebook provided as part of the Tensor2Tensor repo

https://colab.research.google.com/github/tensorflow/tensor2tensor/blob/master/tensor2tensor/notebooks/hello\_t2t.ipynb
*   探究其源码：

https://github.com/tensorflow/tensor2tensor

>参考链接：[https://mp.weixin.qq.com/s/7IqI_GKYHUyQIIcr4Mbe1w](https://mp.weixin.qq.com/s/7IqI_GKYHUyQIIcr4Mbe1w)，整理：沉默王二
