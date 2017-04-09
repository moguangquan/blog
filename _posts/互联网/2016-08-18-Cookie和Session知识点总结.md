---
layout: post
title: "Cookie和Session知识点总结"
description: "比较详细地总结了cookie和session的知识点"
tags: [Cookie,Session]
categories: 互联网
---

* TOC
{:toc}

### 概要

会话是用来确定这个请求是属于哪个用户的，Web应用程序是使用HTTP协议传输数据的，而HTTP协议是无状态的协议，因此就需要跟踪会话来弥补，常用的会话跟踪技术是Cookie与Session。

Cookie实际上是一小段的文本信息，为了记录用户在一段时间内访问 Web 应用的行为路径，存储在客户端上，但是每次客户端的访问都必须传回这些 Cookie，如果 Cookie 很多，这无形地增加了客户端与服务端的数据传输量，而 Session 的出现正是为了解决这个问题。

不同的浏览器采用不同的方式保存Cookie。
IE浏览器会在“C:\Documents and Settings\你的用户名\Cookies”文件夹下以文本文件形式保存，一个文本文件保存一个Cookie。

### Cookie的工作原理

客户端请求服务器，如果服务器需要记录该用户状态，就使用response向客户端浏览器颁发一个Cookie。客户端浏览器会把Cookie保存起来。当浏览器再请求该网站时，浏览器把请求的网址连同该Cookie一同提交给服务器。服务器检查该Cookie，以此来辨认用户状态。服务器还可以根据需要修改Cookie的内容。

### Session的工作原理

当程序需要为某个客户端的请求创建一个session的时候，服务器首先检查这个客户端的请求里是否已包含了一个session标识 - 称为 "session id"，如果已包含一个"session id"则说明以前已经为此客户端创建过session，服务器就按照"session id"在session表把这个 session检索出来使用，如果客户端请求不包含"session id"，则为此客户端创建一个session（注意只有访问JSP、Servlet等程序时才会创建Session，只访问HTML、IMAGE等静态资源并不会创建Session）并且生成一个与此session相关联的"session id"，这个"session id"将被在本次响应中返回给客户端保存。之后每当用户继续访问，如果Session没到期则服务器就会更新Session的最后访问时间，并维护该Session。

### cookie和session的区别

Cookie通过在客户端记录的信息确定用户身份，Session通过在服务器端记录的信息确定用户身份。
Session是服务器端使用的一种记录客户端状态的机制，使用上比Cookie简单一些，相应的也增加了服务器的存储压力。

### cookie和session的联系

服务器向客户端浏览器发送一个名为JSESSIONID的Cookie，它的值为该Session的id（也就是HttpSession.getId()的返回值）。Session依据该Cookie来识别是否为同一用户。

如果客户端浏览器将Cookie功能禁用，或者不支持Cookie时可以使用“URL地址重写”(在URL结尾加上会话ID标识参数和值,服务器通过会话ID识别不同用户)或隐藏表单域(将会话ID埋入HTML表单隐藏域提交到服务端。

### cookie注意点

- Cookie功能需要浏览器的支持。如果浏览器不支持Cookie（如大部分手机中的浏览器）或者把Cookie禁用了，Cookie功能就会失效。

- Cookie在客户端是由浏览器来管理的，而浏览器判断一个网站是否能操作另一个网站Cookie的依据是域名。Google与Baidu的域名不一样，因此Google不能操作Baidu的Cookie。如：JavaScript只能够任意地读写同一个域名下的Cookie

- Cookie内容不宜过多，否则影响请求处理速度。

### Session的注意

- Session保存在服务器端。为了获得更高的存取速度，服务器一般把Session放在内存里。每个用户都会有一个独立的Session。如果Session内容过于复杂，当大量客户访问服务器时可能会导致内存溢出。因此，Session里的信息应该尽量精简。

- Session 的致命弱点是不容易在多台服务器之间共享，所以这也限制了 Session 的使用。

### cookie的api 简述

Java中把Cookie封装成了javax.servlet.http.Cookie类。通过request.getCookie()获取客户端提交的所有Cookie（以Cookie[]数组形式返回），通过response.addCookie(Cookiecookie)向客户端设置Cookie。

### Session的api 简述

Session对应的类为javax.servlet.http.HttpSession类。Session也是一种key-value的属性对，通过getAttribute(String key)和setAttribute(String key，Object value)方法读写客户状态信息。Servlet里通过request.getSession()方法获取该客户的Session。

### 额外

1.**一致性分布式Session的解决**：提供分布式缓存来存储和写入Session，从而减轻服务端的内存压力。另外，为了保证一些应用对 Session 稳定性的特殊要求可以将一些非常关键的 Session 再存储到客户端 Cookie 中，如当分布式缓存存在问题时，因为Cookie中有部分关键的Session数据，这样即使分布式缓存出现问题也不会影响关键业务的正常运行。

2.**如果在一个域名下已经登录成功，如何访问到另外一个域名的应用且保证登录状态仍然有效**？这就需要实现 Session同步，需要另外一个跳转应用，这个应用可以被一个或者多个域名访问，它的主要功能是从一个域名下取得 sessionID,并通过Cookie同步到另外一个域名下。

### 参考资料

1. [如何区分不同用户——Cookie/Session机制详解](http://www.cnblogs.com/zhouhbing/p/4204132.html)

2. [Android与WEB服务器交互时，如何保证在同一个会话Session中通信](http://blog.csdn.net/zht666/article/details/22571713)

3. [深入理解 Session 与 Cookie](http://blog.csdn.net/xz0125pr/article/details/49339691)
