/**
 * @description webpack 基础配置配置
 */
const path = require("path");
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * 编译排除的文件
 * @type {RegExp}
 */
const excludeRegex = /(node_modules|bower_modules)/;

/**
 * 格式化不同的样式loader
 * @param otherLoader
 * @return {*}
 */
const formatStyleLoader  = (otherLoader = null) => {
    const baseLoaders = [
        {
            loader: 'css-loader',
            options: {
                sourceMap: true
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
                ident: 'postcss', 	// https://webpack.js.org/guides/migrating/#complex-options
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9' // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009'
                    })
                ]
            }
        }
    ];

    if(otherLoader) {
        // 针对scss进行css-module处理
        if(otherLoader.loader == 'sass-loader'){
            baseLoaders[0] = {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    modules: true,
                    localIdentName: '[name]__[local]__[hash:base64:5]'
                }
            }
        }

        baseLoaders.push(otherLoader);
    }

    // baseLoaders.unshift({
    //     loader: "style-loader",
    // });

    baseLoaders.unshift(MiniCssExtractPlugin.loader);
    return baseLoaders;

};


/**
 * 获取模型规则
 * @return {*[]}
 */
const getModuleRules = () => {
    // 处理静态资源规则
    const staticResourceRules = [
        {
            test: /\.(png|jpg|gif|jpeg|svg)$/,
            // use: 'url-loader?limit=8192' //  <= 8kb的图片base64内联
            use: 'url-loader?limit=88888888'
        },
        {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            use: 'url-loader?limit=88888888&minetype=application/font-woff'
        },
        {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            use: 'url-loader?limit=88888888&minetype=application/font-woff'
        },
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            use: 'url-loader?limit=88888888&minetype=application/octet-stream'
        },
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            use: 'file-loader'
        },
        {
            test: /\.(txt|doc|docx|swf)$/,
            use: 'file-loader?name=[path][name].[ext]'
        },
        {
            test: /\.md$/,
            use: 'raw-loader'
        }
    ];

    // 处理css资源规则
    const cssRules = [
        {
            test: /\.css$/,
            use: formatStyleLoader()
        },
        {
            test: /\.less/,
            use: formatStyleLoader({
                loader: 'less-loader',
                options: {
                    sourceMap: process.env.NODE_ENV === "production" ? false :true,
                    modifyVars: {}
                }
            })
        },
        {
            test: /\.scss/,
            exclude: excludeRegex,
            use: formatStyleLoader({
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            })
        },
    ];

    return [
        ...staticResourceRules,
        ...cssRules,

        {
            loader: 'babel-loader',
            exclude: [ excludeRegex ],
            test: /\.jsx?$/,
            options: {
                presets: [

                    ['@babel/preset-env', {
                        loose: true,
                        targets: {
                            // 根据browserslist来分析支持情况， 具体的配置参照： https://github.com/ai/browserslist
                            browsers: [
                                "last 2 versions",
                                "ie >= 8",
                            ],
                        },
                        modules: false,              // modules预先将es6模块转成"amd" | "umd" | "systemjs" | "commonjs", 值为false则不转换
                        useBuiltIns: "usage",        // 按需动态加载polyfills
                        // debug: process.env.NODE_ENV === "production" ? false :true
                        debug: false
                    }],
                    '@babel/preset-react',  // 转换jsx语法
                ],
                plugins: [
                    require("@babel/plugin-proposal-function-bind"),        // 支持::obj.func 等价与obj.func.bind(obj) 参照:https://babeljs.io/docs/en/next/babel-plugin-proposal-function-bind
                    require("@babel/plugin-syntax-dynamic-import"),         // 支持动态import
                    [require("@babel/plugin-proposal-decorators"), { "legacy": true }],         // 支持装饰器语法
                    [require("@babel/plugin-proposal-class-properties"), { "loose": true }],    // 支持class属性初始化和static
                    require("@babel/plugin-proposal-object-rest-spread"),       // 支持...rest
                    require("@babel/plugin-proposal-export-default-from"),      // 支持 export v from 'mod'语法
                    require("@babel/plugin-proposal-export-namespace-from"),    // 支持 export * as ns from 'mod'
                    require("@babel/plugin-syntax-import-meta"),
                    require("@babel/plugin-proposal-json-strings")
                ]
            }
        }
    ]
};

/**
 * 获取插件
 * @returns {*[]}
 */
const getPlugins = () => ([
    // 提取css
    new MiniCssExtractPlugin({
        filename: "[name].css"
    }),
]);

/**
 * 获取优化配置
 */
const getOptimization = () => ({
    // 代码分割策略配置
    splitChunks: {
        cacheGroups: {}
    },
});


const webpackConf = {
    // 用于生成源代码的mapping
    devtool: 'cheap-module-source-map',	// cheap-module-source-map,cheap-source-map
    mode: 'development',
    optimization: getOptimization(),

    entry: {
        app: "./playground/app.js"
    },

    // 从bundle中分离第三方依赖
    externals: {},

    // 指定模块目录名称
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules', 'web_modules'],
    },

    node: {
        net: 'empty',
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "playground/build")
    },

    module: {
        rules: getModuleRules()
    },

    plugins: getPlugins()
};

module.exports = webpackConf;
