
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const sourceRoot = './client/js/';
const publicPath = './client/public/';

module.exports = {
    target: "web",
    context: __dirname,
    entry: path.resolve(__dirname, sourceRoot,"./index.js"),
    output: {
        path: path.resolve(__dirname, "client/dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    module:{
        rules:[
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insertAt: 'top' //todo
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less' ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${publicPath}/template.html`,
            inject: "body"
        })
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    }
};