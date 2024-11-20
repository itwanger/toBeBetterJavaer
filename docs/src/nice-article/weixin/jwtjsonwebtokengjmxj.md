---
title: 货拉拉面试官：JWT 被抓取了怎么办？
shortTitle: JWT 攻击面试小结
description: JWT简介、JWT自身攻击面、JWT在业务场景的攻击面、JWT测试、相关工具
author: 雨九九
category:
  - 微信公众号
---

星球一位球友问：面试的时候遇到一个问题，如果有人通过抓包获取jwt，应该如何应对？

本来想亲自写一篇，但刚好在货拉拉技术公众号上看到了这篇帖子，写得竟然很详细，于是就直接收录了进来，简单进行了一些细节调整，大家可以好好看一下，干货啊

![](http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin/jwtjsonwebtokengjmxj-50b2aab0-e074-45db-814c-1702ba2539a8.jpg)

## 一、JWT 简介

**_JSON Web Token (JWT)_** 是一种紧凑的、基于 JSON 的开放标准 (RFC 7519)，常用于不同主体（客户端和服务器）之间安全地传递信息。JWT 通常由三部分组成：

1.  **Header（头部）：** 定义令牌类型和加密算法，如`{"alg": "HS256", "typ": "JWT"}`
2.  **Payload（载荷）：** 包含声明信息（claims），如用户身份、权限等。
3.  **Signature（签名）：** 用来验证令牌的真实性和完整性。

一个示例的 JWT：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

JWT 被广泛用于身份认证，授权场景。服务端验证 JWT 时，可以通过解密签名来判断消息是否被篡改。

## 二、JWT 自身攻击面

### 2.1 算法混淆攻击（Algorithm Confusion Attack）/"None"算法攻击

**技术要点：**

- 攻击者通过篡改 JWT 的 Header 部分，将签名算法从安全算法（如 HS256）更改为不安全的算法（如 none），从而伪造合法 Token。
- 攻击者通过修改 JWT 的算法字段（如从 RSA 改为 HMAC），可以利用服务端验证机制的弱点来篡改令牌。例如，当服务端没有正确验证算法时，攻击者可能使用公钥重新签名令牌并将其发送回来，导致验证成功，即使令牌已经被篡改

**示例：**

原始 Header：

```
{"alg": "HS256","typ": "JWT"}
```

攻击后被篡改为：

```
{"alg": "none","typ": "JWT"}
```

此时 JWT 将不再进行签名验证，攻击者可以伪造任意 Payload。例如：

```
eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VySWQiOiIxMjMifQ.
```

**解决方案：**

- 在服务端严格校验 alg 字段，不允许使用 none 等不安全的算法。
- 在生成和解析 JWT 时，明确指定并验证安全算法，如 HS256 或 HS512。

```
payload = jwt.decode(token, self.secret, algorithms=["HS256", "HS512"])
userId = payload['userId']
username = self.db_lookup(userId, "username")
```

### 2.2 弱密钥导致 Token 可伪造

**技术要点：**

- 如果服务端使用弱密钥或者密钥管理不当，攻击者可以通过暴力破解或暴露的密钥生成伪造的 JWT，绕过验证。
- 在对称加密（如 HMAC）中，JWT 的签名强度取决于密钥的复杂性。若使用弱密钥，攻击者可以通过暴力破解的方式获取密钥，生成伪造的 JWT。

**示例：** 如果密钥过于简单，攻击者可以使用工具如 jwtcrack 破解签名：

```
jwtcrack your_jwt_token
```

破解后，攻击者可以使用这个密钥生成伪造的 JWT。

**解决方案：**

- 使用强加密算法，如 RS256（非对称加密），避免使用对称加密算法 HS256。

```
payload = jwt.decode(token, self.secret, algorithms="RS256")
```

- 使用高强度的密钥，并妥善保管，避免泄露。

### 2.3 Token 重放攻击

**技术要点：**

- 攻击者可以拦截合法用户的 JWT 并在其有效期内重复使用，造成重放攻击。
- 在验证 Token 签名之前，会计算 Token 的有效期，以确保 Token 尚未过期。通常是通过从 Token 中读取 exp （过期时间）声明并计算是否仍然有效来执行的。如果 exp 值设置得太大（或根本没有设置），Token 的有效时间就会太长，甚至可能永远不会过期。

**示例：** 假设攻击者捕获了一个合法的 JWT，在其有效期内不断重放该请求以执行未授权操作。

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**解决方案：**

- 设置较短的 exp 过期时间来限制 Token 的有效期。

```
lifetime = datetime.datetime.now() + datetime.timedelta(minutes=5)
payload = {
   'username' : username,
   'admin' : 0,
   'exp' : lifetime
}
access_token = jwt.encode(payload, self.secret, algorithm="HS256")
```

- 在 Token 生成过程中使用唯一标识符（如 nonce）防止重放攻击。
- 在服务端维护 Token 使用历史，拒绝同一个 Token 被多次使用。

### 2.4 Token 泄露与窃取风险

