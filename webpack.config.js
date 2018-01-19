const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', //将css插入到HTML中
                    'css-loader'
                ]
            },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [{
                    loader: 'url-loader', //url-loader可以将图片转换成base64代码,减少http请求
                    options: {
                        limit: 1024,
                        name: '[name]-lhy.[ext]' //ext是扩展名
                    }
                }]
            }
        ]
    },
    plugins: [
        // process.env.NODE_ENV=development就会报错，没有这个变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
}
if (isDev) {
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
            port: 8000,
            host: '0.0.0.0', //这样设置可以通过IP和localhost访问
            overlay: {
                errors: true
            },
            hot: true,
            //不会让页面所有内容重新加载，只会加载修改过的组件
            // historyFallback:{

            // }
            // open: true
        },
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        )
}

module.exports = config