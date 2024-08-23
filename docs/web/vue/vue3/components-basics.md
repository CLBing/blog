---
id: components
slug: /components.md
title: 组件基础
date: 2024-08-23
tags: [components,vue]
keywords: [components,vue]
---

# vue3 组件
组件指的是将页面进行一块块的分割，隔离出的一个块便是组件，组件可以方便开发者进行模块化开发。

## 自定义组件

```html
<template>
    // html 页面
</template>
<script setup>
    // js 代码
</script>
<style style lang="scss" scoped>
    // css 效果
</style>
```

## 组件注册
在vue中使用自定义的组件需要注册组件，组件注册有两种方式
- 全局注册
  - 可以使注册组件在当前vue中全局可用
- 局部注册
  - 在需要使用自定义组件的组件中引入

### 局部注册

局部注册可以导入组件后直接使用

```js

<template>
    // 使用自定义组件
    <MyComponent/>
</template>

<script setup>

// 自定义组件导入
import MyComponent from '@/components/MyComponent/index.vue'

</script>
```

### 全局注册

全局注册在当前vue所有组件中可以使用自定义组件

```js
<script>
import { createApp } from 'vue'
import App from './App.vue'

// 自定义组件导入
import MyComponent from '@/components/MyComponent/index.vue'

const app = createApp(App)
// 全局注册自定义组件
app.component('MyComponent', MyComponent)
app.mount('#app')
</script>
```

:::tip
不论是全局注册还是局部注册的组件，例如 `MyComponent` 组件，可以使用 `<MyComponent />` 或 `<my-component/>` 来使用组件
:::

## 动态组件

适用于一个页面中多个组件的来回切换

``` html
<!-- MyComponent 改变时组件也改变 -->
<component :is="MyComponent"></component>
```

`:is` 的值
- 注册的组件名称
  - `app.component('MyComponent', MyComponent)` 中的第一个传参组件名称
- 导入的组件对象
  - `import MyComponent from '@/components/MyComponent/index.vue'` 中导入的组件对象
:::tip
多个组件切换时，会卸载组件造成组件中的数据小时，可以使用 `<KeepAlive>` 组件使被切换组件存货
:::
