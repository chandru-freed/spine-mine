const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.PLAY_PUBLIC_DIR != undefined
    ? process.env.PLAY_PUBLIC_DIR
   : '/',
  transpileDependencies: ['vuetify'],
  // devServer: {
  //   https: false,
  //   port: 8080,
  //   open: false, // opens browser window automatically
  //   proxy: {
  //     // proxy all requests starting with /api to jsonplaceholder
  //     '/gompa-api': {
  //       target: 'https://localhost:9000/gompa-api',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/gompa-api': ''
  //       }
  //     }

  //   }
  // },
  // devServer: {
  //   proxy: {
  //     "/gompa-api": {
  //       target: "http://localhost:9000",
  //       changeOrigin: true,
  //       logLevel: "debug",
  //       pathRewrite: { "^/gompa-api": "/gompa-api" }
  //     }
  //   }
  // }

  
  devServer: {
    //proxy: 'http://192.168.100.100:9000'
    // proxy: 'http://ops-stage.freed.care'
    // proxy: 'http://127.0.0.1:9000'
    // proxy: 'http://10.10.14.78:9000'
    // proxy: 'https://dev-wms.rattusapps.com'
     proxy: 'http://localhost:9000'
 }
})
