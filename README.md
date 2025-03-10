## vue 插槽有什么用？插槽的本质是什么？

1.  设计插槽的目的是什么?
2.  插槽的使用？
3.  插槽的有哪几种？
4.  插槽的本质是什么？

### 设计目的

- 插槽的设计目的是为了使组件的复用性更高，更灵活。通过插槽，可以在组件内部插入自定义的内容，从而实现组件的复用。

### 插槽的使用

- 插槽的使用分为默认插槽、具名插槽(包含 作用域插槽) 。

#### 默认插槽

- 默认插槽是指在组件内部没有指定名称的插槽，可以在组件内部使用`<slot></slot>`标签来定义默认插槽。在组件外部使用组件时，可以在组件标签内部插入自定义的内容，这些内容会替换组件内部的默认插槽。

```html
<!-- 组件内部 -->
<template>
  <div>
    <slot></slot>
  </div>
</template>

<!-- 组件外部 -->
<template>
  <div>
    <my-component>
      <p>这是默认插槽的内容</p>
    </my-component>
  </div>
</template>
```

#### 具名插槽

- 具名插槽是指在组件内部指定名称的插槽，可以在组件内部使用`<slot name="slotName"></slot>`标签来定义具名插槽。在组件外部使用组件时，可以在组件标签内部使用`<template v-slot:slotName>`标签来插入自定义的内容，这些内容会替换组件内部的具名插槽。

```html
<!-- 组件内部 -->
<template>
  <div>
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>

<!-- 组件外部 -->
<template>
  <div>
    <my-component>
      <template v-slot:header>
        <h1>这是头部插槽的内容</h1>
      </template>
      <p>这是默认插槽的内容</p>
      <template v-slot:footer>
        <p>这是底部插槽的内容</p>
      </template>
    </my-component>
  </div>
</template>
```

#### 作用域插槽

- 作用域插槽是指在组件内部使用`<slot :data="data"></slot>`标签来定义作用域插槽，其中`data`是组件内部的数据。在组件外部使用组件时，可以在组件标签内部使用`<template v-slot:slotName="slotProps">`标签来插入自定义的内容，其中`slotProps`是组件内部的数据，可以在自定义内容中使用。

```html
<!-- 组件内部 -->
<template>
  <div>
    <slot :data="data"></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [1, 2, 3, 4, 5],
      };
    },
  };
</script>

<!-- 组件外部 -->
<template>
  <div>
    <my-component>
      <template v-slot:default="slotProps">
        <ul>
          <li v-for="item in slotProps.data" :key="item">{{ item }}</li>
        </ul>
      </template>
    </my-component>
  </div>
</template>
```

### 插槽的本质

- 就是一个函数，通过函数的参数传递不同的内容

```vue
<template>
  <div>
    <!-- 定义插槽，传递的内容就要显示在插槽之中 -->
    <slot></slot>
    <slot name="menu"></slot>
    <slot name="menu1" msg="hello"></slot>
  </div>
</template>
<script>
/**
 * 插槽的作用： 就是组件的复用，通过插槽可以传递不同的内容，实现组件的复用。
 * 插槽： 1. 默认插槽 2. 具名插槽 3. 作用域插槽
 * 本质： 就是一个函数，通过函数的参数传递不同的内容
 *  <slot></slot>  这样写相当于 就在调用 default() 这个函数而已， 拿到这个虚拟节点，然后渲染到插槽之中
 *  {
 *    default: function() {}
 *    menu: function() {}
 *   menu1: function(scope) {}
 *  }
 *  slots对象： slots 用于访问组件传入的内容插槽。
 */
import { h } from "vue";
export default {
  setup(props, { slots }) {
    console.log("test slots ", slots);
    const defaultVnodes = slots.default();
    const menuVnodes = slots.menu();
    const menu1Vnodes = slots.menu1({ msg: "hello" });
    console.log("menu1Vnodes", menu1Vnodes);
    return () => {
      return h("div", null, [...defaultVnodes, ...menuVnodes, ...menu1Vnodes]);
    };
  },
};
</script>
```

1739239462248.png

### 什么是 vue 的数据响应式?

- 数据变化时，依赖数据的函数会重新运行（也就是数据跟函数之间的关联）。

#### 如何理解 -- （数据变化时，依赖数据的函数会重新运行）这句话呢？

- 譬如在 vue3 当中: `render`, `watchEffect`， `watch`，`computed`
  它们传的是一个函数吧,这个函数在运行的过程中是不是会用到一些数据, 而这个函数就是依赖这个数据的 `name` 属性 , 依赖了这个数据的 `age` 属性，当这个数据的 `name` 属性或者 `age` 属性发生变化的时候，这个函数是不是会重新运行啊。

- 平时我们所说的数据响应式，都是数据变化了，界面也就刷新了， 可以想想界面在 vue 中是啥呀，它不就是一个 render 函数吗， 这个 render 函数里面是不是用到了一些数据，当这个数据变化的时候，导致 render 函数会重新运行啊， 然后重新渲染页面啊。
> 1. 不是任何函数都可以与数据关联的，必须是被监控的函数（普通的函数不会被监控）
> 2. 函数运行期间用到了响应式的数据
> 3. 响应式数据变化了会导致函数重新运行

```javaScript
watchEffect(() => {
  state.name, state.age
})
watch(()=> {
  state.xxx
})
computed(() => {
  state.xxxx
})
```

### vue 的数据响应式是如何实现的?

- vue2 的响应式是基于 `Object.defineProperty`实现的
- vue3 的响应式是基于 ES6 的 `Proxy`来实现的

注意： 上面的回答抽象了一点，但确实是回答出了 Vue 的两个版本的响应式实现的核心原理，并且 vue 的两各版本响应式的好坏就体现在 `Object.defineProperty` 和 `Proxy` 的差异上面。

#### vue2 估计大家都知道 vue2 基于 `Object.defineProperty` 的， 下面举个例子说明下吧

```javaScript
function reactive(obj, key, value) {
  Object.defineProperty(obj, key, {
    get() {
      console.log(`访问了${key}属性`);
      return value;
    },
    set(newValue) {
      console.log(`将${key}由->${value}->设置成->${newValue}`)
      if (newValue !== value) {
        value = newValue;
      }
    },
  })
}

const data = {
  name: '岩柏',
  age: 18
}
Object.keys(data).forEach(key => reactive(data, key, data[key]))
console.log(data.name)

// 访问了name属性
// 岩柏

data.name = "yanbai"
console.log(data.name)
// 访问了name属性
// yanbai
```

通过上面的例子，对 `Object.defineProperty` 有了一定的认知，那么问题来了？ 它到底有什么弊端呢？咱们接着往下看

```javaScript

// 接着上面代码  给data对象添加一个新属性
data.hobby = '打豆豆'
console.log(data.hobby) // 打豆豆
data.hobby = '打篮球'
console.log(data.hobby) // 打篮球

```

这样大家可以明白它有什么弊端了吧，就是不能监听到对象新增的属性
+ data新增了hobby属性，进行访问和设值，但是都不会触发get和set
+ 弊端就是：Object.defineProperty只对初始对象里的属性有监听作用，而对新增的属性无效
+ 也是为什么Vue2中对象新增属性的修改需要使用Vue.$set来设值的原因。
