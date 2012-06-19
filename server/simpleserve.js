var http = require ('http')
var os = require ('os')

http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type' : 'text/plain'})

	response.write(process.arch)

	console.time('response time')

	// setTimeout(function(){
		var cpu = os.cpus()
		console.log(cpu)
		response.write(JSON.stringify(cpu))
 		response.end("Yoo dude!! \n")
	// 	console.timeEnd('response time')
	// }, 2000)
	
}).listen(9231)

console.log('Server running in port 9231')



