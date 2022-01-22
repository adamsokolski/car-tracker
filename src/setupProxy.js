const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api-client-portal/map?objectType=VEHICLE',
    createProxyMiddleware({
      target: 'https://dev.vozilla.pl',
      changeOrigin: true,
    })
  )
}
