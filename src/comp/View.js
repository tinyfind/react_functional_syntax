const {createElement} = require('react')

// 使用 Proxy 代替 Class

// 获取组件对象结构 针对不同平台 （以 react 为例） {type,props,children}
function getElement(comp){
    let element = {...createElement(comp,{test:'test'})}
    return Object.assign(element,{props:{...element.props}})
}

const methods = {
    color(target,color){
        Object.assign(target.props,{style:{color}})
    },
    border(target,size){
        Object.assign(target.props.style,{border:`${size}px`})
    },
    onClick(target,func){
        Object.assign(target.props,{onClick:func})
    },
    spacing(space){
        target.props.className.push('')
    }
    // transition & animation
}
// 

const Comp = (child)=>{
    const config = {
        get:(target,prop,self)=>{
            // 默认方法
            // 配置方法
            if(methods.hasOwnProperty(prop)){
                return (...value)=>{
                    methods[prop](self,...value)
                    return self
                }
            }else{
                return target[prop]
            }

        }
    }

    return new Proxy(getElement('div'),config)
}
export default Comp
// console.log(obj);
