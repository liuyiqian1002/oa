const webpack = require('webpack');
const path = require('path')
module.exports = {
    devtool:'eval-source-map',
    entry:['babel-polyfill','whatwg-fetch',__dirname + '/src/index.js'],
    output: {
        path:path.resolve("../resources"),
        filename: "index.js"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE.ENV': "development"
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: 'babel-loader',
                query: {
                    presets: [ 'react','es2015','stage-0'],
                    plugins: ["transform-class-properties",["import", { libraryName: "antd", style: false}]]
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: "style-loader!css-loader?modules"
            }
        ]
    },
    devServer:{
        // contentBase:path.join(__dirname, "build"),
        contentBase:__dirname + "/build",
        historyApiFallback:true,
        hot:true,
        inline:true,
        port:3006,
        // host:'10.1.1.127'
    }
};