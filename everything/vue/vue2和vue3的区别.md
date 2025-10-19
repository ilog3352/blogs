# vue2和vue3的区别
vue2是使用optionsAPI，vue3使用CompostionAPI，

vue2使用Object.defineProperty()  实现双向绑定，vue3使用proxy实现    /    proxy对数组友好

vue3 优化了Vdom增加了patchflag静态标记每次对比只对比动态内容，

支持fragment多个跟节点，

支持treeshaking，支持render jsx写法，

新增了两个内置组件 suspensp异步组件和teleport传送组件

## vue3为啥要换成proxy
object.defineproperty缺点：

1. 不能拦截数组方法

2. 对象新增的属性不能拦截

3. 通过length修改数组内容拦截不到，通过下标修改数组元素不会改变

   object.defineproperty可以i做到这些更改，只是有性能问题（仅限数组，数组属性太多）

   vue2提供了**this.$set**来解决这些问题。proxy没有这些问题
   