import {createContext,useReducer} from 'react'
import createCompProxy from './comp/tools/createComp'

export const context = createContext({})
const Provider = createCompProxy(context.Provider)
function reducer(state,action) {
    switch(action.type){
        case 'add':
            return {count: state.count +1}
    }
}
export default createCompProxy{
    const [{children}] = args
    const [state,dispatch] = useReducer(reducer,{count:0})
    return  Provider(
        children
    ).value({state,dispatch})
}
