const PROXY_CONFIG = [
  {
    context: [
      "/api"
    ],
    target: "http://localhost:8080",
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
    onProxyReq: function (proxyReq, req, res) {
      console.log('Proxying request:', req.url, 'to', proxyReq.path);
    },
    onError: function (err, req, res) {
      console.error('Proxy error:', err);
    }
  }
];

module.exports = PROXY_CONFIG;
