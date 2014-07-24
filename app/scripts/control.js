'use strict';

var host='localhost';
var port='9001';

$(function(){
    window.WebSocket=window.WebSocket||window.MozWebSocket;

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

    var request=function(connection,task){
        console.log(task);
        connection.send(JSON.stringify({action:task}));
    };

    var connection;
    var connect=function(){
        connection=new WebSocket('ws://'+host+':'+port);
        connection.onopen=function(){
            console.log('starting the remote control over '+host+':'+port);
            overlay.hide();
            $('.offline').hide();
            $('.online').show();
        };
        connection.onerror=function(error){
            console.log('fail the connection to '+host+':'+port);
            $('.overlay p.message').html(
                'Fail the connection to: '+host+':'+port);
            $('.online').hide();
            $('.offline').show();
        };
        connection.onmessage=function(message){};
    };

    $('.online').hide();
    $('.up').click(function(){request(connection,'up')});
    $('.down').click(function(){request(connection,'down')});
    $('.prev').click(function(){request(connection,'prev')});
    $('.next').click(function(){request(connection,'next')});

    $('.settings').click(function(){
        overlay.append_content($('#connect').html());
        $('input[name="host"]').val(host);
        $('input[name="port"]').val(port);
        overlay.show();

        $('.connect').click(function(){
            host=$('input[name="host"]').val();
            port=$('input[name="port"]').val();
            connect();
        });
    });
});

