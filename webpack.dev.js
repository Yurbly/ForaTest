
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const publicPath = './client/public/';

module.exports = merge(common ,{
    mode: 'development',
    watchOptions: {
        ignored: /node_modules/
    },
    devServer: {
        publicPath: "/dist/assets/",
        hot: true,
        port: 9000,
        contentBase: path.resolve(__dirname, publicPath),
        compress: true,
        proxy: {
            '/fora': 'http://localhost:9001'
        },
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/dist/assets/index.html' },
            ]}
    }
});