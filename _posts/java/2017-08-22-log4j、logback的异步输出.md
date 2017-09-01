---
layout: post
title: "log4j、logback的异步输出"
description: "在开发阶段或初步上线的项目来说，必定存在频繁和大量的日志记录，尝试考虑采用异步方式的话或许能给项目性能带来提升!"
tags: [java,日志规范]
categories: java
---

* TOC
{:toc}

### 1.场景

磁盘IO操作、网络IO操作、JDBC操作等都是非常耗时的，往往我们也需要在这些地方来写日志记录。对于频繁和大量的日志记录，采用异步方式的话可以将这些日志记录耗时的操作从主线程当中分离出去来实现性能的提升，当然是在线程间同步开销小于耗时操作时使用异步方式才真正有效 ！

### 2.原理

**AsyncAppender** 并不处理日志，只是将日志缓冲(logging Event)到一个Buffer（如：BlockingQueue）里面去，并在内部创建一个工作线程(worker)从队列头部获取日志，之后将获取的日志循环记录到附加的**其他appender**上去，从而达到不阻塞主线程的效果。因此AsynAppender仅仅充当事件转发器，**必须引用另一个**appender来做事。

### 3.实现

#### logback的异步日志设置

```xml
<appender name="FILE" class= "ch.qos.logback.core.rolling.RollingFileAppender">
    <!-- 按天来回滚，如果需要按小时来回滚，则设置为{yyyy-MM-dd_HH} -->
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
         <fileNamePattern>/crm/test.%d{yyyy-MM-dd}.log</fileNamePattern>
         <!-- 如果按天来回滚，则最大保存时间为1天，1天之前的都将被清理掉 -->
         <maxHistory>30</maxHistory>
    <!-- 日志输出格式 -->
    <layout class="ch.qos.logback.classic.PatternLayout">
         <Pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} -%msg%n</Pattern>
    </layout>
</appender>
<!-- 异步输出 -->
<appender name ="ASYNC" class= "ch.qos.logback.classic.AsyncAppender">
    <!-- 不丢失日志.默认的,如果队列的80%已满,则会丢弃TRACT、DEBUG、INFO级别的日志 -->
    <discardingThreshold >0</discardingThreshold>
    <!-- 更改默认的队列的深度,该值会影响性能.默认值为256 -->
    <queueSize>512</queueSize>
    <!-- 添加附加的appender,最多只能添加一个 -->
 <appender-ref ref ="FILE"/>
</appender>

<root level ="trace">
    <appender-ref ref ="ASYNC"/>
</root>
```

#### log4j的异步日志设置

```xml
<appender name="DRFOUT" class="org.apache.log4j.DailyRollingFileAppender">
 <param name="File" value="logs/brws.log" />
 <param name="Append" value="true" />
 <param name="DatePattern" value="yyyy_MM_dd'.'" />
 <layout class="org.apache.log4j.PatternLayout">
     <param name="ConversionPattern" value="%d [%t] %-5p %l %x - %m%n" />
 </layout>
</appender>

<appender name="ASYNCOUT" class="org.apache.log4j.AsyncAppender">
 <param name="BufferSize" value="512" />
<appender-ref ref="DRFOUT" />
</appender>
```

### 4.总结

除了设置异步的方式外，通过遵守 [java日志记录规范](https://moguangquan.github.io/blog/java/java%E6%97%A5%E5%BF%97%E8%AE%B0%E5%BD%95%E8%A7%84%E8%8C%83/) 、设置缓存、对上线的项目设置其日志记录级别为Error、Warn、使用slf4j等也可以提高日志的读写效率。

### 5.参考资料

1. [log4j日志输出性能优化-缓存、异步](http://www.cnblogs.com/atwanli/articles/5626590.html)
