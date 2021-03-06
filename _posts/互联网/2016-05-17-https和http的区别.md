---
layout: post
title: "Https和Http的区别"
description: "本文讲述了Http和Https的区别,Https的误区,网站是否需要换成Https"
tags: [Http,Https]
categories: 互联网
---

* TOC
{:toc}

![Https和Http](/blog/images/posts_imgs/201605170101.jpeg)

### Https和Http的区别
1、Https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。

2、Http是超文本传输协议，信息是明文传输，Https则是具有安全性的ssl加密传输协议。

3、Http和Https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。

4、Http的连接很简单，是无状态的；Https协议是由SSL+Http协议构建的可进行加密传输、身份认证的网络协议，比Http协议安全。

### 网站是否需要采用Https加密
如果你的网站属于电子商务、金融、社交网络等领域的话，那最好是采用Https协议；如果是博客站点、宣传类网站、分类信息网站、或者是新闻网站之类的话，大可不必跟风而行，毕竟Https协议不仅耗钱，浪费精力，而且暂时也不利于网站的SEO工作。总而言之，切勿为了排名而盲目跟风，网站优化的首要目标是用户，用户喜欢，好排名就不会那么难了！

### Http的误区

**1.Https无法缓存**

其实只要头命令中有Cache-Control: Public，缓存就会被写到硬盘上。

**2.SSL证书很贵**

如果你在网上搜一下，就会发现很多便宜的SSL证书，大概10美元一年，这和一个.com域名的年费差不多。而且事实上，还能找到免费的SSL证书。
在效力上，便宜的证书当然会比大机构颁发的证书差一点，但是几乎所有的主流浏览器都接受这些证书。

**3.Https站点必须有独享的IP地址**

由于IPv4将要分配完毕，所以很多人关心这个问题。但是，如果你使用子域名通配符SSL证书，就能在一个IP地址上部署多个Https子域名。比如，

```markdown
Https://www.Httpwatch.com和Https://store.Httpwatch.com，就共享同一个IP地址。
```

**4.转移服务器时要购买新证书**

很多服务器，如IIS，也支持证书的导入导出，所以转移服务器时并不需要购买新证书

**5.Https太慢**

第一次打开网页的时候，Https协议会比Http协议慢一点，这是因为读取和验证SSL证书的时间。但是，一旦有效的Https连接建立起来，再刷新网页，两种协议的速度几乎没有区别。而且也有很多方法可以加快网页的速度，如：压缩文本内容。

**6.有了Https，Cookie和查询字符串就安全了**

虽然无法直接从Https数据中读取Cookie和查询字符串，但是仍然改变Cookie值从而劫持其他人的session id。至于查询字符串，也可以通过[类似方式](Http://blog.Httpwatch.com/2009/02/20/how-secure-are)query-strings-over-Https/)泄漏。

**7.只有注册登录页，才需要Https**

以Twitter为例，它的登录页使用了Https，但是登录以后，其他页面就变成了Http。这时，它的cookie里的session值就暴露了。也就是说，这些cookie是在Https环境下建立的，但是却在Http环境下传输。如果有人劫持到这些cookie，那他就能以你的身份在Twitter上发言了。

### 参考资料
1.Https的七个误解 Http://blog.Httpwatch.com/2011/01/28/top-7-myths-about-Https/

2.Http与Https的区别 Http://www.mahaixiang.cn/internet/1522.html