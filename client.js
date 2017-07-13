window.onload = function() {
  var host = location.origin.replace(/^http/, 'ws');
  var ws = new WebSocket(host);

  // var id ;
  var user = new User();
  $('.id').html(user.id);


  ws.onopen = function() {

    console.log(user);

    var msg = {
      'type': 'loadAll',
      'sendToAll': false,
      'user': user
    }

    ws.send(JSON.stringify(msg));

    var msg = {
      'type': 'register',
      'sendToAll': true,
      'user': user
    }

    ws.send(JSON.stringify(msg));
    // id = Math.round(Math.random() * 10000);
    //
    //
    //
    // var register = {type: 'register'};
    //

    }

    ws.onmessage = function(e){
      var data = JSON.parse(e.data);
      console.log(data);

      user[data.type](data);

      // if(data.type == 'register'){
      //   user.register(data);
      // }
      //
      // object.method();
      // object['method'];

      // var data = JSON.parse(e.data);
      //
      // if(data.type == "clicked") {
      //   $('body').append('<p> ID #' + data.id + ' clicked! </p>');
      // } else {
      //   $('body').append('<p>' + data.msg +'</p>');}

    }

    $(document).mouseup(function(){
      console.log('clicked');

      user.color = user.generateColor();

      var msg = {
        type:'updateColor',
        sendToAll: 'true',
        user: user
      };

      ws.send(JSON.stringify(msg));

    //   var msg = {
    //     type: 'clicked',
    //     id: id
    //   };
    //   ws.send(JSON.stringify(msg));
    //
});

}
