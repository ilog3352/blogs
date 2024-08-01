# 基本类型

// **@ts-ignore**  **忽略报错**



~~~typescript
//字符串
let str:string = 'str'
let str:string = `${num}`
// 数字
let num:number = 123123 /NaN / Infinty(无穷大) 
十六进制0x 0b二进制 0o八进制
// 布尔
let b:boolean = true / false
// null 
let n:null = null
// undefined
let u:undefined = undefined
// void	没返回值
function myFun ():void {}
~~~

# 任意类型

~~~typescript
//1. 顶级类型 any 任意类型 unknown 不知道的类型		向下包含
//2. Object				object 只支持引用类型
//3.Number String Boolean
//4.number string boolean
//5.1  'str'   false
//6.never
// object 常用于泛型约束 除了原始类型都可以
unknown只能赋值给自身或者是any 不能读属性和方法 unknown比any更加安全
let a:object = '13' // error 因为是原始类型 
let a:object = [] // 只能是引用类型 [] {} ()=>{}常用于泛型约束
let a:{} = 123 // {} 就等同于 Objcet 支持所有类型 不能写
~~~

# 接口和对象类型

~~~typescript
//interface 重名 重合 ？可选 ，readonly 只读属性，extends继承 可多个
// 不能多属性不能少属性
interface Axxas{
    readonly id:number
    name:string
    age?:number
    [key:string] :any	// 任意key
}
let a:Axxas = {
    id:1,
    name:"小猫",
    age:3
}
interface Fn {
    (name:string):number[]
}
const fn:Fn = function (name:string) {return [2]}
~~~

# 数组类型

~~~~typescript
let arr:number[] = [2,3,4,5]
let arr:boolean[] = [true,false]
let arr:Array<boolean> = [true,false]
// 数组对象
interface X {
    name:string
    age?:number
}
let arr:X[] = [{name:'car',age:4},[{name:'bus'}]]
// 二维数组
let arr:number[][] = [[1],[2],[3]]
// 泛型
let arr:Array<Array<number>>
// 大杂烩数组 定义any 元组：一个一个对应

~~~~

# 函数类型

~~~typescript
// 默认值 和 可选参数不能一起使用
function add(a:number=10,b?:number):number{return a+b}
const add = (a:number,b:number):number => a+b
// 参数是一个对象 使用interface定义
interface User {
    name:string
    age:number
}
function add1(user:User):User {
    return user
}
add1({name:'gaa',age:33})
//函数剩余参数
function a(...args:number[]){
    let a:IArguments:arguments
    console.log(arguments)
}
a(2,3) 	// [0:2,1:3]
// 在第一个参数定义this类型
//函数重载
let user:number[] = [1,3,4,2]
function findNum(id:number):number[]	//如果传id查单个
function findNum():number[]				//查全部
function findNum(add:number:[]):number[]	//如果传数组 添加
function findNum(ids?:number | number[]):number[{
	if(typeof ids == 'number') {
        return user.filter(v=>v==ids)
    }else if(Array.isArray(ids)) {
        user.push(...ids)
        return user
    }else {
        return user
    }
}]
~~~

# 类型断言 | 联合类型 | 交叉类型

~~~~typescript
let phone:number | string = 12334521231	// 联合
let phone:Man & Age	// 交叉
// 类型断言 (xxx as number) | (<number>xxx)

~~~~



# 内置对象

~~~~typescript
// dom 无意的的为HTMLElement Element
let div = document.querySelector('div') as Element
let div:NodeListOf<HTMLDivElement | HTMLElement> = document.querySelectorAll('div')
localstrage  =>  Storage
location => Location
let promise:Promise<string> = new Promise((r)=>r('as'))
~~~~

# 类

- class的基本用法 继承 和 类型约束 implements

~~~typescript
extends 继承关键字
class one extends two 
class Vue implements VueCls  使用接口约束
~~~





### 访问修饰符

1. public 共有的 默认
2. private 直在类内部使用
3. protected 在类内部或者子类中使用



### 静态方法

~~~typescript
使用static声明的方法/属性为静态属性/方法
只能通过类名去调用
static声明的方法里 this指向整个类 只能调用其他使用static声明的方法
~~~



### set get

