ref  

Ref

isRef() 

shallowRef  浅层次 只能相应.value 不能响应.value.name 不能和ref一起写

triggerRef()：影响shallowRef更新,customRef()：自定义ref

reactive

shallowReactive 只到第一个属性，跟react一起赋值也会影响；因为ref的更改会重新渲染，但是浅层的更新不会，但是所有组件的模板都会更新最新数据

toRef

~~~~js
 两个参数，第一个是对象，第二个是对象的key 将reactive对象中的某个属性拿出来变成ref，就可以单独修改 这个值
 const man = reactive({name:'zhangsan',age:14})
 const name = toRef(man,'name')
 name.value = 'lisi'
~~~~



toRefs：let {xxx,xx} = toRefs(man)

toRaw():响应式转非响应式

compute 两种写法 对象写法，函数写法

watch()  deep immediate 只监听响应式  watch([值,值2],(newVal,oldVal)=>{要如何操作})

watchEffect() 停止监听 ()=> 自调用  watchEffect(()=>{

直接操作要监听的值

})

生命周期

bem

defineProps ts:withDefaults

defineEmits<{(e:''',name:''):void}>()

defineExpose({}) 在父组件中可以读取 通过 ref定义的组件实例

ts自带工具   检测类型 InstanceType<typeof 要检测的类型>

局部组件，全局组件，递归组件

动态组件 tab页切换 component is

插槽 匿名 具名插槽 作用域插槽 动态插槽 #[name]

异步组件      				代码分包

~~~~vue
引入异步组件
使用defineAsyncComponent 
import {defineAsyncComponent } from 'vue'
const SyncVue = defineAsyncComponent(()=>import ('./../sync.vue'))
展示异步组件使用<Suspense>内置组件
<Suspense> 两个插槽
	<template #default>
		<SyncVue></SyncVue> 默认插槽展示异步组件
	</template>
	<template #fallback>
		展示未加载完异步组件时现实的骨架屏
	</template>
</Suspense>
~~~~

Teleport 传送组件 to disabled

KeepAlive 缓存组件

Transition 动画组件 结合 Animate.css

provide inject

~~~~
provide('key',value) 导入provide
const key = inject<Ref<string>>('key')
~~~~

css v-bind

兄弟组件传参 mitt

v-model

自定义指令 directive

hooks  ？？？

全局函数和变量

~~~~
app.config.globalProperties.$env = 'dev'		全局变量$env
app.config.globalProperties.$filters = {
	format<T>(str:T){
		return str
	}
}
~~~~

样式穿透 vue2 /deep/ vue3 :deep(.header){}

nextTick 操作dom是异步的 更新数据时同步的，

~~~~
nextTick(()=>{	操作dom放在这里})
await nextTick()	// 在await下边的代码都是异步的	微任务
放异步

~~~~

一帧或者是一个tick会做六件事

1. 处理用户的事件，event 例如click,input,chang
2. 执行event loop
3. 执行 requestAnimationFrame （动画）
4. 执行dom 回流与重绘
5. 计算更新图层的绘制指令
6. 绘制指令合并主线程，有空余时间会加载分包的代码

watch是异步的 微任务

h函数

````javascript
// template里
<Btn type='success'>编辑</Btn>
<Btn type='error'>删除</Btn>
// script里
interface Props {type:'success'|'error'}
const Btn = (props:Props,ctx) => {
// 第一个参数是要创建的节点，第二个是属性，第三个是显示的内容
	return h('button',{
        stype:{color:props.type==='success' ? 'green' : 'red'}
		onClick:()=>{console.log('click'),ctx.emit('click',234234)}
	},ctx.slots.default())
}
// 嵌套就是
h('div',[
    h('span',{},'2334')
])
````



vue3.3编译宏

~~~~vue
defineprops defineEmits defineOptions({name:slkfjslkfj})
~~~~

环境变量

性能优化

~~~~
rollup-plugin-visualizer vite的打完包分析代码块占用多少空间
在vite里的build配置项可以配置
vite插件pwa离线缓存技术 离线缓存使用servic worker实现
图片懒加载 v-lazy  IntersectionObserver 
vueuse的hook
~~~~

改变pinia state的方法

uesStore.$patch(state => {state.age = 34,....})

pinia结构出来没有响应式  通过storeToRefs(useStore)结构出来，从pinia里引入

