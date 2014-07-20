"use strict";

$(function(){
    var api=impress();
    api.init();

    var host='localhost';
    var port='9001';

    console.log('starting the socket impress');
    window.WebSocket=window.WebSocket||window.MozWebSocket;
    var connection=new WebSocket('ws://'+host+':'+port);

    connection.onopen=function(){
        console.log('connect to the websocket');
    }
    connection.onerror=function(error){};

    connection.onmessage=function(message){
        var json=JSON.parse(message.data);
        console.log(json.action);
        switch(json.action){
            case 'next':
                api.next();
                break;  
           case "prev":
                api.prev();
                break;
        }
    };
});