~~~typescript
当私有属性不能被随意修改时 可以通过set get 操作来做一个拦截
class Ref {
    _value: any
    constructor(value: any) {
       this._value = value;
    }
    get value() {
        return this._value +"vv"
    }
    set value(newVal) {
        this._value = newVal+'可以自定义'
    }
}
~~~

# 抽象类



~~~typescript
abstract 定义抽象类 只能描述不能实现 	interface 时特殊的抽象类
只能通过子类去实现 抽象类无法被实例化
abstract class Vue {
    name:string
    constructor (name?:string) {
        this.name = name
    }
    getName ():string {
        return this.name
    }
    //抽象方法 类中只要有一个抽象方法/属性 这个类就是抽象类
    abstract init(name:string):void	
}
// 派生类
class React extends Vue {
    constructor (){
        super()
    }
    init (name:string) {
        
    }
    setName (name:string) {
        this.name = name
    }
}
~~~

## 元组类型

~~~typescript
let arr:[number,boolean] = [1,false]		// 只能添加number 或者 boolean
let arr:[x:number,y?:boolean] = [1]	
type first = typeof arr[0]		//first = number
~~~



## 枚举类型



```typescript
enum Color {
	red,	// 0	默认从0开始	给1 从1 开始
	green,		// 1
	blue		// 2
}
```

## 类型别名 |类型推断

~~~typescript
使用type 定义类型  
类型推断 let anc； //推断为any	let arr = 2  推断为number
type和interface区别


1.interface可以继承  type 只能通过 & 交叉类型合并

2.type 可以定义 联合类型 和 可以使用一些操作符 interface不行

3.interface 遇到重名的会合并 type 不行

~~~

## never类型

~~~~typescript
never是最底层的什么类型都包含不了
type A = 'aa' | 'bb' | 'cc'	//这里在家属性就会报错	应该在函数里加逻辑
function str (value:A) {
    switch (value) {
            case:'aa':break
            case:'bb':break
            case:'cc':break
        default:const error :never = value;break	//兜底逻辑
    }
}
~~~~

## symbol类型

~~~typescript
let al:symbol = Symbol(1) 表示独一无二的值
//让两个symbol相等true
//Symbol.for()返回一个已经存在的符号值，不存在创建一个
//for Symbol for全局symbol有没有注册过这个key 有就拿来用，没有就注册一个
// 在第二次使用的时候直接拿来用
Symbol.for('111') === Symbol.for('111') //true
for in 不能读到symbol ，Object.keys()也读不到 ，Object.getOwnPropertyNames()也读不到
Object.getOwnPropertySymbols()只能读到symbol
ES6新加一个方法 
Reflect.ownKeys()可以读到全部
~~~

## 生成器 迭代器  Set 

1. 生成器

```typescript
   function* gen() {
       yield Promise.resolve('中杯') 	//固定写法 返回一个值	可以返回同步异步
       yield '大杯'
       yield '超大杯'
   }
   const man = gen()
   man.next()	// 返回 	{value:'中杯',done:false}
   man.next()	// 返回 	{value:'大杯',done:false}
   man.next()	// 返回 	{value:'超大杯',done:false}
   man.next()	// 返回 	{value:'undefined',done:true}		done：true 表示没有东西再迭代了
```

1. Set

   在JavaScript中，Set是一种内置对象，它表示一组唯一的值。您可以使用new Set()语法创建一个新的空集合，或者使用new Set([1,2,3,4,5])语法创建一个包含给定值的集合

   ```typescript
   let set:Set<number> = new set([1,2,3,4,5])	// 天然去重 只支持数字 字符串
   在您的代码中，创建了一个新的集合，其中包含数字1到5。请注意，JavaScript中的集合不是数组，因此您不能使用索引来访问它们的元素。相反，您可以使用set.has()方法来检查集合中是否存在给定的值，并使用set.add()方法将新值添加到集合中1
   // map
   let map:Map<any,any> = new Map()	基本用法
   键可以是任意类型
   ```

   

