const webpack = require('webpack');
module.exports = {
    devtool:'eval-source-map',
    entry:__dirname + '/src/index.js',
    output: {
        path: __dirname + "/build",
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
                    presets: ['stage-0','es2015', 'react'],
                    plugins:[['import',{libraryName:'antd',style:false}]]
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
        port:3003
    }
};