**技术要点：**

如果 JWT 在不安全的传输渠道中传递，如使用 HTTP 而非 HTTPS，攻击者可以通过中间人攻击拦截并获取 JWT。

**解决方案：**

- 始终使用 HTTPS 传输 JWT，避免中间人攻击。
- 避免在 URL 中传递 JWT，因为 URL 可能被日志记录。

### 2.5 JWT Header 参数注入伪造自签名

JSON Web Signature (JWS) RFC 中定义的 Header 参数，最基本的 JWT header 是以下 JSON。

```
{
   "typ": "JWT",
   "alg": "HS256"
}
```

其他在 RFC 中注册的 Header 参数包括：jwk、jku、kid 等：

- `jwk(JSON Web Key)`：提供一个代表密钥的嵌入式 JSON 对象
- `jku(JSON Web Key Set URL)`：提供一个 URL，服务器可以从这个 URL 获取一组包含正确密钥的密钥
- `kid(Key ID)`：提供一个 ID，在有多个密钥可供选择的情况下服务器可以用它来识别正确的密钥，根据键的格式这可能有一个匹配的 kid 参数

这些用户可控制的 Header 参数每个都告诉服务端在验证签名时应该使用哪个密钥，如果服务端配置存在缺陷，通过这些参数的注入可伪造合法的自签名 JWT。

通过 jwk 参数注入自签名 JWT：

**示例：**

```
{
   "kid": "ed2Nf8sb-sD6ng0-scs5390g-fFD8sfxG",
   "typ": "JWT",
   "alg": "RS256",
   "jwk": {
       "kty": "RSA",
       "e": "AQAB",
       "kid": "ed2Nf8sb-sD6ng0-scs5390g-fFD8sfxG",
       "n": "yy1wpYmffgXBxhAUJzHHocCuJolwDqql75ZWuCQ_cb33K2vh9m"
   }
}
```

**技术要点：**

理想情况下，服务端应仅使用有限的公钥白名单来验证 JWT 签名。但是，配置错误的服务端有时会使用 jwk 参数中嵌入的任何密钥。使用自己的 RSA 私钥对修改后的 JWT 进行签名，然后在 jwk 中嵌入匹配的公钥，服务端会使用 jwk 中嵌入的公钥验证 JWT 签名，导致伪造的自签名 JWT 通过验证。

**解决方案：**

服务端正确配置公钥白名单验证 JWT 签名

>通过 jku 参数注入自签名 JWT

**示例：**

```
{"typ":"JWT","alg":"RS256", "jku":"https://hacker.com/jwks.json", "kid":"id_of_jwks"}.
{"login":"admin"}.
[Signed with new Private key; Public key exported]
```

**技术要点：**

与 jwk 不同的是，jku 参数是指向 jwk 集合文件的 URL。攻击者将 jku URL 替换为包含恶意公钥的 URL，再用配对的私钥对伪造的 Token 签名，服务端获取恶意公钥并验证伪造的 Token 为合法。

**解决方案：**

服务端使用白名单验证 jku 参数值，仅允许指定来源的 URL

>通过 kid 参数注入自签名 JWT

**示例：**

```
{
   "kid": "../../path/to/file",
   "typ": "JWT",
   "alg": "HS256",
   "k": "asGsADas3421-dfh9DGN-AFDFDbasfd8-anfjkvc"
}
```

**技术要点：**

服务端可能使用多个密钥对不同种类的数据签名，因此 JWT 的 Header 参数可能包含 kid(Key ID)参数，让服务端在验证签名时确定使用哪个密钥，验证的密钥通常存储为一个 JWK 集合，在这种情况下服务端可能简单地查找与 Token 具有相同 kid 的 JWK，然而 JWS 规范没有为 kid 定义具体的结构——它只是开发人员选择的任意字符串，例如:它们可能使用 kid 参数指向数据库中的特定条目，甚至是文件的名称，如果这个参数也存在目录遍历漏洞，则攻击者可能会强制服务端使用其文件系统中的任意文件作为验证密钥，例如 ../../../../../../../dev/null，由于这是一个空文件，读取它会返回一个空字符串。因此，使用空字符串对 Token 进行签名将得到能通过服务端验证的合法签名。

**解决方案：**

服务端使用白名单验证 kid 参数值。

## 三、JWT 在业务场景的攻击面

### 3.1 敏感信息泄露

**技术要点：**

JWT 的 Payload 是 Base64 编码，而非加密，因此内容可以被轻易解析。如果在 Payload 中包含敏感信息（如用户的身份、邮箱等），可能会造成信息泄露。

**示例：**

```
{"SSN": "123-45-6789","email": "user@example.com","role": "admin"}
```

攻击者可以轻易解码 Base64 部分，得到这些敏感数据。

**解决方案：**

- 避免在 JWT 的 Payload 中存储敏感信息，使用标识符（如 userId），而非明文信息。

```
payload = jwt.decode(token, self.secret, algorithms="HS256")
userId = payload['userId']
password = self.db_lookup(userId, "password")
```

