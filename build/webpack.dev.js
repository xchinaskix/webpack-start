const common = require('./webpack.common');
const merge = require('webpack-merge');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // contentBase: common.externals.paths.dist,
        port: 8081,
        overlay: {
          warnings: true,
          errors: true
        }
      },
    output: {
        path: common.externals.paths.dist,
        filename: 'main.js'
    },
})