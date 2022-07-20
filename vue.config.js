// 本地代理配置
const { name } = require("./package");
const { userDev } = require("./src/utils/account");

const webpack = require("webpack");

const { modifyVars } = require("hx-antd-vue/src/antdVars");

const {
  themeColorReplacer,
  getThemeColors,
  resolveCss
} = require("hx-antd-vue/src/theme");

const path = require("path");
// posix兼容方式处理路径
const posixJoin = _path => path.posix.join(assetsPath, _path);

//开启 Gzip 方法
const CompressionWebpackPlugin = require("compression-webpack-plugin");

// 给build生成文件增加版本号 年+月+日+时间戳
const { getDateTimes } = require("./src/utils");
const dataTimes = getDateTimes();

function resolve(dir) {
  return path.join(__dirname, dir);
}

const isPro = process.env.NODE_ENV === "production";
// 是否接入到主应用
const isAccessApp = process.env.VUE_IS_ACCESS_APP === "main";

// 开发环境端口
const port = process.env.PORT || 7070;
const productionGzipExtensions = ["js", "css"];

const assetsPath = "static";

const posicJoin = _path => path.posix.join(assetsPath, _path);

const whComponentPath = "./node_modules/hx-antd-vue/src/styles/index.less";

// 第三方公共依赖
const dllModules = ["vue", "wc"];
const dllPlugin =
  isPro && isAccessApp
    ? dllModules.map(item => {
        return new webpack.DllReferencePlugin({
          context: __dirname, // 当前目录下的依赖
          // 注意路径别写错
          manifest: require(resolve(
            `./common-resources/dll/${item}-manifest.json`
          ))
        });
      })
    : [];
module.exports = {
  // tab 标签logo
  pwa: {
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico"
    }
  },
  publicPath: process.env.NODE_ENV === "production" ? `/${name}/` : "/",
  outputDir: resolve(`./dist/${name}`),
  indexPath: "index.html",
  assetsDir: assetsPath,
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV === "development",

  devServer: {
    port: port,
    open: false, //设置浏览器是否自动打开
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    proxy: {
      "/api": {
        target: userDev.api,
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/api": ""
        },
        ws: false
      },
      "/websocket": {
        target: userDev.socket, // 为目标变量
        changeOrigin: true, //是否跨域
        ws: true, // ws: false 解决sockjs 一直在频繁发送这个请求
        pathRewrite: {
          "^/websocket": "/websocket"
        }
      }
    }
  },
  pluginOptions: {
    //引入全局less变量的方式
    "style-resources-loader": {
      preProcessor: "less",
      //这个是加上自己的路径，
      //注意：试过不能使用别名路径
      patterns: [resolve(whComponentPath)]
    }
  },
  css: {
    extract: {
      filename: posicJoin("css/[name]." + dataTimes + ".css"),
      chunkFilename: posicJoin("css/[name]." + dataTimes + ".css")
    },
    // 是否开启 CSS source map？
    sourceMap: false,
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    requireModuleExtension: true,
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: modifyVars(),
          javascriptEnabled: true
        }
      }
    }
  },
  configureWebpack: config => {
    // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    config.resolve.extensions = [
      ".js",
      ".json",
      ".vue",
      ".css",
      ".less",
      ".scss"
    ];
    // 若是接入到主应用，则去掉 解决ie11兼容ES6
    // config.entry.app = ["babel-polyfill", "whatwg-fetch", "./src/main.js"];

    // 忽略打包好的 dll 模块的编译
    dllPlugin.map(item => {
      config.plugins.push(item);
    });
    // 主题色替换
    config.plugins.push(
      new themeColorReplacer({
        filename: posicJoin("css/theme-colors.[contenthash:8].css"),
        matchColors: getThemeColors(),
        injectCss: true,
        resolveCss
      })
    );
    if (isPro) {
      // 开启gzip
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8
        })
      );
    }
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = "umd";
    config.output.jsonpFunction = `webpackJsonp_${name}`;
  },
  chainWebpack(config) {
    // 别名配置
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("@utils", resolve("./src/utils"))
      .set("@assets", resolve("./src/assets"))
      .set("@cs", resolve("./common-resources"))
      .set("@views", resolve("./src/views"));

    // 它可以提高第一屏的速度，建议开启预加载
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial"
      }
    ]);
    // 生产环境下关闭css压缩的 colormin 项，因为此项优化与主题色替换功能冲突
    if (isPro) {
      config.plugin("optimize-css").tap(args => {
        args[0].cssnanoOptions.preset[1].colormin = false;
        return args;
      });
    }
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(path.join(__dirname, "src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(path.join(__dirname, "src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();

    // runtime 代码就会内联在 index.html 中
    config.when(process.env.NODE_ENV !== "development", config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end();
      // 分割代码
      config.optimization.splitChunks({
        chunks: "all", //在做代码分割时，只对异步代码生效，写成all的话，同步异步代码都会分割
        minSize: 30000, //引入的包大于30KB才做代码分割
        minChunks: 1, //当一个包至少被用了多少次的时候才进行代码分割
        maxAsyncRequests: 5, //同时加载的模块数最多是5个
        maxInitialRequests: 3, //入口文件做代码分割最多能分成3个js文件
        automaticNameDelimiter: "~", //文件生成时的连接符
        name: true, //让cacheGroups里设置的名字有效
        cacheGroups: {
          vue: {
            name: "vue-main",
            minChunks: 1,
            test: /[\\/]node_modules[\\/]_?(vue-router|vuex|axios|vue)(.*)/,
            reuseExistingChunk: true, //如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
            enforce: true,
            priority: 100 //值越大,优先级越高.模块先打包到优先级高的组里
          },
          antDesignVue: {
            name: "chunk-antDesignVue", // split antDesignVue into a single package
            priority: 70, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/ // in order to adapt to cnpm
          },
          whComponent: {
            name: "chunk-whComponent", // split whComponent into a single package
            priority: 70, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?hx-antd-vue(.*)/ // in order to adapt to cnpm
          },
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      // 生产环境js增加版本号
      config.when(process.env.NODE_ENV, config => {
        config.output
          .set("filename", posixJoin(`js/[name].${dataTimes}.js`))
          .set("chunkFilename", posixJoin(`js/[name].${dataTimes}.js`));
      });
      // 设定 runtime 代码单独抽取打包
      config.optimization.runtimeChunk("single");
    });

    // 修改图片输出路径;
    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|ico)(\?.*)?$/)
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 10,
        // 以下配置项用于配置file-loader,将图片打包到dist/img文件夹下, 不配置则打包到dist文件夹下
        outputPath: assetsPath,
        // 配置打包后图片文件名
        name: `images/[name].${dataTimes}.[ext]`
      })
      .end();
  }
};
