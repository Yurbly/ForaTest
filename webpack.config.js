
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const sourceRoot = './client/';
module.exports = {
    target: "web",
    context: __dirname,
    mode: "development", //todo webpack mode
    entry: path.resolve(__dirname, "./client/index.js"),
    output: {
        path: path.resolve(__dirname, "/dist"),
        filename: "bundle.js",
        publicPath: "/dist/assets/"  //prefixes publicPath with 'localhost:9000/'
        /*This is an important option when using on-demand-loading or loading
        external resources like images, files, etc. If an incorrect value is
        specified you'll receive 404 errors while loading these resources.

        This option specifies the public URL of the output directory when referenced
        in a browser. A relative URL is resolved relative to the HTML page (or <base> tag).
        Server-relative URLs, protocol-relative URLs or absolute URLs are also possible and sometimes required,
        i. e. when hosting assets on a CDN.*/
    },
    watchOptions: {
        ignored: /node_modules/
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
    devServer: {
        publicPath: "/dist/assets/",  // relative path converts to localhost:9000/ + publicPath (for bundled files)
        hot: true,
        port: 9000,
        contentBase: path.resolve(__dirname, sourceRoot),
        compress: true,
        proxy: {
            '/fora': 'http://localhost:9001'
        }
    }
    ,
    resolve: {
        extensions: ['.js', '.jsx', '.less' ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${sourceRoot}/index.html`,
            inject: "body"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    }
};