1. 迭代器

   ```typescript
   所有类型都有迭代器	
   let a = [1,2,3]
   a[Symmbol.iterator]().next().value	//1	简单api
   实现调用他们自身的迭代器实现遍历
   const each = (value:any) => {
       let It: any = value[Symbol.iterator]()
       let next: any = {done:false}
       while (!next.done){
           next = It.next()
           if(!next.done){
               console.log(next.value)
           }
       }
   }
   迭代器语法糖
   for(let value of 除对象外类型){
       console.log(value)
   }
   //数组解构 底层原理也是调用iterator
   
   
   ```


## 泛型

```typescript
// 动态类型
function xiaoming<T>(a:T,b:T):Array<T>{ return [a,b] }	
// 泛型基本应用   可以传任意类型 自己推断/很灵活
type A<T> = string | number | T
let a:A<null> = null 	
interface Data<T>{
    mag:T
}
let data:Data<string> = {
    msg:'string'
}
function add<T='默认值string',K=string>(a:T,b:K):Array<T | K>{
    return [a,b]
}	add(2,'4')

// 泛型实际应用
const axios = {
    get<T>(url:string):Promise<T> {
        return new Promise((resolve,reject) => {
            let xhr:XMLHttpRequest = new XMLHttpRequest()
            xhr.oprn("GET",url)
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4 && xhr.status ==200 ) {
                    resolve(JOSN.parse(xhr.responseText))
                }
            }
            xhr.send(null)
        })
    }
}
interface Data { message:string code:number }
axios.get<Data>('./data.json').then(res=>{console.log(res)})
```
## 泛型工具
1.  Partial所有属性可选的意思接受一个泛型
2. Required所有属性必选的意思
3. Pick提取部分属性
4. Exclude排除部分属性
5. Omit排除部分属性并且返回新的类型
6. returnType 获取函数返回值
7. record



## 泛型约束 keyof

~~~typescript
使用泛型约束来约束泛型，
使用接口来约束泛型T 注：这里extends不是继承是约束
<T extends interface>
//    keyof基础用法
let obj = {
    name:'11',
    sex:'men'
}
// 约束T为引用类型 约束K为对象的key （name | sex) 使用keyof
type Key = keyof typeof obj
function ob<T extends object,K extends keyof Key>(obj:T,key:K) {
    return obj[key]
}
// 高级用法 
interface Data {
    name: string;
    age: number;
    sex: string;
}
// 这个函数的作用循环遍历对象的key
type Options<T extends object> = {
    [Key in keyof T]: T[Key];
}
const aa:Options<Data> = {
    name:'22',
    age: 22,
    sex: '男'
}
~~~

## 命名空间

~~~typescript
export namespace A {
    export const a = 1
    export namespace C {
        
    }
}
console.log(A.a)	// 1
import {A} from './'
const A = A.C
~~~

## 三斜线指令

TypeScript中的三斜线指令是包含单个XML标签的单行注释。注释的内容会作为编译器指令使用。三斜线指令仅可放在包含它的文件的最顶端。一个三斜线指令的前面只能出现单行或多行注释，这包括其它的三斜线指令。如果它们出现在一个语句或声明之后，那么它们会被当做普通的单行注释，并且不具有特殊的涵义

~~~typescript

三斜线指令有以下几种：

/// <reference path="..." />：用于声明文件间的依赖关系。
/// <reference types="..." />：用于声明对某个类型库的依赖。
/// <reference no-default-lib="true"/>：用于告诉编译器不要引入默认库文件。
/// <amd-module name="..." />：用于给模块命名。
/// <amd-dependency path="..." />：用于声明模块间的依赖关系。
~~~

## Mixins混入

~~~typescript
对象混入：
合并对象es6
let obj = Object.assign(obj1,obj2)	返回新类型为交叉类型
类混入看文件吧
在 TypeScript 中，混入是一种将类组合在一起以创建新类的方法。混入可以通过将一个类的功能复制到另一个类中来实现。这样，您可以使用多个类的功能来创建一个新类，而无需从每个类中继承所有功能。这使得代码更加模块化和可重用。

~~~
## 自定义守卫
``` ts
// 如果返回true num 就是number类型
const fn = (num:any):num is number=> typeof num === 'number'
```
## interface type 区别
不同点:interface 可以重名 type 不能
把interface 变量 赋给 Record 变量会报错  需要索引签名 因为 不明确interface 的属性 interface 会声明合并 type 不会
## 装饰器