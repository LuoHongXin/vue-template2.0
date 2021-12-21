"use strict";
const path = require("path");

// 实现web项目 全局修改主题颜色
const themeColorReplacer = require("webpack-theme-color-replacer");
//开启 Gzip 方法
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const isPro = process.env.NODE_ENV === "production";

const { getThemeColors, modifyVars } = require("./src/utils/themeUtil");

const { resolveCss } = require("./src/utils/theme-color-replacer-extend");

const { userDev } = require("./src/utils/account");

// 给build生成文件增加版本号 年+月+日+时间戳
const getDateTimes = (function() {
  let data = new Date(new Date().toString());
  let timezoneOffsetInHours = -(data.getTimezoneOffset() / 60); //UTC minus local time
  let currDate = new Date(
    data.getFullYear(),
    data.getMonth(),
    data.getDate(),
    data.getHours(),
    data.getMinutes(),
    data.getSeconds()
  );
  currDate.setHours(data.getHours() + timezoneOffsetInHours);
  let toISO = currDate.toISOString().match(/\d+/g);
  let strDate = toISO.map(val => {
    return val.length === 1 ? "0" + val : val;
  });
  return parseInt(strDate.join("")) / 1000;
})();

const productionGzipExtensions = ["js", "css"];

const assetsPath = "static";

const publicPath = process.env.NODE_ENV === "production" ? "./" : "/";

// posix兼容方式处理路径
const posixJoin = _path => path.posix.join(assetsPath, _path);

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = ""; // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
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
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // 将构建好的文件输出到哪里
  outputDir: "dist",
  //指定生成的index.html的输出路径，相对于outputDir。也可以是一个绝对路径。
  indexPath: "index.html",
  // //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: assetsPath,
  // 是否在保存的时候检查
  lintOnSave: process.env.NODE_ENV === "development",
  // 生产环境是否生成 SourceMap
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false, //设置浏览器是否自动打开
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/api": {
        //此处要与 /services/api.js 中的 API_PROXY_PREFIX 值保持一致
        // target: "http://192.168.205.213:8080/",
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
        ws: false, // ws: false 解决sockjs 一直在频繁发送这个请求
        pathRewrite: {
          "^/websocket": "/websocket"
        }
      }
    },
    // 这里有before和after两种方式，但是有后端接口的话，改用after更好
    after: require("./mock/mock-server.js")
  },
  pluginOptions: {
    //引入全局less变量的方式
    "style-resources-loader": {
      preProcessor: "less",
      //这个是加上自己的路径，
      //注意：试过不能使用别名路径
      patterns: [
        path.resolve(__dirname, "./src/theme/theme.less"),
        path.resolve(__dirname, "./src/styles/variables.less")
      ]
    }
  },

  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: {
      filename: posixJoin("css/[name]." + getDateTimes + ".css"),
      chunkFilename: posixJoin("css/[name]." + getDateTimes + ".css")
    },
    // 是否开启 CSS source map？
    sourceMap: false,
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    requireModuleExtension: true,
    // 解决ant-design-vue 按需引入组件 less 版本冲突问题
    loaderOptions: {
      less: {
        lessOptions: {
          // important extra layer for less-loader^6.0.0
          // 使用 modifyVars 的方式来进行覆盖antd变量
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
    // 解决ie11兼容ES6
    config.entry.app = ["babel-polyfill", "whatwg-fetch", "./src/main.js"];
    config.plugins.push(
      // 生成仅包含颜色的替换样式（主题色等）
      new themeColorReplacer({
        fileName: posixJoin("css/theme-colors." + getDateTimes + ".css"),
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
      // return {
      //   plugins: [
      //     // 使用包分析工具
      //     new BundleAnalyzerPlugin()
      //   ]
      // }
    }
  },
  chainWebpack(config) {
    // 别名配置
    config.resolve.alias
      .set("@", path.resolve(__dirname, "./src"))
      .set("@views", path.resolve(__dirname, "./src/views"))
      .set("@images", path.resolve(__dirname, "src/assets/images"));

    // 它可以提高第一屏的速度，建议开启预加载
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial"
      }
    ]);

    // 删除预加载
    config.plugins.delete("preload").delete("prefetch");

    // 当有很多页面时，会产生很多无意义的请求
    config.plugins.delete("prefetch");

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
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();

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
          // aws: {
          //   name: 'aws',
          //   test: /src\/utils\/aws.js/,
          //   reuseExistingChunk: true,
          //   enforce: true,
          //   priority: 90
          // },
          vue: {
            name: "vue-main",
            minChunks: 1,
            test: /[\\/]node_modules[\\/]_?(vue-router|vuex|axios|vue)(.*)/,
            reuseExistingChunk: true, //如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
            enforce: true,
            priority: 100 //值越大,优先级越高.模块先打包到优先级高的组里
          },
          echarts: {
            name: "vue-echarts",
            minChunks: 1,
            test: /[\\/]node_modules[\\/]_?echarts(.*)/,
            reuseExistingChunk: true,
            enforce: true,
            priority: 80
          },
          antDesignVue: {
            name: "chunk-antDesignVue", // split antDesignVue into a single package
            priority: 70, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/ // in order to adapt to cnpm
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
          .set("filename", posixJoin(`js/[name].${getDateTimes}.js`))
          .set("chunkFilename", posixJoin(`js/[name].${getDateTimes}.js`));
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
    });

    // 修改图片输出路径
    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|ico|ttf)(\?.*)?$/)
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 10,
        // 以下配置项用于配置file-loader,将图片打包到dist/img文件夹下, 不配置则打包到dist文件夹下
        outputPath: assetsPath,
        // 配置打包后图片文件名
        name: `images/[name].${getDateTimes}.[ext]`
      }).end()
      const fontRule = config.module.rule('fonts');
    fontRule.uses.clear();
    fontRule
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'fonts/[name].[hash:8].[ext]',
        publicPath,
      })
      .end();
  }
};
