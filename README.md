# react_functional_syntax
- A syntax to instead jsx
- 一种替代jsx的函数式语法
- 支持链式调用
```javascript
    Flex(
        Button('click')
            .onClick(onClick)
            .setType('primary'),
        Icon('./image/icon/my.png')
            .style({width:100,height:100})
            .borderRadius(50),
        Body(),
        Banner().bottom(10)
    )
```
## 使用方法
- 将物料库组件或者基础标签函数化
```javascript
    const Card = createCompProxy(Card)
    const Div = createCompProxy('div')
    const Card = generateCompClass(Card)
```
- 调用
```javascript
    // 作为正常函数执行即可
    // 可以通过new操作符实现语法高亮
```
- 语法
```javascript
    // @stage1 函数式调用
        Comp(
            A().size(),
            B()
            )
            .model(value)
            .style({width:200})

    // @stage2 启用{}语法 
        // Comp{
        //     const [size,setSize] = useState(2)
        //     A()
        //         .size(size)
        //         .onClick(()=>{setSize(size++)})
        //     B()
        //     Flex{
        //         const []
        //     }
        // }   
        // .frame({width:200})
```
## 生成可调用的函数组件
- 通过全局方法 *createCompProxy*
- 通过全局方法 *generateCompClass*
- 具体可见 index.js源码
