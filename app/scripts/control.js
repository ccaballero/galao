'use strict';

var host='localhost';
var port='9001';

$(function(){
    window.WebSocket=window.WebSocket||window.MozWebSocket;

    var request=function(connection,task){
        console.log(task);
        connection.send(JSON.stringify({action:task}));
    };

    var connection;
    var connect=function(){
        connection=new WebSocket('ws://'+host+':'+port);
        connection.onopen=function(){
            console.log('starting the remote control over '+host+':'+port);
        };
        connection.onerror=function(error){
            console.log('fail the connection in '+host+':'+port);
        };
        connection.onmessage=function(message){};
    };

    $('.up').click(function(){request(connection,'up')});
    $('.down').click(function(){request(connection,'down')});
    $('.prev').click(function(){request(connection,'prev')});
    $('.next').click(function(){request(connection,'next')});

    var overlay = new Overlay(document.getElementsByClassName('overlay')[0], {
            class_name: 'overlay',
            background_class_name: 'overlay-background',
            content_class_name: 'overlay-content',
            is_shown_class: 'visible',
            template_function: function(){
                return [
                    '<div class="overlay-content">',
                        '<div class="overlay-header">',
                            '<a href="#" class="close"></a>',
                        '</div>',
                    '</div>'
                ].join('');
            }
        }
    );
    $('.settings').click(function(){
        overlay.append_content($('#connect').html());
        $('input[name="host"]').val(host);
        $('input[name="port"]').val(port);
        overlay.show();

        $('.connect').click(function(){
            host=$('input[name="host"]').val();
            port=$('input[name="port"]').val();
            connect();
            overlay.hide();
        });
    });
});

