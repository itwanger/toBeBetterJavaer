---
category:
  - Java企业级开发
tag:
  - Spring Boot
title: Spring Boot 整合 Lombok，用注解简化 Java 代码，比如说 getter和setter
subTitle: 整合 Lombok
discription: Lombok 是一个流行的 Java 库，旨在通过注解的方式简化 Java 代码，减少模板代码的编写。它通过在编译时自动生成常用的 Java 代码（如 getters、setters、constructors、toString、equals、hashCode 等方法），使得源代码更加简洁。
---

# 第二节：整合 Lombok

Spring Boot 早在 2.1.x 版本后就在 starter 中内置了 Lombok 依赖，Intellij IDEA 也早在 IDEA 2020.3 版本的时候内置了 Lombok 插件。为什么它们都要支持 Lombok 呢？Lombok 到底有啥牛皮的？今天我们就来补上这一课。

## Lombok 的自我介绍

`Lombok` 在官网是这样作自我介绍的：

> Project Lombok makes java a spicier language by adding 'handlers' that know how to build and compile simple, boilerplate-free, not-quite-java code.


大致的意思就是：`Lombok` 是个好类库，可以为 Java 代码添加一些“处理程序”，让其变得更简洁、更优雅。在我看来，`Lombok` 最大的好处就在于通过注解的形式来简化 Java 代码，简化到什么程度呢？

作为一名 Java 程序员，我相信你一定写过不少的 `getter / setter`，尽管可以借助 IDE 来自动生成，可一旦 `Javabean` 的属性很多，就免不了要产生大量的 `getter / setter`，这会让代码看起来不够简练，就像老太婆的裹脚布一样，又臭又长。

```java
class Cmower {
	private int age;
	private String name;
	private BigDecimal money;

	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public BigDecimal getMoney() {
		return money;
	}
	public void setMoney(BigDecimal money) {
		this.money = money;
	}
}
```

`Lombok` 可以通过注解的方式，在编译的时候自动为 `Javabean` 的属性生成 `getter / setter`，不仅如此，还可以生成构造方法、`equals`方法、`hashCode`方法，以及 `toString`方法。注意是在编译的时候哦，源码当中是没有 `getter / setter` 等等的。

```java
@Getter
@Setter
class CmowerLombok {
	private int age;
	private String name;
	private BigDecimal money;
}
```

瞧一瞧，源码看起来苗条多了，对不对？

## 集成 Lombok

如果项目使用 `Maven` 构建的话，添加`Lombok` 的依赖就变得轻而易举了。

```xml
<dependency>
	<groupId>org.projectlombok</groupId>
	<artifactId>lombok</artifactId>
	<version>1.18.6</version>
	<scope>provided</scope>
</dependency>
```

其中 `scope=provided`，就说明 `Lombok` 只在编译阶段生效。也就是说，`Lombok` 会在编译期静悄悄地将带 `Lombok` 注解的源码文件正确编译为完整的 `class` 文件。

SpringBoot 2.1.x 版本后不需要再显式地添加 Lombok 依赖了。之后，还需要为 Intellij IDEA 安装 `Lombok` 插件，否则 `Javabean` 的 `getter / setter` 就无法自动编译，也就不能被调用。不过，新版的 Intellij IDEA 也已经内置好了，不需要再安装。

