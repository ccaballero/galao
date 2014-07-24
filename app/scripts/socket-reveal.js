'use strict';

$(function(){
    Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,
        theme: Reveal.getQueryHash().theme,
        transition: Reveal.getQueryHash().transition || 'default'
    });

    var host='localhost';
    var port='9001';

    console.log('starting the socket reveal');
    window.WebSocket=window.WebSocket||window.MozWebSocket;
    var connection=new WebSocket('ws://'+host+':'+port);

    connection.onopen=function(){
        console.log('connect to the websocket');
    };

    connection.onmessage=function(message){
        var json=JSON.parse(message.data);
        console.log(json.action);
        switch(json.action){
            case 'next':
                Reveal.right();
                break;
            case 'prev':
                Reveal.left();
                break;
            case 'up':
                Reveal.up();
                break;
            case 'down':
                Reveal.down();
                break;
        }
    };
});

