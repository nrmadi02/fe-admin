const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.estehku.online/api/v1',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
