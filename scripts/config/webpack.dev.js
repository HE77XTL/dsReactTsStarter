const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { SERVER_HOST, SERVER_PORT, PROJECT_PATH } = require('../constants');

const proxySetting = require('../../src/setProxy.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    // devServer: {
    //     static: '../../dist',
    // },
    devServer: {
        host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
        port: SERVER_PORT, // 指定端口，默认是8080
        client: {
            progress: true,
            overlay: {
                errors: true,
                warnings: false,
            },
        },
        proxy: { ...proxySetting },
        compress: true, // 是否启用 gzip 压缩
        open: true, // 打开默认浏览器
        hot: true, // 热更新
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
