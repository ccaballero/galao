'use strict';

$(function(){
    var host='localhost';
    var port='9001';
    var connection;

    window.WebSocket=window.WebSocket||window.MozWebSocket;

    var f=function(connection,task){
        console.log(task);
        connection.send(JSON.stringify({action:task}));
    };

    var connect=function(host,port){
        connection=new WebSocket('ws://'+host+':'+port);
        connection.onopen=function(){
            console.log('starting the remote control over '+host+':'+port);
        };
        connection.onerror=function(error){};
        connection.onmessage=function(message){};
    };

    $('.up').click(function(){f(connection,'up')});
    $('.down').click(function(){f(connection,'down')});
    $('.prev').click(function(){f(connection,'prev')});
    $('.next').click(function(){f(connection,'next')});

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
        overlay.show();

        $('.connect').click(function(){
            connect(
                $('input[name="host"]').val(),
                $('input[name="port"]').val()
            );
            overlay.hide();
        });
    });
});

