const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')
const {RemoveCommonentsPlugin} = require('./plugin/remove-comments-plugin')
module.exports = {
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'bundle.js'
    },
    devServer: {
        hot:true, // 它是热更新：只更新改变的组件或者模块，不会整体刷新页面
        open: true, // 是否自动打开浏览器
        proxy: { // 配置代理（只在本地开发有效，上线无效）
          '/api': {
            target: 'http://localhost:3300', // 这是本地用node写的一个服务，用webpack-dev-server起的服务默认端口是8080
            pathRewrite: {"/api" : "/api"}, // 后台在转接的时候url中是没有 /api 的
            changeOrigin: false, // 加了这个属性，那后端收到的请求头中的host是目标地址 target
          },
        } 
    },
    module:{
        rules:[
            {test:/\.vue$/,use:'vue-loader'},
            {test:/\.s[ca]ss$/,use:['style-loader','css-loader', 'sass-loader',]},
            {test:/\.css/,use:['style-loader','css-loader']},
            {
                test:/\.m?js$/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:['@babel/preset-react']
                        }
                    }  ,
                    {
                        loader:'./loader/syntax'
                    }  
                ]
            },
            {test:/\.(png|jpe?g|gig|svg|webp)$/,type:'asset/resource'},
            {test:/\.md$/,use:'./loader/md-loader'},
        ],
    },
    plugins:[
        new VueLoaderPlugin(),
        new RemoveCommonentsPlugin([1])
    ],

}
