---
layout: post
title: "springboot的jar包和指定main类的方式"
description: "这篇文章总结了在springboot中在打包成jar时指定main类路径的方式"
tags: [maven]
categories: Maven
isOriginal: false
---

* TOC
{:toc}

打包成Jar文件时指定要执行的主类的方式,注意`<plugin>`都要放在`<build><plugins> XXXX</plugins></build>`里面，项目都使用spring吗，通过maven命令`mvn package`就可以打包了。

### 使用maven-jar-plugin插件打包

```xml
<!--打成jar时，设定manifest的参数，比如指定运行的Main class，还有依赖的jar包，加入classpath中-->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-jar-plugin</artifactId>
    <version>2.4</version>
    <configuration>
        <archive>
            <manifest>
                <addClasspath>true</addClasspath>
                <classpathPrefix>/data/lib</classpathPrefix>
                <mainClass>com.mo.spring.App</mainClass>
            </manifest>
        </archive>
    </configuration>
</plugin>
```

### 使用spring-boot-maven-plugin 插件打包

```xml
<properties>
    <start-class>com.mo.spring.App</start-class>
</properties>
... ...
<!--如果你的POM是继承spring-boot-starter-parent的话，则不需要下面的配置-->
<plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <version>1.3.5.RELEASE</version>
      <configuration>
        <mainClass>${start-class}</mainClass>
        <layout>ZIP</layout>
      </configuration>
      <executions>
        <execution>
          <goals>
            <goal>repackage</goal>
          </goals>
        </execution>
      </executions>
</plugin>
```

### 使用maven-shade-plugin插件打包

用于把多个jar包，打成1个jar包。一般Java项目都会依赖其他第三方jar包，最终打包时，希望把其他jar包包含在一个jar包里

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <version>2.4.3</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
            <configuration>
                <transformers>
                    <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                        <manifestEntries>
                            <Main-Class>com.mo.spring.App</Main-Class>
                            <X-Compile-Source-JDK>${maven.compile.source}</X-Compile-Source-JDK>
                            <X-Compile-Target-JDK>${maven.compile.target}</X-Compile-Target-JDK>
                        </manifestEntries>
                    </transformer>
                </transformers>
            </configuration>
        </execution>
    </executions>
</plugin>
```

### 参考资料

1. [Maven的几个常用plugin](http://www.cnblogs.com/zhangxh20/p/6298062.html)

2. [Maven生成可以直接运行的jar包的多种方式](http://blog.csdn.net/xiao__gui/article/details/47341385)
