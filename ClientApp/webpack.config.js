const webpack = require('webpack');
const path = require('path');

const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        'app': './app/index'
    },
    output: {
        path: path.join(__dirname, 'www', 'dist'),
        publicPath: '/dist/',
        filename: '[name]-bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, include: /app/, exclude: /node_modules/, loaders: ['babel-loader'] },
            { test: /(\.css)$/, loader: extractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
            { test: /\.jsx$/, include: /app/, loaders: ['babel-loader'] },
            { test: /\.ts$/, include: /app/, exclude: /node_modules/, loader: 'ts-loader' },
            { test: /\.tsx$/, include: /app/, exclude: /node_modules/, loader: 'ts-loader' },
            { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'file-loader' }
        ]
    },
    resolve: {
        extensions: [
            '.web.ts',
            '.ts',
            '.web.tsx',
            '.tsx',
            '.web.js',
            '.js',
            '.json',
            '.web.jsx',
            '.jsx',
        ],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new extractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
};