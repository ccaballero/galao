"use strict";

var WebSocketServer=require('websocket').server;
var http=require('http');

var port;
if(process.env.PORT){
    port=process.env.PORT
} else {
    port=9001;
}

var server=http.createServer(function(request,response){
    console.log((new Date())+' HTTP server. URL'+request.url+' requested.');
});

server.listen(port,function(){
    console.log((new Date())+' Server is listening on port '+port);
});

var clients=new Array();

var wsServer=new WebSocketServer({httpServer:server});
wsServer.on('request',function(request){
    var connection=request.accept(null,request.origin);

    console.log((new Date())+' Connection Established');
    clients.push(connection);

    connection.on('message',function(message){
        console.log((new Date())+' Action triggered '+message);
        for(var i=0;i<clients.length;i++){
            clients[i].sendUTF(message.utf8Data);
        }
    });

    connection.on('close',function(connection){
        console.log((new Date())+' Client Disconnected');
    });
});

