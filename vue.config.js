module.exports = {
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/set": {
        target: "http://89.208.198.209:8081",
        changeOrigin: true,
      },
    },
  },
};
