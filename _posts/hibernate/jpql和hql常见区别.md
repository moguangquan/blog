---
layout: post
title: "jpql和hql常见区别"
description: "jpql和hql在使用上的常见区别（不全）"
tags: [jpql,hql]
categories:hibernate
---

常见区别一：
hql对sql中的Positional parameters和Named parameters的使用方式是相同的，而jpql对Positional parameters有些不同

以下是两者在Positional parameters区别的例子

String queryString = "select c from Customer c where c.name = ?1  or c.nickName = ?1";

HQL
```java
List customers = session.createQuery( queryString ).setParameter( "1", theNameOfInterest ).list();//注意1带有双引号("")

```
JPQL
```java
List<Customer> customers = entityManager.createQuery( queryString, Customer.class ).setParameter( 1, theNameOfInterest ).getResultList(); //1不带有""
```

常见区别二：
jpql可以直接转为hql，而hql却不一定能转为jpql

常见区别三：
hibernate不强迫jpql的sql语句是必须select的，而hql却被支持可以不用select

常见区别四：
hql支持使用特殊的insert语句,但jpql不支持：

```java
String hqlInsert = "insert into DelinquentAccount (id, name) <u>select c.id, c.name from Customer c where ...</u>";
int createdEntities = s.createQuery( hqlInsert ).executeUpdate();//直接可以根据查询出来的id和name 放入到DelinquentAccount (id, name)
```

常见区别五：
hql支持在使用join关联方式的时候，使用特殊方式来添加条件，而jpql不支持

正常sql:
```html
select distinct c from Customer c left outer join c.orders o where o.value > 5000.00
```

特殊sql:
```java
select distinct c from Customer c left join c.orders o with o.value > 5000.00
```


