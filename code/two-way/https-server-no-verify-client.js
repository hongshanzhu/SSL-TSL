var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt'),
  ca: [fs.readFileSync('ca.crt')],
  requestCert: false /*请求客户端证书 default:false*/
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8180);