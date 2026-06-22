const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server
const proxy = httpProxy.createProxyServer({
  target: 'http://127.0.0.1:8081',
  changeOrigin: true,
  ws: true,
});

// Handle proxy errors
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  res.writeHead(502, { 'Content-Type': 'text/plain' });
  res.end('Bad Gateway - Failed to connect to dev server');
});

// Create the server
const server = http.createServer((req, res) => {
  // Fix the request host header to localhost for the backend
  req.headers.host = '127.0.0.1:8081';
  proxy.web(req, res);
});

// Handle WebSocket upgrades for hot reload
server.on('upgrade', (req, socket, head) => {
  req.headers.host = '127.0.0.1:8081';
  proxy.ws(req, socket, head);
});

// Listen on all interfaces on port 8081
server.listen(8081, '0.0.0.0', () => {
  console.log('🔄 Proxy server listening on http://0.0.0.0:8081');
  console.log('🎯 Forwarding traffic to http://127.0.0.1:8081');
  console.log('📱 Your phone should now be able to connect to http://192.168.1.11:8081');
});
