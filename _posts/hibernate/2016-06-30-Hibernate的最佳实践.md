---
layout: post
title: "Hibernate的最佳实践"
description: "Hibernate的最佳实践,学完Hibernate的来看看也是不错的"
tags: [最佳实践,hibernate]
categories: hibernate
---

* TOC
{:toc}

- 多对多连接可以转为使用两个指向中间表的一对多的连接比较好

- 在做关系尽可能使用单向关联，不要使用双向关联

- 在大项目中，（数据量如果超过百万条的项目），使用Hibernate可以酌情考虑一下几个原则：

 - 1.不要使用对象关联，尽可能用冗余字段来替代外键（使用冗余字段所带来的问题就是在修改时必须修改所有的冗余字段）

 - 2.当某些操作对系统的性能带来瓶颈时，这些操作也许直接使用JDBC方式会更好。如：**查询数据不再使用HQL，而使用SQL查询**，如果涉及缓存，自己根据情况加入相应的缓存，而不是使用Hibernate的缓存。

　　2.1如果查询的是单张数据库表的信息

```java
Session =HibernateUtil.openSession();
List<Student> stus=session.createSQLQuery("select * from t_stu where name like ?")
      .addEntity(Student.class)
      .setParameter(0,"%莫%")
      .list();
```

　　2.2如果查询的是多张数据库表的关联信息

```java
Session session=null;
try{
      session=HibernateUtil.openSession();
      List<Object[]> stus=session.createSQLQuery("select (stu.*),(cla.*),(spe.*) from "+
           "t_stu stu left join t_classroom cla on(stu.cid=cid.id) "+
           "left join t_special spe on(spe.id=cla.spe_id) where stu.name like ?")
           .addEntity("stu",Student.class)
           .addEntity("cla",Classroom.class)
           .addEntity("spe",Special.class)
           .setParameter(0,"%莫%")
           .setFirstResult(0).setMaxResults(10)
           .list();
           Student stu=null;
           Classroom cla=null;
           Special spe=null;
           for(Object[] obj:suts){
                 stu=(Student)obj[0];
                 stu=(Classroom)obj[1];
                 stu=(Special)obj[2];
 System.out.println(stu.getName()+","+cla.getName()+","+spe.getName());
           }
}
```

2.3使用DTO(只用于传输属性的对象，并不用于与数据库的交互)代替类对象：

```java
Session session=null;
try{
      session =HibernateUtil.openSession();
      List<StudentDto> stus=session.createSQLQuery("select stu.id as sid,stu.name as name,"+
           "stu.sex as sex,cla.name as cname,spe.name as spename from "+
           "t_stu stu left join t_classroom cla on(stu.cid=cls.id) "+
           "left join t_special spe on(spe.id=cls.spe_id) where stu.name like ?")
 .setResultTransformer(Transformers.aliasToBean(StudentDto.class))//将结果集进行一次封装，封装成StudentDto对象,方便service层代码的取用
           .setParameter(0,"%莫%")
           .setFirstResult(0).setMaxResult(10)
           .list();
      for(StudentDto sd:stus){
           System.out.println(sd);
      }
}
```

- 就像在 JDBC 编程中一样，应该总是用占位符 "?" 来替换非常量值，不要在查询中用字符串值来构造非常量值。你也可以考虑在查询中使用命名参数。

- 不要自己来管理 JDBC 连接：

Hibernate 允许应用程序自己来管理 JDBC 连接，但是不推荐。如果你不能使用 Hibernate 内建的 connections providers，那么考虑实现自己来实现org.hibernate.connection.ConnectionProvider。

- 考虑使用用户自定义类型（custom type）：

如果持久化的类没有提供映射操作需要的存取方法，那么该类才可以通过实现org.hibernate.UserType接口，来实现类属性类型与 Hibernate type之间的相互转换。

- 当异常发生的时候，必须要回滚Transaction ，关闭 Session。

- 对于关联来说，若其目标是无法在第二级缓存中完全缓存所有实例的类，应该使用代理（proxies）与/或具有延迟加载属性的集合（lazy collections）。若目标是可以被缓存的，尤其是缓存的命中率非常高的情况下，应该使用lazy="false"
