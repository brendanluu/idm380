var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");



//Set root
var app = express();
app.use(express.static(__dirname + "/"));


//Set port. Will be set to 5000 on local and determined by remote host
var port = process.env.PORT || 5000;



var server = http.createServer(app);
server.listen(port);

console.log("http server listening on %d", port);

var wss = new WebSocketServer({server: server});
console.log("websocket server was created");






var connections = [];

wss.on('connection', function(ws){
  connections.push(ws);

  console.log('user connected');

  ws.on('message', function(m){

    var clientMsg = JSON.parse(m);
    var serverMsg = {};

    console.log(clientMsg);

    if(clientMsg.type == 'register'){


      var time = new Date().toJSON();

      serverMsg.type = clientMsg.type;
      serverMsg.msg = time + ":someone has logged on"

      connections.forEach(function(connection, index){
        connection.send(JSON.stringify(serverMsg));
        console.log("msg sent to client");
      });
    } else if (clientMsg.type == 'clicked') {

      serverMsg.type = clientMsg.type;
      serverMsg.id = clientMsg.id;

      connections.forEach(function(connection, index){
        connection.send(JSON.stringify(serverMsg));
        console.log("msg sent to client");
      });


    }
  });

  ws.on('close', function(){
    connections.splice(connections.indexOf(ws), 1);

    var time = new Date().toJSON();

    var serverMsg = {
      type: 'logoff',
      msg: time + ":someone has logged off"
    }


    connections.forEach(function(connection, index){
      connection.send(JSON.stringify(serverMsg));
      console.log("msg sent to client");
    });

    console.log('user disconnected');
  })
});

console.log("WebSocketServer is Up");
