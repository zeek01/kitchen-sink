'use strict';

var Hapi = require('hapi'),
	MobileDetect = require('mobile-detect');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
	host: 'localhost', 
	port: 8666 
});

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
					// var md = new MobileDetect(request.headers['user-agent']);
					// console.log(md.userAgents());
          reply.file('./public/index.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public'
            }
        }
    });

});

// Start the server
server.start((err) => {

	if (err) {
		throw err;
	}

	console.log('Server running at:', server.info.uri);
});