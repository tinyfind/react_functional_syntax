import * as antd from 'antd'
import createCompProxy from './tools/createComp'


const compObj = {}

function updateFunctionComp(materials, prevStr) {
    // 针对首字母大写的key
	Object.keys(materials).filter(compName => compName[0].charCodeAt() <= 90 && compName[0].charCodeAt() >= 65).forEach(compName => {
        updateFunctionComp(materials[compName], prevStr+compName)
        compObj[`${prevStr}${compName}`] = createCompProxy(materials[compName])
	})
}

updateFunctionComp(antd,'')

export default compObj
