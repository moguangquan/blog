---
layout: post
title: "Struts2和SpringMVC的请求处理流程"
description: "总结了Struts2和SpringMVC分别对请求的处理，适合面试喔!"
tags: [Struts2, SpringMVC]
categories: Struts2
---

* TOC
{:toc}

### Struts2的请求处理流程

1. 客户端发送请求；
2. 该请求经过一系列的过滤器(Filter)：其中可选过滤器ActionContextCleanUp，帮助Struts2和其他框架集成。例如：SiteMesh Plugin。
3. 接着FilterDispatcher被调用，FilterDispatcher询问ActionMapper，来决定该请求是否需要调用某个Action。
4. 若ActionMapper决定需要调用某个Action，FilterDispatcher把请求的处理交给ActionProxy。
5. ActionProxy通过Configuration Manager询问框架的配置文件，找到需要调用的Action类。
6. ActionProxy创建一个ActionInvocation的实例。
7. ActionInvocation实例调用Action的前后，涉及到相关拦截器(Intercepter)的调用。
8. 一旦Action执行完毕，ActionInvocation负责根据struts.xml中的配置找到对应的返回结果。返回结果是一个JSP或其他页面(也可以是其他的Action链)。 JSP页面展现可使用Struts2框架中的标签(该过程会涉及ActionMapper)。

![struts2](/blog/images/posts_imgs/201607120101.png)

### SpringMVC的请求处理流程

1. 客户端发送请求
2. 请求被springmvc的DispatcherServlet前端控制器捕获
3. 前端控制器对请求的URL进行解析得到请求资源标识符（URI），根据URI查找HandlerMapping获取该handler配置的所有相关的对象(包括Handler对象(Controller)及Handler对象对应的拦截器),最后以HandlerExecutionChain对象的形式返回
4. DispatcherServlet 根据获得的Handler，选择一个合适的HandlerAdapter。（附注：如果成功获得HandlerAdapter后，此时将开始执行拦截器的preHandler(...)方法）
5. DispatcherServlet通过HandlerAdapter执行handler(Controller)，返回一个ModelAndView(包含了视图逻辑名与模型数据信息)交给DispatcherServlet
6. DispatcherServlet根据返回的ModelAndView选择一个ViewResolver对其解析并获取View对象
7. 当得到真实对象的Veiw，DispatcherServlet就使用这个View对象对ModelAndView中的模型数据进行视图渲染返回视图(jsp、pdf、xml等)给客户端

![springmvc](/blog/images/posts_imgs/201607120102.png)

### 参考资料

1. [Spring MVC 流程图](http://blog.csdn.net/zuoluoboy/article/details/19766131)
