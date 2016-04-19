var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin  = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

var srcDir = 'public_src';
var outputDir = 'public';

module.exports = {
    devtool: "source-map",
    debug: true,
    entry: {
        libs: path.resolve(srcDir, 'libs.ts'),
        app: path.resolve(srcDir, 'bootstrap.ts')
    },
    output: {
        path: outputDir,
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },
    resolve: {
        extensions: ['', '.ts', '.component.ts', '.service.ts', '.js', '.component.html', '.component.less', '.less', '.css', '.json']
    },
    module: {
        loaders: [
            { test: /(\.component|\.service|)\.ts$/, loader: 'ts-loader'},
            { test: /\.component\.html$/, loader: 'raw' },
            { test: /(\.component|)\.less$/, loader: 'to-string!css!less' },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
            { test: /\.(png|gif|jpg)$/, loader: "file?name=images/[name].[ext]" },
            // For font-awesome, created by Turbo87:
            // https://gist.github.com/Turbo87/e8e941e68308d3b40ef6
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
        ],
        noParse: [ path.join(__dirname, 'node_modules', 'angular2', 'bundles') ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            template: path.resolve(srcDir, 'index.html'),
            inject: true
        }),
        new CopyWebpackPlugin([
                    { from: path.resolve(srcDir, 'data/states.json') }
                ]),
        new CopyWebpackPlugin([
                    { from: path.resolve(srcDir, 'web.config') }
                ])
    ]
};
