"use strict";

$(function(){
    var host='localhost';
    var port='9001';
    var connection;

    console.log('starting the remote control');
    window.WebSocket=window.WebSocket||window.MozWebSocket;

    var f=function(connection,task){
        console.log(task);
        connection.send(JSON.stringify({action:task}));
    };

    var connect=function(host,port){
        connection=new WebSocket('ws://'+host+':'+port);
        connection.onopen=function(){};
        connection.onerror=function(error){};
        connection.onmessage=function(message){};
    };

    $('.up').click(function(){f(connection,'up')});
    $('.down').click(function(){f(connection,'down')});
    $('.prev').click(function(){f(connection,'prev')});
    $('.next').click(function(){f(connection,'next')});

    var content = $('#settings').html();
    var overlay = new Overlay();


    $('.settings').click(function(){
        overlay.append_content(content);
        overlay.show();

        $('.connect').click(function(){
            console.log('try to connect');
            connect(
                $('input[name="host"]').val(),
                $('input[name="port"]').val()
            );
            overlay.hide();
        });
    });

});

