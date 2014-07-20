"use strict";

$(function(){
    var host='localhost';
    var port='9001';

    console.log('starting the remote control');
    window.WebSocket=window.WebSocket||window.MozWebSocket;
    var connection=new WebSocket('ws://'+host+':'+port);

    connection.onopen=function(){};
    connection.onerror=function(error){};
    connection.onmessage=function(message){};

    var f=function(connection,task){
        console.log(task);
        connection.send(JSON.stringify({action:task}));
    }


    $('.up').click(function(){f(connection,'up')});
    $('.down').click(function(){f(connection,'down')});
    $('.prev').click(function(){f(connection,'prev')});
    $('.next').click(function(){f(connection,'next')});
});

