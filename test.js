const acorn = require('./loader/tools/acorn')
// const {generate} = require('astring')
const fs = require('fs')
const estraverse = require('estraverse')
const {generate} = require('escodegen')
let ast =acorn.parse( `
   Array.map{
       console.log(3)
   }
`,{
    ecmaVersion:'latest',
    allowImportExportEverywhere:true,
    allowReturnOutsideFunction:true,
    
}
)
estraverse.traverse(ast, {
    enter: function (node,parent) { 
        // 针对 new
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
            let callee = node.callee.callee
            node.arguments=argumentss
            node.callee = callee
        }
        
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
});

fs.writeFileSync('ast.json',JSON.stringify(ast,null,2))
console.log(generate(ast))