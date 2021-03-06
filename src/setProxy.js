const proxySettings = {
    // 接口代理1
    '/api/': {
        target: '//baidu.com',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '',
        },
        xfwd: true,
    },
    // 接口代理2
    '/api-2/': {
        target: 'http://198.168.111.111:3002',
        changeOrigin: true,
        pathRewrite: {
            '^/api-2': '',
        },
    },
    // .....
};

module.exports = proxySettings;
