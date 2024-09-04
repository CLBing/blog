---
id: kafka
slug: /kafka.md
title: kafka 基础
date: 2024-07-18
tags: [kafka, message middleware]
keywords: [kafka, middleware]
---

# kafka 基础操作

## topic 主题

主题创建

```shell title="kafka/bin"
kafka-topics.sh --bootstrap-server ip:9092 --topic topicName --create
```

主题删除

```shell title="kafka/bin"
kafka-topics.sh --bootstrap-server ip:9092 --topic topicName --delete
```

展示所有主题

```shell title="kafka/bin"
kafka-topics.sh --bootstrap-server ip:9092 --list
```

查看主题详细信息

```shell title="kafka/bin"
kafka-topics.sh --bootstrap-server ip:9092 --topic topicName --describe
```

## 生产者

kafka 指定主题发送消息

```shell title="kafka/bin"
kafka-console-producer.sh --bootstrap-server ip:9092 --topic topicName
# --topic ：被消费主题
# --bootstrap-server 生产者 ip:port 集群以逗号分隔

```

## 消费者

订阅 kafka 主题

```shell title="kafka/bin"
kafka-console-consumer.sh --bootstrap-server ip:9092 --topic topicName
# --topic ：被消费主题
# --bootstrap-server ：消费者 ip:port 集群以逗号分隔
# --from-beginning ：新客户端从头，消费所有消息
# --group ：客户端组命名，ps:添加后 --from-beginning 不会消费此客户端之前消费过的消息
```
