---
layout: post
title: "jdk-timer、spring-task、quartz的比较"
description: "这篇文章将简单介绍目前常用的定时任务框架!"
tags: [java]
categories: java
isOriginal: true
---

* TOC
{:toc}

#### 一、介绍
- **JDK-Timer**，简单无门槛，Timer位于java.util包下，其内部包含且仅包含一个后台线程（TimeThread）对多个业务任务（TimeTask）进行定时定频率的调度。因此Timer存在管理并发任务的缺陷：所有任务都是由同一个线程来调度，所有任务都是串行执行，意味着同一时间只能有一个任务得到执行，而前一个任务的延迟或者异常会影响到之后的任务。
但在JDK5之后便提供了基于线程池的定时任务调度：ScheduledExecutorService。每一个被调度的任务都会被线程池中的一个线程去执行，因此任务可以并发执行，而且相互之间不受影响。

总结下Timer的缺点：
1. Java定时器没有持久化机制，如果Timer抛出RuntimeException，那么Timer会停止所有任务的运行。
2. Java定时器的日程管理不够灵活（只能设置开始时间、重复的间隔，设置特定的日期、时间等
3. Java定时器没有使用线程池(每个Java定时器使用一个线程)
4. Java定时器没有切实的管理方案，你不得不自己完成存储、组织、恢复任务的措施

- **Quartz**，分布式集群开源工具，功能强大，可以让你的程序在指定时间执行，也可以按照某一个频度执行，支持数据库、监听器、插件、集群。相较于Timer，Quartz增加了很多功能：

1. 持久性作业 - 就是保持调度定时的状态;
2. 作业管理 - 对调度作业进行有效的管理;
3. [cron表达式](cron表达式详解) - 强大的调度配置，胜任适合复杂任务的调度;

缺点：
1. Quartz是一个重量级框架，使用起来不方便，学习成本比Timer高。

- **spring-task**，Spring3.0以后自主开发的定时任务工具，spring task，可以将它比作一个轻量级的Quartz，而且使用起来很简单，除spring相关的包外不需要额外的包。默认单线程串行同步执行，一个任务执行完上一次之后，才会执行下一次调度，多任务并行执行需要设置线程池 。

- **Spring Quartz**,Spring对Quartz作了一个封装，默认多线程异步执行，一个任务在上一次调度未完成执行，下一次调度时间到时，会另起一个线程开始新的调度。在业务繁忙时。一个任务或许会有多个线程在执行，导致数据处理异常的情况，这样也根据需要是否可以开启单任务同步配置属性。如果是多个任务同时运行，任务之间没有直接的影响，多任务执行的快慢取决于CPU的性能。

- 分布式调度框架比较

![分布式调度框架比较](/blog/images/posts_imgs/202002230101.png)

#### 二、使用


- **spring-quartz**的使用，其主要步骤如下：

```
0. 导入需要的jar包或添加依赖，主要有spring-context-support、spring-tx、quartz;

1. 编写被调度类和被调度方法，即需要定时执行的类和方法；

2. 在spring容器中注册被调度类，单个注册或包扫描均可；

3. 在spring容器中注册作业类(MethodInvokingjOBdetailFactoryBean)，并注入被调度类和被调度方法，一般每个被调度方法需要注册一个作业类；

4. 在spring容器中注册触发器，并注入对应的作业类和触发条件，一般每个作业类需要注册一个触发器；触发器是用来指定被调度方法的执行时间的，根据触发条件的不同，有两个类可以选择：

(1) SimpleTriggerFactoryBean，只能指定间隔固定时长执行，例如每隔5秒钟执行一次；

(2) CronTriggerFactoryBean，既可以指定间隔固定时长执行，也可以指定某个或某几个时刻执行，例如每周三下午16点；

5. 在spring容器中注册调度工厂(ScheduerFactoryBean)，并注入需要的触发器，可以注入一个或多个触发器。
```

- **spring-task**的使用，其主要步骤如下：

```
1.在spring配置文件头中添加命名空间及描述

<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:task="http://www.springframework.org/schema/task"
    。。。。。。
    xsi:schemaLocation="http://www.springframework.org/schema/task http://www.springframework.org/schema/task/spring-task-3.0.xsd">

2. 开启Spring注解扫描，将Bean的创建交由Spring进行管理。用于创建Scheduler声明
<context:component-scan base-package="com.unben.scheduler" />
3. 创建TreadPoolTaskScheduler实例，并指定该线程池初始大小。
  <task:scheduler id="taskScheduler" pool-size="5" />
4. 如果使用注解方式则配置注解配置，如果使用xml配置则需要配置具体任务。
   方式1：开启SpringTask注解驱动。作用：识别Task相关注解，如“@Scheduled”
配置：<task:annotation-driven/>
代码：
    @Scheduled(cron = "0 0 3 * * ?")
    public void job1() {
        System.out.println(“任务进行中。。。”);
    }
   方式2：spring配置文件中设置具体的任务
     <task:scheduled-tasks>
        <task:scheduled ref="taskJob" method="job1" cron="0 * * * * ?"/>
    </task:scheduled-tasks>
注意：SpringTask的触发器实现方案有两种，一种是基于Cron表达式的CronTrigger触发器，方式是使用cron属性；另一种是基于接受固定周期的PeriodicTrigger触发器，方式是使用initial-delay、fixed-delay、fixed-rate属性。

```

#### 三、参考资料

0. [任务调度的方式：Timer、ScheduledExecutorService、spring task、quartz、XXL-JOB、Elastic-Job](https://www.cnblogs.com/xiang--liu/p/9710127.html)

1. [分布式定时任务调度系统技术解决方案(xxl-job、Elastic-job、Saturn)](https://www.cnblogs.com/rainswinds/p/10930495.html)

2. [cron表达式在线生成工具](https://www.pppet.net/)

3. [Quartz Spring与Spring Task总结](http://www.blogjava.net/bolo/archive/2015/03/12/423408.html)