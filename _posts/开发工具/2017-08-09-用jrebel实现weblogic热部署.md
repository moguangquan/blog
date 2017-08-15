---
layout: post
title: "用jrebel实现weblogic热部署"
description: "由于大量的spring等框架的加载，导致启动很慢，修改完一个文件每次都要重启导致开发效率底下，当引入热部署后，修改类和配置文件等都不需要重启了"
tags: [热部署]
categories: 工具
---

**本方法适用环境：**

windows，weblogic10.x.x

**使用步骤：**

1.用正常的方式部署好weblogic应用，使应用能正常运行。

2.把jrebel.jar放到一英文路径下，如：C:\jrebel。

3.设置环境变量PATH。变量名输入REBEL_HOME，变量值输入步骤2的路径（如C:\jrebel），确定。

4.新建文件startWeblogic-jrebel.cmd，复制到weblogic部署的domain下面,和startWebLogic.cmd位于同一目录（如：D:\bea\user_projects\domains\newzfba）。

`startWeblogic-jrebel.cmd的内容`

```markdown
@echo off
set JAVA_OPTIONS=-javaagent:%REBEL_HOME%\jrebel.jar -Drebel.aspectj_plugin=true -Drebel.spring_plugin=true -Drebel.hibernate_plugin=true -Drebel.struts2-plugin=true -Drebel.struts1-plugin=true %JAVA_OPTIONS%
call "%~dp0\startWebLogic.cmd" %*
```

5.当需要使用热部署时候，双击startWeblogic-jrebel.cmd启动就可以了。

**可能出现的问题：**

1.虚拟机内存不够用。解决方法：到\bin\setDomainEnv.cmd文件中增加MaxPermSize的大小。

2.对某些框架不支持。解决方法：在startWeblogic-jrebel.cmd文件中加入相关框架支持，[参考官网](http://zeroturnaround.com/jrebel/features/frameworks/)

**资源下载：**

1. [jrebel.jar](https://github.com/moguangquan/CodeUtil/blob/master/jrebel/jrebel.jar)

