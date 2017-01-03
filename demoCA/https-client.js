var https = require('https');
var fs = require('fs');

var options = {
	hostname:'www.dummy.com',
	port:8180,
	path:'/',
	method:'GET',	
	ca: [fs.readFileSync('ca.crt')],
	// rejectUnauthorized: false,   //client igonre verify server
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