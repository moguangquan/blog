---
layout: post
title: "shell脚本[svn更新maven编译tomcat发布]"
description: "工作中用到的关于项目在Linux中的发布脚本"
tags: [shell]
categories: 工具
---

* TOC
{:toc}

### 1.svn更新

```shell
 #!/bin/bash

DIR=`dirname $0`
echo $DIR
cd $DIR

svn update ./branches/ndev/crmapp
svn update ./branches/ndev/crmlib
```

### 2.maven编译

```shell
#!/bin/sh
DIR=`dirname $0`
cd $DIR
DIR=`pwd`
crmapp=${DIR}/branches/ndev/crmapp/crm-app

cd ${crmapp}
mvn  -e -T2 -Dmaven.test.skip=true clean install  deploy

cp /data/crm/deploy/branches/ndev/crmapp/crm-service/crm-dev/target/crm-dev-1.0.2-SNAPSHOT/WEB-INF/lib/crm*.jar /data/crm/deploy/branches/ndev/crmlib/crmjar

svn commit -m ""  /data/crm/deploy/branches/ndev/crmlib/crmjar
```

### 3.tomcat发布

```shell
hostInfo="crmsca1@132.126.2.236"
    password=XXXX
    binPath=/data/crm/crmsca1/tomcat/bin ###tomcat路径
    jarPath=/data/crm/deploy/branches/ndev/crmlib/crmjar  ###svn项目jar包的路径
    libPath=/data/crm/crmsca1/tomcat/webapps/crmsca1/WEB-INF/lib ###项目jar包的路径
    jarFiles=crm-common-1.0.2-SNAPSHOT.jar,crm-entity-1.0.2-SNAPSHOT.jar,crm-repository-1.0.2-SNAPSHOT.jar ###项目的jar包

    ####把项目jar包先放到/WEB-INF/lib下进行备份 start
    bakupDir="bakup`date -d today +"%Y%m%d%H%M%S"`"
    expect << EOF
        set timeout 2
        spawn ssh ${hostInfo}
        expect {
            "yes/no" {send "yes\r";exp_continue}
            "password:" {send "${password}\r";exp_continue}
            "Permission denied*" {send_user "invalid password or account\n";exit}
        }
        expect "]*"
        send "cd ${libPath}\r"
        send "mkdir ./${bakupDir}\r"
        send "cp ./*.jar ./${bakupDir}\r" ###备份jar包
        send "exit\r"
        expect eof
    EOF
    ####把项目jar包先放到/WEB-INF/lib下进行备份 end

    ####把项目jar包放到/WEB-INF/lib
    source=`find "${jarPath}" -name "*.jar" | grep "${jarFiles//,/\|}"`
    #echo "$source"
    source=`echo ${source}`

    expect << EOF
        spawn scp ${source} ${hostInfo}:${libPath}
        expect {
            "yes/no" {send "yes\r";exp_continue}
            "password:" {send "${password}\r";exp_continue}
            "Permission denied*" {send_user "invalid password or account\n";exit}
        }
    EOF
    ####把项目jar包放到/WEB-INF/lib end

    ####重启tomcat start
    expect << EOF
        set timeout 5
        spawn ssh ${hostInfo}
        expect {
            "yes/no" {send "yes\r";exp_continue}
            "password:" {send "${password}\r";exp_continue}
            "Permission denied*" {send_user "invalid password or account\n";exit}
        }
        expect "]*"
        send "cd ${binPath}\r"
        send "./webkill.sh -y\r"
        send "./start.sh &\r"
        send "exit\r"
        expect eof
    EOF
    echo "restart $1 over!"
    ####重启tomcat end
    echo "deploy $1 over!"
```
