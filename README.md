# react_functional_syntax
- A new syntax to instead jsx
- 函数声明式
- 箭头函数尾闭包
### 箭头函数尾闭包
```javascript
    // 下面两个方法的调用同效
    // 尾调用函数默认传参 ...args
    Flex((...args)=>{
        console.log('test')
    }) 

    Flex{
        console.log('test')
    }
    // 尾调用函数体会默认返回最后一条语句
    [1,2].map(item=>item++)

    [1,2].map{
        args[0] ++
    }
```
### 声明组件
```javascript
    // 组件即函数 
    // 无状态
    function CompCard(){
        let num = 0
        Card{
            Button(num)
        }
    }
    // 有状态 (需要使用react hooks)
    import GComp from './comp/tools/createComp'
    import {useState} from 'react'
    
    const CompCard = GComp{
        const [num,setNum] = useState(0)

        Card{
            Button(num)
                .onClick{
                    setNum(num+1)
                }
        }
    }

```


## 使用
- 将物料库组件或者基础标签函数化
```javascript
    //  提供 proxy 和 Class 两种实现方式
    import GComp from './comp/tools/createComp'

    const Card = GComp(Card)
    const Div = GComp('div')
```
- 调用
```javascript
    //  对于通过物料库转换的组件 children可通过以下方式传递
    //  props 可通过 链式调用传递
    Button('submit')
    Button{
        Card{
            Div('first')
        }
        Card{
            Div('second')
        }
    }
```


