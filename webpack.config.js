const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const webpack = require('webpack');

module.exports = {
    mode: "development",

    entry: __dirname + "/src/index.js",
    output: {
        path: __dirname + '/dist', // Folder to store generated bundle
        filename: 'bundle.js',  // Name of generated bundle after build
        publicPath: '/' // public URL of the output directory when referenced in a browser
    },


    module: {
        rules:[
            
            // Loading js-files
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },

            // Loading images
            {
                test: /\.(jpg|jpeg|png|gif|ico|)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'img',
                            name: '[name]-[sha1:hash:7].[ext]'
                        }
                    }
                ]
            },
            
            // Loading fonts
            {
                test: /\.(ttf|otf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },

            // Loading css
            {
                test: /\.(css)$/,
                //use: ['style-loader','css-loader']
                use: [MiniCssExtractPlugin.loader,'css-loader']
            },
            // Loading SASS/SCSS
            {
                test: /\.(s[ca]ss)$/,
                use: [
                    //{loader: 'style-loader'},
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'}
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hello, World',
            template: 'index.html'
        }),

        new MiniCssExtractPlugin({
            filename: 'main-[hash:8].css'
        })

        //new webpack.HotModuleReplacementPlugin()
    ],

    devServer:{
        open: true,
        historyApiFallback: true,
        port: 8080
        //hot: true
    }
};