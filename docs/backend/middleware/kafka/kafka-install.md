---
id: kafka-install
slug: /kafka-install.md
title: kafka 安装
date: 2024-09-01
tags: [kafka, install docker]
keywords: [kafka, install,kraft]
---
 kafka 安装
## docker  单机安装

```yml
docker run -d --name kafka-server --hostname kafka-server \
    --network app-tier \
    -e KAFKA_CFG_NODE_ID=0 \
    -e KAFKA_CFG_PROCESS_ROLES=controller,broker \
    -e KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=0@kafka-server:9093 \
    -e KAFKA_CFG_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093,EXTERNAL://:9094 \
    -e KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092,EXTERNAL://localhost:9094 \ 
    -e KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER \
    -e KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,EXTERNAL:PLAINTEXT,PLAINTEXT:PLAINTEXT \
    -p 9092:9092 \
    -p 9094:9094 \
    bitnami/kafka:latest
```


:::tip
修改 `KAFKA_CFG_ADVERTISED_LISTENERS` 中 `EXTERNAL://localhost:9094` 的 `localhost` 改为服务器地址 
1. bitnami/kafka 在 3.5.1 版本移除 KAFKA_ENABLE_KRAFT 来判断是否开启 kraft 
2. 默认情况 必须配置 `KAFKA_CFG_PROCESS_ROLES ` 或 `KAFKA_CFG_ZOOKEEPER_CONNECT ` 才能启动 kafka

:::

## Kraft 环境配置

| 配置环境名称                             | 描述                    | 值  |
| ---------------------------------------- | ----------------------- | --- |
| KAFKA_CFG_NODE_ID                        | kafkaf 节点唯一id       |     |
| KAFKA_CFG_PROCESS_ROLES                  | 逗号分隔 kraft 角色列表 |     |
| KAFKA_CFG_CONTROLLER_QUORUM_VOTERS       | kafka 侦听器列表        |     |
| KAFKA_CFG_LISTENERS                      |                         |     |
| KAFKA_CFG_ADVERTISED_LISTENERS           |                         |     |
| KAFKA_CFG_CONTROLLER_LISTENER_NAMES      |                         |     |
| KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP | Kraft 模式下集群 id     |     |