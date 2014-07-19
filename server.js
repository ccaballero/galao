"use strict";

var WebSocketServer = require('websocket').server;
var http = require('http');
var port = 9091;

var server = http.createServer(function(request,response){
    console.log((new Date())
        + ' HTTP server. URL'
        + request.url
        + ' requested.');
});
server.listen(port, function() {
    console.log((new Date())
        + " Server is listening on port "
        + port);
});

var wsServer = new WebSocketServer({httpServer:server});
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // process WebSocket message
        }
    });

    connection.on('close', function(connection) {
        // close user connection
    });
});

