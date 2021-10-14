// const path = require('path')

module.exports = {
  publicPath: "./",
  outputDir: "D:\\CommonApp\\okg2",
  //   assetsDir: "static",
  // indexPath:'index.html',
  devServer: {
    // open: process.platform === "darwin",
    open: true, //启动服务后自动打开浏览器
    // host: 'localhost',
    // port: 8085,
    // https: false,
    // hotOnly: false,
    proxy: {
      "/baseApi": {
        target: "http://127.0.0.1:8300",
        changeOrigin: true,
        pathRewrite: {
          "^/getTargetApi": "",
        },
      },
      "/myMap": {
        //走代理时获取切片的速度会变慢
        target: "http://127.0.0.1:8300",
        changeOrigin: true,
        pathRewrite: {
          "^/myMap": "",
        },
      },
    },
    /* configureWebpack: {
            output: {
                sourcePrefix: ' '
            },
            amd: {
                toUrlUndefined: true
            },
            resolve: {
                alias: {
                    'vue$': 'vue/dist/vue.esm.js',
                    '@': path.resolve('src'),
                }
            },
            plugins: [
    
            ],
            module: {
                unknownContextCritical: /^.\/.*$/,
                unknownContextCritical: false
            }
        },
        pwa: {
            iconPaths: {
                favicon32: 'favicon.ico',
                favicon16: 'favicon.ico',
                appleTouchIcon: 'favicon.ico',
                maskIcon: 'favicon.ico',
                msTileImage: 'favicon.ico'
            }
        } */
  },
};
