window.onload = function(){
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    var connection = new WebSocket('ws://localhost:9091');

    connection.onopen=function(){};
    connection.onerror=function(error){};
    connection.onmessage=function(message){};

    document.getElementById('prev').onclick=function(){
        console.log('prev');
        connection.send(JSON.stringify({action:'prev'}));
    }
    document.getElementById('next').onclick=function(){
        console.log('next');
        connection.send(JSON.stringify({action:'next'}));
    }
    document.getElementById('up').onclick=function(){
        console.log('up');
        connection.send(JSON.stringify({action:'up'}));
    }
    document.getElementById('down').onclick=function(){
        console.log('down');
        connection.send(JSON.stringify({action:'down'}));
    }
};

