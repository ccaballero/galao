window.onload = function() {
    window.WebSocket = window.WebSocket || window.MozWebSocket;

   var connection = new WebSocket('ws://localhost:9091');

   connection.onopen = function () {
       console.log("conectado");
   }

   connection.onmessage = function(message) {
       console.log('asdf');
       try {
           var json = JSON.parse(message.data);
           
       } catch(e){
        console.log("ERRoR",message.data)
       }
   };

}
