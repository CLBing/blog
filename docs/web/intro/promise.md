---
id: promise
slug: /promise.md
title: JavaScript 异步执行
date: 2024-07-31
tags: [promise, async]
keywords: [promise, async, await]
---

# promise

## 基础

异步执行指的是当程序执行一个长时间事件时不进行等待，而是在等待期间去执行其他事情
过去 javascript 想要异步调用函数时候使用 `setTimeout()` 函数，当第一个函数执行完成后在执行第二个函数，

```javascript
setTimeout(() => {
  // 延时执行函数
  setTimeout(() => {
    // 第二次延时函数
    setTimeout(() => {
      // 第三次延时函数
    }, 3000);
  }, 3000);
}, 3000);
```

但这样会造成多层嵌套。函数横向发展，也不利于阅读，所以就有了 `promise`

`promise` 用于异步处理事件函数，一个 promise 会有三种状态

- 待定(pending)：初始状态，函数未执行完成
- 兑现(fulfilled)：异步执行结果成功
- 拒绝(rejected)：异步执行结果错误

可能有些难理解 可以看下面例子

```javascript
/**
 * 定义 promise 事件，创建 promise 对象
 * 传参 (resolve , reject)
 * 并且在内部可以返回调用成功或者失败后结果
 * resolve() :
 *      传入事件调用成功返回参数
 * reject() :
 *      传入事件调用失败返回参数
 */
const myPromise = new Promise((resolve, reject) => {
  // 执行事件函数
  const data = "data";
  // 事件执行成功返回结果
  resolve(data);
  //   reject(data);
});

/**
 * 执行 promise 事件
 * promise 常见有三个方法
 * then((data)=>{},(error)=>{}) :
 *      第一个函数当 promise 执行成功后运行，
 *      第二个函数当 promise 执行失败后运行
 * catch((error)=>{}) :
 *      捕获错误与reject() 与 then(null,(error)=>{}) 功能相同
 * finally(()=>{}) :
 *      不论 promise 成功失败都会在最终执行
 * 这三个可以链式调用
 */
myPromise
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(errors);
  })
  .finally(() => {});
```

可以使用函数来封装 `promise`

```javascript
/**
 * 函数封装并返回 promise 对象
 */
const fun = (data) => {
  return new Promise((resolve, reject) => {
    // 处理 data 传参，并 resolve 返回
    resolve(data);
  });
};

// 这样可以调用封装的 promise
fun("a").then((data) => {
  console.log(data);
});
fun("b").then((data) => {
  console.log(data);
});
```

## 链式调用

promise 可以使用链式调用来顺序执行函数，来确保执行顺序

```javascript
/**
 * 定义 promise
 */
const fun = () => {
  return new Promise((resolve, reject) => {
    resolve("promise data");
  });
};

/**
 * 执行 promise 函数
 * 首次调用 then((data)=>{}) 中的 data 为 promise 的 resolve 数据。
 * then() 的返回值为一个　promise 对象，所以可以继续链式调用下去
 * 之后可以使用 retrun 返回值来向下级传值
 * 可以在最后 链接一个 catch 来捕获所有事件中的异常
 */
fun()
  .then((data) => {
    console.log(data); //promise data
    return "fun data";
  })
  .then((data) => {
    console.log(data); //fun data

    return "fun data 2";
  })
  .then((data) => {
    console.log(data); //fun data 2
  })
  .catch((error) => {
    console.log(errors);
  })
  .finally(() => {});
```

## async & await

async 与 await 是 `promise` 的语法糖，用于简化 promise 操作

- async 可以将函数返回值生成为一个 `promise` 对象
- await 可以将 `promise` 返回值的 `resolve()` 的值直接作为返回值返回

```javascript
// 首先定义两个返回 promise 对象的函数
const fun1 = () =>
  new Promise((resolve) => {
    resolve(1);
  });
const fun2 = () =>
  new Promise((resolve) => {
    resolve(2);
  });

// 使用 async 来初始化函数
async function getData() {
  /**
   * 正常情况下获取 fun1 与 fun2 中 promise 对象 resolve 的值
   * 需要 fun1().then((data1)=>{}) 来获取
   * 但 await 可以将 resolve 的值作为返回值直接获取
   * let data1 = await fun1()
   */
  let data1 = await fun1();
  let data2 = await fun2();
  console.log(data1); // 1
  console.log(data2); // 2

  /**
   * 将获取的 fun1 与 fun2 值 return 返回
   * 由于 async 所以会封装成 promise
   * 等同于
   * retrun new Promise((resolve)=>{resolve(data1+data2)})
   */
  return data1 + data2;
}

getData().then((data) => {
  console.log(data); // 3
});
```
