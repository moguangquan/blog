---
layout: post
title: "RESTful API 设计最佳实践"
description: "本文介绍了几种简洁 RESTful API 设计的最佳实践"
tags: [最佳实践]
categories: 互联网
isOriginal: false
---

* TOC
{:toc}

当你开始写一个app的时候，特别是后端模型部分已经写完的时候，你不得不殚精竭虑的设计和实现自己app的public API部分。因为一旦发布，对外发布的API将会很难改变。所以我们应该设计出容易使用，容易部署，并且足够灵活的API。

**REST 服务按照成熟度划分成 4 个层次：**

*   第一个层次（Level 0）的 Web 服务只是使用 HTTP 作为传输方式，实际上只是远程方法调用（RPC）的一种具体形式。SOAP 和 XML-RPC 都属于此类。

*   第二个层次（Level 1）的 Web 服务引入了资源的概念。每个资源有对应的标识符和表达。

*   第三个层次（Level 2）的 Web 服务使用不同的 HTTP 方法来进行不同的操作，并且使用 HTTP 状态码来表示不同的结果。如 HTTP GET 方法来获取资源，HTTP DELETE 方法来删除资源。

*   第四个层次（Level 3）的 Web 服务使用 HATEOAS。在资源的表达中包含了链接信息。客户端可以根据链接来发现可以执行的动作。

#### 使用名词来定义接口

| 源 | GET | PUT | POST | DELETE |
|:-:|:-:|:-:|
| 一组资源的URI，比如`http://www.waylau.com/resources/` | 列出 URI，以及该资源组中每个资源的详细信息（后者可选）。 | 使用给定的一组资源替换当前整组资源。 | 在本组资源中创建/追加一个新的资源。 该操作往往返回新资源的URL。 | 删除 整组资源。 |
| 单个资源的URI，比如`http://www.waylau.com/resources/142` | 获取 指定的资源的详细信息，格式可以自选一个合适的网络媒体类型（比如：XML、JSON等） | 替换/创建 指定的资源。并将其追加到相应的资源组中。 | 把指定的资源当做一个资源组，并在其下创建/追加一个新的元素，使其隶属于当前资源。 | 删除 指定的元素。 |

#### 使用子资源来表达资源间的关系

```
GET /cars/711/drivers/  返回 711 号 car 的所有 driver 列表
GET /cars/711/drivers/4 返回 711 号 car 的 4 号 driver
```

#### 更新和创建操作应该返回资源

PUT、POST、PATCH 操作在对资源进行操作的时候常常有一些副作用：例如created_at,updated_at 时间戳。为了防止用户多次的API调用（为了进行此次的更新操作），我们应该会返回更新的资源（updated representation.）例如：在POST操作以后，返回201 created 状态码，并且包含一个指向新资源的url作为返回头

#### 只提供json作为返回格式

现在开始比较一下XML和json了。XML即冗长，难以阅读，又不适合各种编程语言解析。当然XML有扩展性的优势，但是如果你只是将它来对内部资源串行化，那么他的扩展优势也发挥不出来。很多应用（youtube,twitter,box）都已经开始抛弃XML了。

#### 在post,put,patch上使用json作为输入

很多的API使用url编码格式：就像是url查询参数的格式一样：单纯的键值对。这种方法简单有效，但是也有自己的问题：它没有数据类型的概念。这使得程序不得不根据字符串解析出布尔和整数,而且还没有层次结构–虽然有一些关于层次结构信息的约定存在可是和本身就支持层次结构的json比较一下还是不很好用。

对于复杂的API你应该使用json。或者干脆统一使用json。
注意使用json传输的时候，要求请求头里面加入：Content-Type：application/json.，否则抛出415异常（unsupported media type）。

#### 提供过滤、排序、字段选择、分页

**过滤： **

```
GET /cars?color=red
GET /cars?seats<=2
```

**排序：**

```
GET /cars?sort=-manufactorer,+model
```

**字段选择:**

```
GET /cars?fields=manufacturer,model,id,color
```

**分页:**

```
GET /cars?offset=10&limit=5
```

## API 版本化

版本号使用简单的序号，并避免点符号，如2.5等。正确用法如下：

```
/blog/api/v1
```

关于是否将版本信息放入url还是放入请求头有过争论：[API version should be included in the URL or in a header](http://stackoverflow.com/questions/389169/best-practices-for-API-versioning). 学术界说它应该放到header里面去，但是如果放到url里面我们就可以跨版本的访问资源了

strip使用的方法就很好：它的url里面有主版本信息，同时请求头俩面有子版本信息。这样在子版本变化过程中url的稳定的。变化有时是不可避免的，关键是如何管理变化。完整的文档和合理的时间表都会使得API使用者使用的更加轻松。

#### 永远使用SSL

毫无例外，永远都要使用SSL。你的应用不知道要被谁，以及什么情况访问。有些是安全的，有些不是。使用SSL可以减少鉴权的成本：你只需要一个简单的令牌（token）就可以鉴权了，而不是每次让用户对每次请求签名。

值得注意的是：不要让非SSL的url访问重定向到SSL的url。

#### 鉴权 Authentication

restful API是无状态的也就是说用户请求的鉴权和cookie以及session无关，每一次请求都应该包含鉴权证明。

通过使用ssl我们可以不用每次都提供用户名和密码：我们可以给用户返回一个随机产生的token。这样可以极大的方便使用浏览器访问API的用户。这种方法适用于用户可以首先通过一次用户名-密码的验证并得到token，并且可以拷贝返回的token到以后的请求中。如果不方便，可以使用OAuth 2来进行token的安全传输。

支持jsonp的API需要额外的鉴权方法，因为jsonp请求无法发送普通的credential。这种情况下可以在查询url中添加参数：access_token。注意使用url参数的问题是：目前大部分的网络服务器都会讲query参数保存到服务器日志中，这可能会成为大的安全风险。

注意上面说到的只是三种传输token的方法，实际传输的token可能是一样的。

## 充分使用 HTTP 状态码来处理错误

就像html错误页面能够显示错误信息一样，API 也应该能返回可读的错误信息–它应该和一般的资源格式一致。API应该始终返回相应的状态码，以反映服务器或者请求的状态。API应该以json形式返回。json格式的错误应该包含以下信息：一个有用的错误信息，一个唯一的错误码，以及任何可能的详细错误描述。如下：

```
{
  "code"  :  1234,
  "message"  :  "Something bad happened :-(",
  "description"  :  "More details about the error here"
}
```

对PUT,POST,PATCH的输入的校验也应该返回相应的错误信息，例如：
```
 {
  "code"  :  1024,
  "message"  :  "Validation Failed",
  "errors"  :  [
    {
      "code"  :  5432,
      "field"  :  "first_name",
      "message"  :  "First name cannot have fancy characters"
    },
    {
       "code"  :  5622,
       "field"  :  "password",
       "message"  :  "Password cannot be blank"
    }
  ]
}
```

#### 速度限制

为了避免请求泛滥，给API设置速度限制很重要。为此 [RFC 6585](http://tools.ietf.org/html/rfc6585) 引入了HTTP状态码[429（too many requests）](http://tools.ietf.org/html/rfc6585#section-4)。加入速度设置之后，应该提示用户，至于如何提示标准上没有说明，不过流行的方法是使用HTTP的返回头。

下面是几个必须的返回头（依照twitter的命名规则）：

*   X-Rate-Limit-Limit :当前时间段允许的并发请求数
*   X-Rate-Limit-Remaining:当前时间段保留的请求数。
*   X-Rate-Limit-Reset:当前时间段剩余秒数

#### 参考资料

1. [Vinay Sahni](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)