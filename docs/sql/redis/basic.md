# redis

## Redis 数据结构

1. 对于 Redis 来说， key 键只有 String 类型
2. value 则有五种基本数据类型与三种特殊类型
   1. `String`,`Hash`,`List`,`Set`,`SortedSet`
   2. `GEO`,`BitMap`,`HyoerLog`
3. Redis 的 key 可以使用 `:` 来进行分隔，来区分多个业务的同一 key
   1. eg: `user:1` `user:2`……

### 通用指令 Generic

`dbsize`

- 查看当前数据库 key 数量

`select 0-15`

- 切换库， redis 默认 16 个库，下表 0-15

`flushdb`

- 删除当前库所有数据

`exit`

- 退出客户端

`keys pattern`

- 查找符合模板的 key
- 可以使用 Glob 模式模糊查询

`del key [key ...]`

- 删除 键值对
- 可以删除多个，空格分隔
- 会返回删除的键值对数量

`exists key [key ...]`

- 查看键值对是否存在
- 可以查看多个，空格分隔
- 会返回整数，数值为存在的键值对数量

`EXPIRE key seconds [NX | XX | GT | LT]`

- 给键值对设置有效期

`TTL key`

1. 查看键值对的有效期
2. 返回有效期，单位秒
3. 如果未设置有效期则为-1，过期则为-2

### String

1. `String` 类型共有三种格式
   1. 字符串
   2. int
   3. float

`set key value [NX | XX] [GET] [EX seconds | PX milliseconds | EXAT unix-time-seconds | PXAT unix-time-milliseconds | KEEPTTL]`

1. 添加或修改一个已经存在的简直对、

`get key`

1. 根据 key 获取 String 类型 value

`mset key value [key value ...]`

1. 批量添加多个 String 类型键值对

`mget key [key ...]`

1. 根据 key 获取多个 String 类型的 value

`incr key`

1. 让一个整形的 key 自增 1
2. 返回增长后的结果

`incrby key increment`

1. 让一个整形的 key 自增并指定步长
2. 返回增长后的结果

`incrbyfloat key increment`

1. 让一个浮点类型的数字 value 自增并指定步长

`setnx key value`

1. 添加一个 String 类型键值对，前提这个 key 不存在，否则不执行
2. 返回：成功则为 1，失败则为 0

`setex key seconds value`

1. 添加一个 String 类型键值对，并指定有效期

### Hash

1. Hash 结构类似于在键值对的 value 中再次存放一个 field--value 值

`hset key field value [field value ...]`

1. 添加或修改 hash 类型 key 的 field-value 值

`hget key field`

1. 获取一个 hash 类型 key 中 field 的 value 值

`hmset key field value [field value ...]`

1. 批量添加多个 key 中的 field-value 值

`hmget key field [field ...]`

1. 批量获取 key 中的多个 field 的 value 值

`hgetall key`

1. 获取一个 hash 类型中 key 的所有得到 field-value 值

`hkeys key`

1. 获取一个 hash 类型中 key 中的所有的 field

`hvals key`

1. 获取一个 hash 类型中 key 中的所有的 value

`hincrby key field increment`

1. 让一个 hash 类型的 key 中的 field 的 value 值 的字段自增并指定步长

`hsetnx key field value`

1. 添加一个 hash 类型的 key 的 field 值，前提是这个 field 不存在，否则不执行

### List 类型

1. 双向链表结构，支持正向与反向检索

`lpush key element [element ...]`

1. 向列表左侧插入一个或多个元素

`lpop key [count]`

1. 移除列表左侧第一个元素
2. 返回移除元素，没有则为 null

`rpush key element [element ...]`

1. 向列表右侧插入一个或多个元素

`rpop key [count]`

1. 移除列表右侧一个或多个元素

`lrange key start stop`

1. 返回一段角标范围内的所有元素

`blpop key [key ...] timeout`

1. 移除列表左侧第一个元素，没有元素则等待指定时间

`brpop key [key ...] timeout`

1. 移除列表右侧第一个元素，没有元素则等待指定时间

### Set

1. 无序，元素不可重复，查找快，支持交集，并集，差集

`sadd key member [member ...]`

1. 向 Set 中添加一个或多个元素

`srem key member [member ...]`

1. 移除 Set 中的指定元素

`scard key`

1. 返回 Set 中元素的个数

`sismember key member`

1. 判断一个元素是否存在 Set 中
2. 返回 1 则存在，返回 0 则不存在

`smembers key`

1. 获取 Set 中的所有元素

`sinter key [key ...]`

1. 求多个 key 之间的交集

`sdiff key [key ...]`

1. 求多个 key 之间的差集

### SortSet

1. 可排序，元素不重复，查询速度快 （经常用于实现排行榜）
2. 所有排名默认升序，降序则在命令后 `Z` 后添加 `REV`
   1. 例如 `zrank` 改为 `zrevrank`

`zadd key [NX | XX] [GT | LT] [CH] [INCR] score member [score member...]`

1. 添加一个或多个元素到 sorted-set,如果已存在则更新 score 值

`zrem key member [member ...]`

1. 删除 sorted-set 中的一个指定元素

`zscore key member`

1. 获取 sorted-set 中指定元素的 score 值

`zrank key member`

1. 获取 sorted-set 中的指定元素的排名

`zcard key`

1. 获取 sorted-set 中元素的个数

`zcount key min max`

1. 统计 score 值在给定范围内所有元素的个数

`zincrby key increment member`

1. 让 sorted-set 指定元素自增长，步长为 increment

`zrange key start stop [BYSCORE | BYLEX] [REV] [LIMIT offset count] [WITHSCORES]`

1. 按照 score 排序后，获取指定排名范围内的元素

`zrangebyscore key min max [WITHSCORES] [LIMIT offset count]`

1. 按照 score 排序后，获取指定 score 范围内的元素

`zdiff numkeys key [key ...] [WITHSCORES]`

1. 差集

`zinter numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE <SUM | MIN | MAX>] [WITHSCORES]`

1. 交集

`zunion numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE <SUM | MIN | MAX>] [WITHSCORES]`

1. 并集
