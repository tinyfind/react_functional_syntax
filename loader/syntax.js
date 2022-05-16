// const esprima = require('./tools/esprima')
const {parse} = require('./tools/acorn')
const {generate} = require('escodegen')
const {traverse} = require('estraverse')

const traverseAst = (ast)=>{
    traverse(ast,{
        enter: function (node,parent) { 
            // // 针对 new 存在部分问题
            if(node.type === 'NewExpression'&&node.callee.type=='DetailCallbackExpression'){
                let argumentss = [{
                    type:"ArrowFunctionExpression",
                    body:node.callee.arguments,
                    params:[{
                        type:'RestElement',
                        argument:{
                            type:"Identifier",
                            name:'args'
                        }
                    }]
                }]
                node.arguments=argumentss
                node.callee = node.callee.callee
            }
            
            // 默认返回最后一行参数
            if(node.type==='DetailCallbackExpression'){
            // 默认返回最后一行参数 必须是 ExpressionStatement
                let expressionBodyLength = node.arguments.body.length
                if(expressionBodyLength){
                    let endExprssion = node.arguments.body[expressionBodyLength-1]
                    if(endExprssion.type === 'ExpressionStatement'){
                        endExprssion.type = 'ReturnStatement'
                        endExprssion.argument = endExprssion.expression
                    }
                }
                let arguments = [{
                        type:"ArrowFunctionExpression",
                        body:node.arguments,
                        params:[{
                            type:'RestElement',
                            argument:{
                                type:"Identifier",
                                name:'args'
                            }
                        }]
                    }]
                let type = 'CallExpression'
                Object.assign(node,{arguments,type})
            }
        },
        // Iterating the child **nodes** of unknown nodes.
        fallback: 'iteration'
    })
    return ast
}
module.exports = source =>{
    const ast = parse(source,{
        ecmaVersion:9,
        allowImportExportEverywhere:true,
        allowReturnOutsideFunction:true
    })
    return generate(traverseAst(ast))
}