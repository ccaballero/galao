window.onload = function() {
    console.log("funciona");
    window.WebSocket = window.WebSocket || window.MozWebSocket;

   var connection = new WebSocket('ws://192.168.1.111:9091');

   connection.onopen = function () {
       console.log("conectado");
   }

   connection.onmessage = function(message) {
       try {
           var json = JSON.parse(message.data);
           
       } catch(e){
        console.log("ERRoR",message.data)
       }
   };

}
