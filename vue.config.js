const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath:
    process.env.PLAY_PUBLIC_DIR != undefined
      ? process.env.PLAY_PUBLIC_DIR
      : "/",
  transpileDependencies: ["vuetify"],

  devServer: {
    // proxy: "http://localhost:9000/",
    proxy: "https://stage-spine.freed.care/",
  },
});
