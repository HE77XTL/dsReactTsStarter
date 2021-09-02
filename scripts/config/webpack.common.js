const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { PROJECT_PATH, isDev } = require('../constants');
const WebpackBar = require('webpackbar');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(PROJECT_PATH, './src/index.tsx'),
    },
    output: {
        filename: `static/js/[name]${isDev ? '' : '.[hash:8]'}.js`,
        path: path.resolve(PROJECT_PATH, './dist'),
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            Src: path.resolve(PROJECT_PATH, './src'),
            Components: path.resolve(PROJECT_PATH, './src/components'),
            Utils: path.resolve(PROJECT_PATH, './src/utils'),
        },
    },
    cache: {
        type: 'filesystem', //将缓存类型设置为文件系统，默认为memory
        buildDependencies: {
            config: [__filename], // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(PROJECT_PATH, './public/index.html'),
            filename: 'index.html',
            cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
            minify: isDev
                ? false
                : {
                      minifyCSS: true,
                      minifyJS: true,
                      minifyURLs: true,
                      useShortDoctype: true,
                  },
        }),
        new MiniCssExtractPlugin({
            filename: `static/css/[name]_v[hash].css`,
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(PROJECT_PATH, './public'),
                    to: '',
                    filter: async (resourcePath) => {
                        if (resourcePath.includes('index.html')) {
                            return false;
                        }
                        return true;
                    },
                },
            ],
        }),
        new WebpackBar({
            name: isDev ? '正在启动' : '正在打包',
            color: '#fa8c16',
        }),

        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(PROJECT_PATH, './tsconfig.json'),
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                options: { cacheDirectory: true },
                exclude: /node_modules/,
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: isDev,
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(
                                    __dirname,
                                    './postcss.config.js',
                                ),
                            },
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: isDev,
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/assets/imgaes/[hash][ext][query]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/assets/fonts/[hash][ext][query]',
                },
            },
        ],
    },
    optimization: {
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
            // `...`,
            new CssMinimizerPlugin(),
        ],
    },
    externals: {
        // 这个可以到后期再加上， 比如将静态文件上传到自己的cdn
        // 需要在html 引入，具体的包版本， 可查看package-lock
        // react: 'React',
        // 'react-dom': 'ReactDOM',
    },
};
