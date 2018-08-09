var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
  // This is necessary only if the client uses the self-signed certificate.
  ca: [fs.readFileSync('ca.crt')],
  // This is necessary only if using the client certificate authentication. default:false
  requestCert: true 
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8180,'127.0.0.1');