![](https://cdn.tobebetterjavaer.com/stutymore/lombok-20231231074753.png)

## 常用的 Lombok 注解

### 1）@Getter / @Setter

`@Getter / @Setter` 用起来很灵活，比如说像下面这样：

```java
class CmowerLombok {
	@Getter @Setter private int age;
	@Getter private String name;
	@Setter private BigDecimal money;
}
```

字节码文件反编译后的内容是：

```java
class CmowerLombok {
	private int age;
	private String name;
	private BigDecimal money;

	public int getAge() {
		return this.age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getName() {
		return this.name;
	}

	public void setMoney(BigDecimal money) {
		this.money = money;
	}
}
```

### 2）@ToString

`@ToString` 注解可以生成 `toString` 方法，是打印日志的好帮手哦。

```java
@ToString
class CmowerLombok {
	private int age;
	private String name;
	private BigDecimal money;
}
```

字节码文件反编译后的内容是：

```java
class CmowerLombok {
	private int age;
	private String name;
	private BigDecimal money;

	public String toString() {
		return "CmowerLombok(age=" + this.age + ", name=" + this.name + ", money=" + this.money + ")";
	}
}
```

### 3）@Val


在编写 JavaScript 代码时，我一直觉得 `var` 这个变量声明类型用起来特别方便。`Lombok` 也提供了一个类似的。

```java
class CmowerLombok {
	public void test() {
		val names = new ArrayList<String>();
		names.add("沉默王二");
		val name = names.get(0);
		System.out.println(name);
	}
}
```

字节码文件反编译后的内容是：

```java
class CmowerLombok {
	public void test() {
		ArrayList<String> names = new ArrayList();
		names.add("沉默王二");
		String name = (String) names.get(0);
		System.out.println(name);
	}
}
```

### 4）@Data

`@Data` 注解可以生成 `getter / setter`、`equals`、`hashCode`，以及 `toString`，是个总和的选项。


```java
@Data
class CmowerLombok {
	private int age;
	private String name;
	private BigDecimal money;
}
```

字节码文件反编译后的内容是：

```java
class CmowerLombok {
	private int age;
	private String name;
	private BigDecimal money;

	public int getAge() {
		return this.age;
	}

	public String getName() {
		return this.name;
	}

	public BigDecimal getMoney() {
		return this.money;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setMoney(BigDecimal money) {
		this.money = money;
	}

	public boolean equals(Object o) {
		if (o == this) {
			return true;
		} else if (!(o instanceof CmowerLombok)) {
			return false;
		} else {
			CmowerLombok other = (CmowerLombok) o;
			if (!other.canEqual(this)) {
				return false;
			} else if (this.getAge() != other.getAge()) {
				return false;
			} else {
				Object this$name = this.getName();
				Object other$name = other.getName();
				if (this$name == null) {
					if (other$name != null) {
						return false;
					}
				} else if (!this$name.equals(other$name)) {
					return false;
				}

				Object this$money = this.getMoney();
				Object other$money = other.getMoney();
				if (this$money == null) {
					if (other$money != null) {
						return false;
					}
				} else if (!this$money.equals(other$money)) {
					return false;
				}

				return true;
			}
		}
	}

	protected boolean canEqual(Object other) {
		return other instanceof CmowerLombok;
	}

	public int hashCode() {
		int PRIME = true;
		int result = 1;
		int result = result * 59 + this.getAge();
		Object $name = this.getName();
		result = result * 59 + ($name == null ? 43 : $name.hashCode());
		Object $money = this.getMoney();
		result = result * 59 + ($money == null ? 43 : $money.hashCode());
		return result;
	}

	public String toString() {
		return "CmowerLombok(age=" + this.getAge() + ", name=" + this.getName() + ", money=" + this.getMoney() + ")";
	}
}
```

### 5）@Slf4j

`@Slf4j` 可以用来生成注解对象，你可以根据自己的日志实现方式来选用不同的注解，比如说：`@Log`、`@Log4j`、`@Log4j2`、`@Slf4j` 等。


```java
@Slf4j
public class Log4jDemo {
    public static void main(String[] args) {
        log.info("level:{}","info");
        log.warn("level:{}","warn");
        log.error("level:{}", "error");
    }
}
```

字节码文件反编译后的内容是：

```java
public class Log4jDemo {
    private static final Logger log = LoggerFactory.getLogger(Log4jDemo.class);

    public Log4jDemo() {
    }

    public static void main(String[] args) {
        log.info("level:{}", "info");
        log.warn("level:{}", "warn");
        log.error("level:{}", "error");
    }
}
```

### 6）@Builder

`@Builder` 注解可以用来通过建造者模式来创建对象，这样就可以通过链式调用的方式进行对象赋值，非常的方便。

```java
@Builder
@ToString
public class BuilderDemo {
    private Long id;
    private String name;
    private Integer age;

    public static void main(String[] args) {
        BuilderDemo demo = BuilderDemo.builder().age(18).name("沉默王二").build();
        System.out.println(demo);
    }
}
```

字节码文件反编译后的内容是：

```java
public class BuilderDemo {
    private Long id;
    private String name;
    private Integer age;

    public static void main(String[] args) {
        BuilderDemo demo = builder().age(18).name("沉默王二").build();
        System.out.println(demo);
    }

    BuilderDemo(final Long id, final String name, final Integer age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public static BuilderDemo.BuilderDemoBuilder builder() {
        return new BuilderDemo.BuilderDemoBuilder();
    }

    public String toString() {
        return "BuilderDemo(id=" + this.id + ", name=" + this.name + ", age=" + this.age + ")";
    }

    public static class BuilderDemoBuilder {
        private Long id;
        private String name;
        private Integer age;

        BuilderDemoBuilder() {
        }

        public BuilderDemo.BuilderDemoBuilder id(final Long id) {
            this.id = id;
            return this;
        }

        public BuilderDemo.BuilderDemoBuilder name(final String name) {
            this.name = name;
            return this;
        }

        public BuilderDemo.BuilderDemoBuilder age(final Integer age) {
            this.age = age;
            return this;
        }

        public BuilderDemo build() {
            return new BuilderDemo(this.id, this.name, this.age);
        }

        public String toString() {
            return "BuilderDemo.BuilderDemoBuilder(id=" + this.id + ", name=" + this.name + ", age=" + this.age + ")";
        }
    }
}
```

除了我上面提到的这些，Lombok 还提供了同步注解 @Synchronized、自动抛出异常注解 @SneakyThrows、不可变对象 @Value、自动生成 hashCode 和 equals 方法的注解 [@EqualsAndHashCode ](/EqualsAndHashCode ) 等等，大家可以去尝试一下，顺带看一下反编译后的字节码，体验一下 Lombok 的工作原理。 

## Lombok 的处理流程

一图胜千言，直接上图。

![](https://cdn.tobebetterjavaer.com/stutymore/lombok-20231231074820.png)

- javac 对源代码进行分析，生成一棵抽象语法树（AST）
- javac 编译过程中调用实现了JSR 269 的 Lombok 程序
- Lombok 对 AST 进行处理，找到 Lombok 注解所在类对应的语法树（AST），然后修改该语法树，增加 Lombok 注解定义的相应树节点（所谓代码）
- javac 使用修改后的抽象语法树生成字节码文件

Lombok 用起来虽然爽，但需要团队内部达成一致，就是要用大家都用，否则有些用了有些没用就会乱成一锅粥，很影响代码的整体风格。另外，假如有团队成员还在用 Eclipse，那么也得要求他安装 Lombok 插件，否则打开一个使用 Lombok 注解的项目就会无法通过编译。

如果一类使用了 Lombok 注解，通过类结构是可以查看到对应的方法的，比如说下图中的 toString 和 builder 方法。

![](https://cdn.tobebetterjavaer.com/stutymore/lombok-20231231074836.png)

打开 target 目录下的 .class 文件，就可以看到 Lombok 生成的反编译后的字节码文件，也可以验证 Lombok 是在编译阶段实现 Java 代码增强功能的。

![](https://cdn.tobebetterjavaer.com/stutymore/lombok-20231231074847.png)

## 小结

`Lombok` 是一个流行的 Java 库，旨在通过注解的方式简化 Java 代码，减少模板代码的编写。它通过在编译时自动生成常用的 Java 代码（如 getters、setters、constructors、toString、equals、hashCode 等方法），使得源代码更加简洁。

几乎所有正式项目都已经使用了 lombok，因为的确能够提升开发效率，减少代码量，提高代码可读性。但是，如果你的团队成员有人不会使用 lombok，那么你就需要考虑一下是否要使用 lombok 了，因为如果有人不会使用，那么他就无法阅读 lombok 生成的代码，这样就会影响团队的开发效率。

嗯，另外一个好的办法就是，你把这篇内容转发给他，让他好好学习一下，哈哈哈。
