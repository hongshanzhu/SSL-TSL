var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};

https.createServer(options, function (req, res) {
  var content = "";
  console.log(req.headers);
  //var body = JSON.parse(req.body);
  req.on('data', function (chunk) {
    content += chunk;
    console.log(JSON.parse(chunk));
  });

  req.on('end', function () {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("You've sent: " + content);
    res.end("hello world\n");
  });
  
}).listen(8180);