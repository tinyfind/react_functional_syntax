class RemoveCommonentsPlugin{
    apply(compiler){
        compiler.hooks.emit.tap('RemoveCommonentsPlugin',
            compilation=>{
                Object.keys(compilation.assets).forEach(
                    fileName=>{
                        if(fileName.endsWith('.js')){
                            const contents = compilation.assets[fileName].source()
                            // const resultContents = contents.replace()
                            // compilation.assets[name]={
                            //     source:()=>resultContents,
                            //     size:()=>resultContents.length
                            // }
                        }
                    }
                )
            }

        )
    }
}

module.exports = {
    RemoveCommonentsPlugin
}