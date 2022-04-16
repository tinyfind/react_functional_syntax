'use strict';
(function (global) {
    'useStrict';
    // 通过 new element 函数生成
    class ReactElement {
        // 创建私有变量
        #element = {}
        #props = {}
        #children = []
        #type = null
        #privateProps=['$$typeof','type','key','ref','_owner','props','_self','_source']
        // 实例化
        constructor(type, ...children) {
            this.#children = children
            this.#type = type
            this.updateElement()
            this.reflectReactProp()
            this.reflectSetPropFunc()
        }
        // 添加属性
        addProp(prop) {
            // 可以重复传递
            return this.updateElement(prop)
        }
        // 更新映射reactElement
        updateElement(prop = null) {
            this.#element = global.React.createElement(this.#type, Object.assign(this.#props, prop), ...this.#children)
            return this
        }
        // 映射组件方法
        reflectSetPropFunc() {
            ["danger","style","type","onClick","htmlType"].forEach(prop => {
                let setprop = `${this.#privateProps.includes(prop)?'set'+prop[0].toUpperCase():prop[0]}${prop.slice(1)}`
                Reflect.defineProperty(this, setprop, {
                    get: () => param =>  this.updateElement({[prop]:param})
                })
            })
        }
        // 映射reactElement 参数
        reflectReactProp() {
            // 防止篡改
            ['$$typeof', "type", "key", "ref", "_owner", "props", "_self", "_source"].forEach(prop => {
                Reflect.defineProperty(this, prop, {
                    get: () => this.#element[prop]
                })
            })
        }
        // 
    }

    global.createComp = (type) => {
        return (...children) => {
            return new ReactElement(type, ...children)
        }
    }
    // 通过 proxy 实现
    global.createCompProxy = (type,compProps) => {
        compProps = compProps || []
        const reactProps = ['$$typeof', "type", "key", "ref", "_owner", "props", "_self", "_source",'_store']
        const mixProps = compProps.filter(item=>reactProps.includes(item)).map(item=>`set${item[0].toUpperCase()}${item.slice(1)}`)
        let element = null
        let self = null
        const addProp = (prop)=>{
            Object.assign(element.props,prop)
            return self 
        }
        const config =  {
            get(target,prop,self){
                if(prop == 'setKey'){
                    return (value)=>{
                        element['key'] = value
                        return self
                    }
                }else if(prop == 'setRef'){
                    return (value)=>{
                        element['ref'] = value
                        return self
                    }
                }else if(prop == 'setType'){
                    return (type)=>addProp({type})
                }else if(prop == 'addProp'){
                    return addProp
                }else if(reactProps.includes(prop)) {
                    return target[prop]
                }else if(compProps.includes(prop)){
                    return (value)=>addProp({[prop]:value})
                }else if(mixProps.includes(prop)){
                    return (value)=>addProp({[prop.toLowerCase().slice(3)]:value})
                }else {
                    return (value)=>addProp({[prop]:value})
                }
            },
        }
        return function(...children) {
            element = {...React.createElement(type,null,...children)}
            Object.assign(element,{props:{...element.props}})
            return (self = new Proxy(element,config))
        }
    }
    // 通过 类 实现
    global.generateCompClass = (type)=>{
        return class extends ReactElement{
            constructor(...children){
              super(type,...children)
            }
        }
    }
})(this)


