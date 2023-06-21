const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://dclm-mmp.cluster1.devtestlab2.tecnotree.com",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
      secure:false,
      headers:{Host:"dclm-mmp.cluster1.devtestlab2.tecnotree.com"}
    })
  );
  app.use(
    "/product",
    createProxyMiddleware({
      target: "https://dclm-mmp.cluster1.devtestlab2.tecnotree.com",
      changeOrigin: true,
      pathRewrite: { "^/product": "" },
      secure:false,
      headers:{Host:"dclm-mmp.cluster1.devtestlab2.tecnotree.com"}
    })
  );
  // app.use(
  //   "/notification",
  //   createProxyMiddleware({
  //     target: "http://mmp-dap.cluster1.devtestlab2.tecnotree.com",
  //     changeOrigin: true,
  //     pathRewrite: { "^/notification": "" },
  //   })
  // );
};
