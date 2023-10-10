const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://gateway-test.apps.ocp4.pacosta.com',
      changeOrigin: true,
    })
  );
};