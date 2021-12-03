尽管 Git 的接口有些难懂，但它底层的设计和思想却非常的优雅。难懂的接口只能靠死记硬背，但优雅的底层设计则非常容易理解。我们可以通过一种自底向上的方式来学习 Git，先了解底层的数据模型，再学习它的接口。可以这么说，一旦搞懂了 Git 的数据模型，再学习它的接口并理解这些接口是如何操作数据模型的就非常容易了。

进行版本控制的方法很多，Git 拥有一个精心设计的模型，这使其能够支持版本控制所需的所有特性，比如维护历史记录、支持分支和团队协作。

### 快照

Git 将顶级目录中的文件和文件夹称作集合，并通过一系列快照来管理历史记录。在 Git 的术语中，文件被称为 blob 对象（数据对象），也就是一组数据。目录则被称为 tree（树），目录中可以包含文件和子目录。

```
<root> (tree)
|
+- foo (tree)
|  |
|  + bar.txt (blob, contents = "hello world")
|
+- baz.txt (blob, contents = "git is wonderful")
```

顶层的树（也就是 root） 包含了两个元素，一个名为 foo 的子树（包含了一个 blob 对象“bar.txt”），和一个 blob 对象“baz.txt”。

### 历史记录建模：关联快照

版本控制系统是如何和快照进行关联的呢？线性历史记录是一种最简单的模型，它包含了一组按照时间顺序线性排列的快照。不过，出于种种原因，Git 没有采用这种模型。

在 Git 中，历史记录是一个由快照组成的有向无环图。“有向无环图”，听起来很高大上，但其实并不难理解。我们只需要知道这代表 Git 中的每个快照都有一系列的父辈，也就是之前的一系列快照。这些快照通常被称为“commit”，看起来好像是下面这样：

```
o <-- o <-- o <-- o
            ^  
             \
              --- o <-- o
```

o 表示一次 commit，也就是一次快照。箭头指向了当前 commit 的父辈。在第三次 commit 之后，历史记录分叉成了两条独立的分支，这可能是因为要同时开发两个不同的特性，它们之间是相互独立的。开发完成后，这些分支可能会被合并为一个新的 commit，这个新的 commit 会同时包含这些特性，看起来好像是下面这样：

```
o <-- o <-- o <-- o <---- o
            ^            /
             \          v
              --- o <-- o
```

Git 中的 commit 是不可改变的。当然了，这并不意味着不能被修改，只不过这种“修改”实际上是创建了一个全新的提交记录。

### 数据模型及其伪代码表示

以伪代码的形式来学习 Git 的数据模型，可能更加通俗易懂。

```
// 文件是一组数据
type blob = array<byte>

// 一个包含了文件和子目录的目录
type tree = map<string, tree | file>

// 每个 commit 都包含了一个父辈，元数据和顶层树
type commit = struct {
    parent: array<commit> // 父辈
    author: string // 作者
    message: string // 信息
    snapshot: tree // 快照
}
```

### 对象和内存寻址

Git 中的对象可以是 blob、tree 或者 commit：

```
type object = blob | tree | commit
```

Git 在存储数据的时候，所有的对象都会基于它们的安全散列算法进行寻址。

```
objects = map<string, object>

def store(object):
    id = sha1(object)
    objects[id] = object

def load(id):
    return objects[id]
```

blob、tree 和 commit 一样，都是对象。当它们引用其他对象时，并没有真正在硬盘上保存这些对象，而是仅仅保存了它们的哈希值作为引用。

还记得之前的例子吗？

```
<root> (tree)
|
+- foo (tree)
|  |
|  + bar.txt (blob, contents = "hello world")
|
+- baz.txt (blob, contents = "git is wonderful")
```

root 引用的 foo 和 baz.txt 就像下面这样：

```
100644 blob 4448adbf7ecd394f42ae135bbeed9676e894af85    baz.txt
040000 tree c68d233a33c5c06e0340e4c224f0afca87c8ce87    foo
```

### 引用

所有的快照都可以通过它们的哈希值来标记，但 40 位的十六进制字符实在是太难记了，很不方便。针对这个问题，Git 的解决办法是给这些哈希值赋予一个可读的名字，也就是引用（reference），引用是指向 commit 的指针，与对象不同，它是可变的，可以被更新，指向新的 commit。通常，master 引用通常会指向主分支的最新一次 commit。

```
references = map<string, string>

def update_reference(name, id):
    references[name] = id

def read_reference(name):
    return references[name]

def load_reference(name_or_id):
    if name_or_id in references:
        return load(references[name_or_id])
    else:
        return load(name_or_id)
```

这样，Git 就可以使用“master”这样容易被记住的名称来表示历史记录中特定的 commit，而不需要再使用一长串的十六进制字符了。

在 Git 中，当前的位置有一个特殊的索引，它就是“HEAD”。

## 仓库

我们可以粗略地给出 Git 仓库的定义了：对象 和 引用。

在硬盘上，Git 仅存储对象和引用，因为其数据模型仅包含这些东西。所有的 git 命令都对应着对 commit 树的操作。
