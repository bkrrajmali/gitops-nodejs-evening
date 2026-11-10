const http = require('http');
const os = require('os');

const VERSION = 'v1';                                   // baked into the image
const PORT = process.env.PORT || 3000;
const MESSAGE = process.env.APP_MESSAGE || 'Hello from GitOps!'; // set in deployment.yaml

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('ok');
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: MESSAGE,
    version: VERSION,
    pod: os.hostname(),
    time: new Date().toISOString()
  }, null, 2) + '\n');
});

server.listen(PORT, () => console.log(`nodejs-gitops ${VERSION} listening on port ${PORT}`));
process.on('SIGTERM', () => server.close(() => process.exit(0)));