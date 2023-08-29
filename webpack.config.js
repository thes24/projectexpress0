const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let jsEntry = {}

glob.sync('./src/js/**/*.js').forEach(function (entry) {
    let tmp = entry.split('/').pop().split('.')[0];
    jsEntry[tmp] = [
        path.join(__dirname, entry)
    ];
})

let entry = jsEntry;

module.exports = {
    mode: 'development',
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/',
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [['@babel/preset-env', {
                    targets: { node: 'current' },
                    // modules: 'false',
                    useBuiltIns: 'usage'
                }]],
            },
            exclude: ['/node_modules'],
        }, {
            test: /\.css$/,
            use: ['style-loader','css-loader']
            // use: [MiniCssExtractPlugin.loader, 'css-loader'],
        }],
    },
    plugins: [],
    optimization: {},
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css'],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
        // new MiniCssExtractPlugin({ filename: 'app.css' })
    ],
};