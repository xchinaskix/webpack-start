let glob = require('glob');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const entry = glob.sync(`${common.externals.paths.test}/**/*.test.js`);
console.log(entry);

module.exports = merge(common, {
    mode: 'development',
    entry,
    devtool: 'source-map',
    output: {
        path: common.externals.paths.test_dist,
        filename: 'main.js'
    },
})