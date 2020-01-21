const common = require('./webpack.common');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');


module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimize: true,
        namedChunks: true,
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [
          new UglifyJsPlugin({cache: true}),
        ],
    },
    plugins: [
        new CompressionPlugin({
            cache: true,
            test: /\.js(\?.*)?$/i,
        })
    ],
    output: {
        path: common.externals.paths.dist,
        filename: 'main.[chunkhash].js',
        chunkFilename: `vendor.[chunkhash].js`,
    },
})