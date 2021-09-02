module.exports = {
    plugins: [
        require('postcss-preset-env')({
            browsers: 'last 2 versions',
        }),
        require('postcss-flexbugs-fixes'),
        require('postcss-normalize'),
    ],
};
