## 响应式原理reactive

通过proxy，Reflect拦截取值赋值的操作,通过tracker收集依赖，trigger更新依赖，数据结构是一个weakMap，weakMap的key是对象本身，value是一个map结构，map的key是对象要操作的key，value是一个set结构，set结构里放的是通过effect收集的具体方法。当更新的时候调用trigger方法，拿到set，遍历重新执行一边。就更新了。

#### 为什么使用weakMap

可能会有手动释放的情况，不会因为被使用影响垃圾回收

#### 副作用函数

副作用函数：外部修改函数内部引用的变量会影响函数内部 ;纯函数 :不受影响

## computed原理

computed接收一个getter函数，函数内部也是调用了effect函数，只是需要一个返回值，effect函数把传进来具体操作对象的方法返回，然后在computed方法内部实现了一个类，声明了get value方法内部调用了具体操作对象的函数，然后把类return出去 在.value的时候就更新依赖，防止首次调用是传了一个配置项，传了一个lazy，跟scheduler做缓存， 生命一个dirty为true，为true就重新更新依赖然后设为false，当依赖改变的时候出发tigger调用scheduler再次设为true，判断是在.value里边判断的

## watch原理

watch 可以接收三个参数，第一个参数是要监听的对象，第二个参数是回调函数，第三个参数是一个配置项  imdt 深度监听 flush 

内部原理：

1. 格式化参数，格式化成get函数

2. 返回值 （跟computed很像）也是需要effect函数 传入lazy scheduler 当依赖发生变化调用scheduler  

   1. ​         newValue = effectFn()  

      ​        cb(newValue, oldValue)

      ​        oldValue = newValue

## 虚拟DOM

虚拟DOM就是通过js生成的ast语法树，ast是抽象语法树，为什么用？很多语言都会使用这个东西，比如TS->JS、babel ES6 -> ES5

为什么不直接操作dom：浪费性能，dom属性非常多，操作js非常快就有了虚拟dom这个概念，还可以做算法优化比如有很多dom可以复用，Virtual DOM的优势不在于单次的操作，而是在大量、频繁的数据更新下，也就是v-for，在v-for更新的时候，有key的diff算法跟没有key的diff不一样

没有key 三步骤

1. 替换 直接替换
2. 新增 有多的就新增
3. 删除 有少的就删除

有key 五步骤

1. 前序算法 前边开始对比 不一样退出
2. 尾序对比 尾部开始对比 不一样退出
3. 新增
4. 删除
5. 乱序对比 算什么最长递增子序列算法

## vue3为什么换到proxy

vue2使用的是Object.defineProperty,vue3使用的是proxy

因为vue2的object.difineProperty有很多不足，

1. 数组的API拦截不到（性能消耗过大）数组属性太多

2. 对象新增的属性不能拦截

3. 通过length修改数组拦截不到（通过$SET)

   $set原理：

   1. 判断是否是响应式对象`__observer__` 是的话直接返回
   2. 判断是否是对象 是对象key[value]方式修改值 如果是新的属性就增加变成响应式的
   3. 数组，调用splice方法修改值
   4. 视图更新，通过dep.notify



通过proxy代理对象，通过getter，setter，delete等方法劫持对象的增删改查，发生变化通过effect函数来更新依赖



## 计算属性原理

两种参数模式，先初始化参数，函数模式不允许设置值，

内部采用脏值检测的模式，使用class实现的

默认dirty为true，主要就是判断dirty是否为true，true就更新一下数据并设置为false，false就拿缓存的值，当依赖发生变化设置为true



## vite为什么快

不会打包，webpack会打包，vite利用了浏览器esmodule，在index.html加了一个type=“module”，会发送一个请求，拦截app.vue文件 把vue代码转换为浏览器可识别的语音，template转换为render函数，setup转换为setup函数

## vue3 vue2区别

vue3 动态标记 体现在 template 编译后的render函数里 ast -> transform -> generate -> render





