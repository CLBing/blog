---
id: transfer-value
slug: /transfer-value.md
title: 组件传值
date: 2024-09-04
---

# vue 消息传递

## 透传

## props

### props 接受数据

使用 `defineProps()` 来接收组件属性传值

- 父组件传递参数
```js
<MyComponent value1="hello1" value2="hello2" value3="hello3" />
```

- 子组件接受参数
```js
<script setup>
  const props = defineProps(['value1','value2','value3']) // 可使用 defineProps
  返回对象取出接收值 console.log(props.value1) console.log(props.value2)
  console.log(props.value3)
</script>
```

### props 类型校验

可以对父组件传入的值进行校验,`defineProps()` 传入数组可以接受数据，也可以传入一个带有校验的对象用于接收数据，如果传入值不符合需求，则会控制台警告。

```js
/**
 * js 数据类型
 * 基本类型
 *  ：String,Number,Boolean,Null,Undefined,Symbol
 * 引用类型
 *  ：Object,Function,Array
 */
defineProps({
    /**
     * 基础类型检查
     *      校验类型可以使用 赋值，数组，对象 来对接受参数进行校验
     */

    // 直接设置 参数类型。如果这里为 null 或者 undefined 则不对类型校验
    msgA:String,
    // 数组 传入数组需要时数组中的类型，如果包含 null 则代表可以为 空
    msgB:[String,Number,null],

    // 对象，对象中 type 属性来进行数据类型判断，也可以对传入参数进行其他校验
    msgC:{
        type: [String,Number,null],
    }
})
```
### 是否必填

- 使用 `required` 
  - 参数是否必填参数,默认为 false

```js
defineProps({
    // 必填 sting 类型参数
    msgA:{
        type: String,
        required:true
    },
    // 必填 sting 类型参数，可为 null
    msgB:{
        type: [String,null],
        required:true
    }
})
```


### 默认值

- 使用 `default` 
  - 如果没有传参，则会给参数默认赋值
  - 使用 `default(){}` 来返回默认值
  - 对象属性默认值必须使用 `default(){}` 返回

```js
defineProps(
    // 使用 default ，来设置默认值
    msgA:{
        type: String,
        default: 'hello'
    },
    // 使用返回值
    msgB:{
        type: [String,null],
        default(){
            return 'hello';
        }
    }，
    // 对象默认值
    msgC:{
        type:Object,
        default(){
            return {name:"hello"}
        }
    }
)



```js
/**
 * js 数据类型
 * 基本类型
 *  ：String,Number,Boolean,Null,Undefined,Symbol
 * 引用类型
 *  ：Object,Function,Array
 */
defineProps({
    /**
     * 基础类型检查
     *      校验类型可以直接赋值类型，数组，对象
     *      直接设置 指定接收参数类型
     *      数组：则代表接受类型为数组内类型，有null则代表可以为null
     *      对象：{type:[]} 对象中 type属性来设置校验类型
     */
    propA:Number,
    propB:[String,Number,null],
    propC:{
        type: [String,Number,null],
    },


    // 是否必填 ：required
    propD:{
        type: [String,null],
        required:true,
    },

    // 默认值
    propE:{
        type: [String,null],
        default:''
    },

    /**
     *  props 接受 数组，对象与函数
     *      type 可以使用 Object 或 Function 来接受对象与函数
     *      对象类型使用 default(rawProps){} 工厂函数来返回
     *      函数使用 default(){} 来设置基础函数
     */ 

    propG:{
        type: Object
        default(rawProps) {
            return { message: 'hello' }
        }
    },

    propH:{
        type: Function
        default() {
            return 'Default function'
        }
    },

    // 自定义校验
    propI:{
        validator(value, props) {
            // The value must match one of these strings
            return ['success', 'warning', 'danger'].includes(value)
        }
    }
})
```
