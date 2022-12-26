---
category:
  - Java企业级开发
tag:
  - Spring Boot
title: SpringBoot中处理校验逻辑的两种方式：Hibernate Validator+全局异常处理
shortTitle: SpringBoot中如何处理校验逻辑
---

最近正在开发一个知识库学习网站编程喵🐱，需要对请求参数进行校验，比如说非空啊、长度限制啊等等，可选的解决方案有两种：

- 一种是用 Hibernate Validator 来处理
- 一种是用全局异常来处理

两种方式，我们一一来实践体验一下。

### 一、Hibernate Validator

Spring Boot 已经内置了 Hibernate Validator 校验框架，这个可以通过 Spring Boot 官网查看和确认。

第一步，进入 Spring Boot 官网，点击 learn 这个面板，点击参考文档。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/validator-9585b744-a942-425f-b78b-f92f22909c6c.png)

第二步，在参考文档页点击「依赖的版本」。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/validator-5b9e4758-27ff-4773-a4b3-809b8dd6546c.png)

第三步，在依赖版本页就可以查看到所有的依赖了，包括版本号。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/validator-2b0b00c2-fc10-40dc-bfc7-c615bd87f9c9.png)

PS：如果发现没有起效，可能是依赖版本冲突了，手动把 Hibernate Validator 依赖添加到 pom.xml 文件就可以了。

```
<dependency>
    <groupId>org.hibernate.validator</groupId>
    <artifactId>hibernate-validator</artifactId>
    <version>6.0.17.Final</version>
</dependency>
<dependency>
    <groupId>javax.validation</groupId>
    <artifactId>validation-api</artifactId>
    <version>2.0.1.Final</version>
</dependency>
```

通过 Hibernate Validator 校验框架，我们可以直接在请求参数的字段上加入注解来完成校验。

**具体该怎么做呢**？

第一步，在需要验证的字段上加上 Hibernate Validator 提供的校验注解。

比如说我现在有一个用户名和密码登录的请求参数 UsersLoginParam 类：

```java
@Data
@ApiModel(value="用户登录", description="用户表")
public class UsersLoginParam implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "登录名")
    @NotBlank(message="登录名不能为空")
    private String userLogin;

    @ApiModelProperty(value = "密码")
    @NotBlank(message="密码不能为空")
    private String userPass;
}
```

就可以通过 `@NotBlank` 注解来对用户名和密码进行判空校验。除了 `@NotBlank` 注解，Hibernate Validator 还提供了以下常用注解：

- `@NotNull`：被注解的字段不能为 null；
- `@NotEmpty`：被注解的字段不能为空；
- `@Min`：被注解的字段必须大于等于其value值；
- `@Max`：被注解的字段必须小于等于其value值；
- `@Size`：被注解的字段必须在其min和max值之间；
- `@Pattern`：被注解的字段必须符合所定义的正则表达式；
- `@Email`：被注解的字段必须符合邮箱格式。

第二步，在对应的请求接口（`UsersController.login()`）中添加 `@Validated` 注解，并注入一个 `BindingResult` 参数。

```java
@Controller
@Api(tags="用户")
@RequestMapping("/users")
public class UsersController {
    @Autowired
    private IUsersService usersService;

    @ApiOperation(value = "登录以后返回token")
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public ResultObject login(@Validated UsersLoginParam users, BindingResult result) {
        String token = usersService.login(users.getUserLogin(), users.getUserPass());
        if (token == null) {
            return ResultObject.validateFailed("用户名或密码错误");
        }
        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put("token", token);
        tokenMap.put("tokenHead", tokenHead);
        return ResultObject.success(tokenMap);
    }
}
```

第三步，为控制层（UsersController）创建一个切面，将通知注入到 BindingResult 对象中，然后再判断是否有校验错误，有错误的话返回校验提示信息，否则放行。

```java
@Aspect
@Component
@Order(2)
public class BindingResultAspect {
    @Pointcut("execution(public * com.codingmore.controller.*.*(..))")
    public void BindingResult() {
    }

    @Around("BindingResult()")
    public Object doAround(ProceedingJoinPoint joinPoint) throws Throwable {
        Object[] args = joinPoint.getArgs();
        for (Object arg : args) {
            if (arg instanceof BindingResult) {
                BindingResult result = (BindingResult) arg;
                if (result.hasErrors()) {
                    FieldError fieldError = result.getFieldError();
                    if(fieldError!=null){
                        return ResultObject.validateFailed(fieldError.getDefaultMessage());
                    }else{
                        return ResultObject.validateFailed();
                    }
                }
            }
        }
        return joinPoint.proceed();
    }
}
```

这里涉及到了 Spring AOP 的知识，我在前面的文章里讲解过了，戳这个链接可以直达：[Spring AOP 扫盲](https://tobebetterjavaer.com/springboot/aop-log.html)

第四步，访问登录接口，用户名和密码都不传入的情况下，就会返回“用户名不能为空”的提示信息。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/validator-eaf30b98-0a9a-403f-8f2b-a159edc492d6.png)

