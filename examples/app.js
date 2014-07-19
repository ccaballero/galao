var api=impress();
api.init();

function next(){
    api.next();
}

function prev(){
    api.prev();
}

function up(){
    //TODO up
}

function down(){
    //TODO down
}

window.onload = function() {
    console.log("funciona");
    window.WebSocket = window.WebSocket || window.MozWebSocket;

   var connection = new WebSocket('ws://control.local:9091');

   connection.onopen = function () {
       console.log("conectado");
   }

   connection.onmessage = function(message) {
       console.log(message.data.a);
       var json = JSON.parse(message.data);
       console.log(json.action);
       switch(json.action) {
           case "next":
                console.log("DATA : next");
                next();
                break;  
           case "prev":
                prev();
                console.log("DATA : prev");
                break;
            case "up":
                up();
                console.log("DATA : up");
                break;
            case "down":
                down();
                console.log("DATA : down");
                break;
       }
   };

}
