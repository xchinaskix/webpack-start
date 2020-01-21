const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DashboardPlugin = require("webpack-dashboard/plugin");

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    test: path.join(__dirname, '../test'),
    test_dist: path.join(__dirname, '../test-dist'),
    assets: 'assets/'
};

module.exports = {
    externals: { paths: PATHS },
    entry: `${PATHS.src}/app.js`,
    stats: 'errors-only',
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: ['/node_modules/'],
            use: [{
                loader: 'babel-loader',
            }, ],
        }, 
        {
            test: /\.scss$/,
            use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', {
                loader: 'postcss-loader',
                options: {config: {path: './postcss.config.js'}}
            }, 'sass-loader']
        }
    ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist'],
            root: PATHS.dist
        }),
        new MiniCssExtractPlugin({
          filename: 'style.[contenthash].css',
        }),
        new HtmlWebpackPlugin({
          inject: false,
          hash: false,
          template: `${PATHS.src}/index.html`,
          filename: 'index.html'
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/assets`, to: `${PATHS.assets}` },
            { from: `${PATHS.src}/static`, to: `` },
        ]),
        new WebpackMd5Hash(),
        new DashboardPlugin()
      ]
}