通过 debug 的形式，体验一下整个工作流程。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/validator-bc9d8ec7-bba6-4306-aaae-b6c66068366a.png)

可以看得出，Hibernate Validator 带来的优势有这些：

- 验证逻辑与业务逻辑进行了分离，降低了程序耦合度；
- 统一且规范的验证方式，无需再次编写重复的验证代码。

不过，也带来一些弊端，比如说：

- 需要在请求接口的方法中注入 BindingResult 对象，而这个对应在方法体中并没有用到
- 只能校验一些非常简单的逻辑，涉及到数据查询就无能为力了。

### 二、全局异常处理

使用全局异常处理的优点就是比较灵活，可以处理比较复杂的逻辑校验，在校验失败的时候直接抛出异常，然后进行捕获处理就可以了。

第一步，新建一个自定义异常类 ApiException。

```java
public class ApiException extends RuntimeException {
    private IErrorCode errorCode;

    public ApiException(IErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public ApiException(String message) {
        super(message);
    }

    public ApiException(Throwable cause) {
        super(cause);
    }

    public ApiException(String message, Throwable cause) {
        super(message, cause);
    }

    public IErrorCode getErrorCode() {
        return errorCode;
    }
}
```

第二步，新建一个断言处理类 Asserts，简化抛出 ApiException 的步骤。

```java
public class Asserts {
    public static void fail(String message) {
        throw new ApiException(message);
    }

    public static void fail(IErrorCode errorCode) {
        throw new ApiException(errorCode);
    }
}
```

第三步，新建一全局异常处理类 GlobalExceptionHandler，对异常信息进行解析，并封装到统一的返回对象 ResultObject 中。

```java
@ControllerAdvice
public class GlobalExceptionHandler {
    @ResponseBody
    @ExceptionHandler(value = ApiException.class)
    public ResultObject handle(ApiException e) {
        if (e.getErrorCode() != null) {
            return ResultObject.failed(e.getErrorCode());
        }
        return ResultObject.failed(e.getMessage());
    }
}
```

全局异常处理类用到了两个注解，`@ControllerAdvice` 和 `@ExceptionHandler`。

`@ControllerAdvice` 是一个特殊的 `@Component`（可以通过源码看得到），用于标识一个类，这个类中被以下三种注解标识的方法：`@ExceptionHandler`，`@InitBinder`，`@ModelAttribute`，将作用于所有`@Controller` 类的接口上。

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface ControllerAdvice {
}
```

`@ExceptionHandler` 注解的作用就是标识统一异常处理，它可以指定要统一处理的异常类型，比如说我们自定义的 ApiException。

第四步，在需要校验的地方通过 Asserts 类抛出异常 ApiException。还拿用户登录这个接口来说明吧。

```java
@Controller
@Api(tags="用户")
@RequestMapping("/users")
public class UsersController {
    @ApiOperation(value = "登录以后返回token")
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public ResultObject login(@Validated UsersLoginParam users, BindingResult result) {
        String token = usersService.login(users.getUserLogin(), users.getUserPass());
     
        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put("token", token);
        tokenMap.put("tokenHead", tokenHead);
        return ResultObject.success(tokenMap);
    }
}
```

该接口需要查询数据库验证密码是否正确，如果密码不正确就抛出校验信息“密码不正确”。

```java
@Service
public class UsersServiceImpl extends ServiceImpl<UsersMapper, Users> implements IUsersService {
    public String login(String username, String password) {
        String token = null;
        //密码需要客户端加密后传递
        UserDetails userDetails = loadUserByUsername(username);
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            Asserts.fail("密码不正确");
         }
        // 其他代码省略
        return token;
    }
}
```

第五步，通过 ApiPost 来测试一下接口，故意把密码输错。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/validator-1dd4607e-689a-4ddf-814a-d92ac6408fc3.png)

也可以通过 debug 的形式，体验一下整个工作流程。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/validator-8d673f46-6981-4150-b549-29335bf90cf5.png)

### 三、总结

实际开发中把两者结合在一起用，就可以弥补彼此的短板了，简单校验用 Hibernate Validator，复杂一点的逻辑校验，比如说需要数据库查询用全局异常处理来实现。

为了把 Spring Boot 逻辑校验这块单独拉出来做一个 demo 的例子，我新建了一个 codingmore-validator 的项目，放在 codingmore-learning 项目下面了，想要参考的，直接戳下面的两个链接。

完整的编程喵整个项目的源码戳第一个，只想看逻辑校验的戳第二个。

>- 编程喵🐱源码地址：[https://github.com/itwanger/coding-more](https://github.com/itwanger/coding-more)
>- codingmore-validator: [https://github.com/itwanger/codingmore-learning/tree/main/codingmore-validator](https://github.com/itwanger/codingmore-learning/tree/main/codingmore-validator)

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/springboot/validator-fbd06343-c1ae-4cf6-9b46-bd5c9860b396.png)

每个类，每个方法基本上都加了注释，可以很容易就看得懂。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)