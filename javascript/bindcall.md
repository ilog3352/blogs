## call
- call接受两个参数，第一个参数为this指向，第二个参数为参数列表
- 函数A.call(this指向,参数列表)

## apply
- apply接受两个参数，第一个参数为this指向，第二个参数为参数数组
- 函数A.apply(this指向,参数数组)

## bind
- bind跟call一摸一样，区别不会立刻调用函数，返回一个新函数 
- 函数A.bind(this指向,参数列表) 

## 总结
- call和apply是立刻调用函数，bind是返回一个新函数，不会立刻调用函数
- call和apply的第一个参数都是this指向，bind的第一个参数是this指向
- call和apply的第二个参数是参数列表，bind的第二个参数是参数列表
