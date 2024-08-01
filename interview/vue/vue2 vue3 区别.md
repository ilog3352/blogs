### vue2 vue3 区别
vue 是 mvvm 架构 model view ViewModel 数据发生变化通知viewmodel更新页面 页面发生变化 通知viewmodel 更新数据 是双向绑定的

1.  写法不同 vue2 是options api vue3 支持 composition api  
2. 双向绑定原理不同 vue3 是es6 的 **proxy** 劫持增删改查操作 vue2 是**Object.defineProperty()** 拦截的
3. vue3 有 treeshaking, fragments : 不限制根节点只有一个, 还优化了vdom 不会更新 静态的数据   支持tsx jsx
4. 新增suspense teleport 内置组件 删除了vue2 $on $off $once