- 如果必须包含敏感信息，应使用加密机制对 Payload 进行加密。

### 3.2 身份验证逻辑错误导致 JWT 可混用

**技术要点：**

在某些场景中，如果不同身份类型的 JWT（如管理员和普通用户的 Token）没有严格区分，可能导致权限提升等问题。

**示例：** 某服务允许用户使用普通用户的 JWT 访问管理员接口，攻击者可以利用此漏洞提升权限：

```
POST /admin/manage/add HTTP/2
Authorization: Bearer user_token_with_low_permissions
```

**解决方案：**

- 在业务逻辑中增加对 Token 类型、权限的校验，确保不同身份的 Token 不能混用。
- 在 JWT Payload 中明确用户的角色，并在服务端验证其权限。
- 如果管理员和普通用户的 JWT 都是对称加密类型，则使用不同的密钥签名、验证。

### 3.3 跨服务中继攻击

**技术要点：**

在多服务场景中，如果未指定 audience 限制 Token 仅能访问指定的应用程序，可能导致 A 应用程序的 Token 能在 B 应用程序中合法使用，可能导致权限提升。

**示例：** A 服务允许用户使用 B 服务生成的 JWT 访问，攻击者可以利用此漏洞扩展访问权限：

```
Host:appA
Authorization: Bearer user_token_made_by_appB
```

**解决方案：**

- 多服务场景中，各服务单独验证 audience 防止其他服务的 Token 访问

```
payload = jwt.decode(token, self.secret, audience=["appB"], algorithms="HS256")
```

- 如果各服务的 JWT 都使用对称加密类型算法，则各服务使用不同的密钥签名、验证

### 3.4 注入与越权常规风险

**技术要点：**

攻击者可能试图构造恶意的 JWT，以绕过权限检查或注入恶意数据，造成越权操作。

**示例：** 攻击者构造如下 Payload，试图绕过权限检查：

```
{"userId": "123","role": "admin"}
{"userId": "123","username": "admin' or 1=1#","password": "null"}
```

如果服务端没有严格验证 Token 的合法性，攻击者可能获得管理员权限。

**解决方案：**

- 严格验证 JWT 的签名、算法和格式，确保 Token 未被篡改。
- 在每个业务接口中，正确处理 Token 权限校验，避免越权操作；对 JWT 中提交的数据进行过滤处理，防止恶意数据影响业务。

## 四、JWT 测试

**针对 JWT 的完整测试流程**

[https://github.com/ticarpi/jwt_tool/wiki/Attack-Methodology](https://github.com/ticarpi/jwt_tool/wiki/Attack-Methodology)

**开始：**

- 查找 JWT
- 查找测试接口
- 重放请求检查 JWT 是否有效

**简单的检查：**

- JWT 是否必须的？
- JWT 是否校验签名？
- JWT 能否持续使用？
- JWT 是否在客户端生成？
- 接口是否先校验 JWT 再处理 Payload？
- 对称加密算法的 JWT 是否使用了弱密钥？

**测试已知漏洞：**

- 'none' Algorithm (CVE-2015-9235)
- RSA Key Confusion (CVE-2016-5431)
- JWKS Injection (CVE-2018-0114)
- null signature (CVE-2020-28042)

**测试其他漏洞：**

- "kid" issues - reveal key & path traversal
- URL 篡改攻击
- JWKS 欺骗

**额外检查：**

- 跨服务中继攻击/同服务身份验证逻辑错误
- JWT 是否校验有效期 exp

**更进一步：**

- 注入、越权等常规漏洞
- 模糊测试

## 五、相关工具

**JWT.io**

- [https://jwt.io/](https://jwt.io/)
- 一个在线工具，可以解析和调试 JWT，帮助开发者查看 JWT 的内容和签名算法，识别常见问题。

**JWT Tool**

- [https://github.com/ticarpi/jwt_tool](https://github.com/ticarpi/jwt_tool)
- 用于分析、生成和攻击 JWT 的工具，支持算法混淆攻击等多种手段。

**jwtcrack**

- [https://github.com/Sjord/jwtcrack](https://github.com/Sjord/jwtcrack)
- 字典枚举破解 HS256, HS384 或 HS512 加密算法的 JWT

**CyberChef**

- [https://gchq.github.io/CyberChef/](https://gchq.github.io/CyberChef/)
- 用于 JWT 验证、解码、签名的在线工具

**JWS 库**

- 提供生成和验证 JWT 的库，支持多种签名算法，可用于实现安全的 Token 处理逻辑。

**Burp Suite 插件**

- Burp Suite 插件市场
- sign-saboteur：[https://github.com/d0ge/sign-saboteur](https://github.com/d0ge/sign-saboteur)：用于编辑、签名、验证各种签名的 Web Token

> 参考链接：[https://mp.weixin.qq.com/s/O8Er8UmlFrER2LAkdcXCjA](https://mp.weixin.qq.com/s/O8Er8UmlFrER2LAkdcXCjA)，整理：沉默王二
