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
var users = [];

wss.on('connection', function(ws){
  connections.push(ws);

  console.log('user connected');

  ws.on('message', function(m){

		var msg = JSON.parse(m);
		console.log(msg);

		if(msg.type == 'register'){
			users.push(msg.user);
			console.log(users);
		} else if (msg.type == 'loadAll'){
			msg.users = users;
		}

		if(msg.sendToAll){
			//Send to all connections
			users.forEach(function(user, index){
					if(user.id == msg.id && user != msg.user) {
						user[index] = msg.user;
					}
	      });
			connections.forEach(function(connection, index){
	        connection.send(JSON.stringify(msg));
	        console.log("msg sent to client");
	      });
		}else{
			//Send back to sender
			ws.send(JSON.stringify(msg));
		}

    // var clientMsg = JSON.parse(m);
    // var msg = {};
		//
    // console.log(clientMsg);
		//
    // if(clientMsg.type == 'register'){
		//
		//
    //   var time = new Date().toJSON();
		//
    //   serverMsg.type = clientMsg.type;
    //   serverMsg.msg = time + ":someone has logged on"
		//
    //   connections.forEach(function(connection, index){
    //     connection.send(JSON.stringify(serverMsg));
    //     console.log("msg sent to client");
    //   });
    // } else if (clientMsg.type == 'clicked') {
		//
    //   serverMsg.type = clientMsg.type;
    //   serverMsg.id = clientMsg.id;
		//
    //   connections.forEach(function(connection, index){
    //     connection.send(JSON.stringify(serverMsg));
    //     console.log("msg sent to client");
    //   });
		//
		//
    // }
  });

  ws.on('close', function(){

    // var time = new Date().toJSON();

    var msg = {
      type: 'logoff',
      user: users[connections.indexOf(ws)]
    }
//Search the connections array for the current socket is closing. Use THAT index to find the user in the users array. This index should be the same bc they are both added in the same order.
		users.splice(connections.indexOf(ws), 1);
		connections.splice(connections.indexOf(ws), 1);

    connections.forEach(function(connection, index){
      connection.send(JSON.stringify(msg));
      console.log("msg sent to client");
    });

    console.log('user disconnected');
  })
});

console.log("WebSocketServer is Up");
