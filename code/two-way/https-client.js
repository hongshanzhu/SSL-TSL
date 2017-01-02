var https = require('https');
var fs = require('fs');

var options = {
	hostname:'testssl.com',
	port:8180,
	path:'/',
	method:'GET',
	// These are necessary only if using the client certificate authentication
	key:fs.readFileSync('client.key'),
	cert:fs.readFileSync('client.crt'),
	// This is necessary only if the server uses the self-signed certificate
	ca: [fs.readFileSync('ca.crt')],
	agent:false
};

options.agent = new https.Agent(options);
var req = https.request(options,function(res){
console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);
	res.setEncoding('utf-8');
	res.on('data',function(d){
		console.log(d);
	})
});

req.end();

req.on('error',function(e){
	console.log(e);
})