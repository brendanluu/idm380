function User() {
  //Random # if under 10,000
  //https://gist.github.com/gordonbrander/2230317
  this.id = Math.random().toString(36).substr(2, 9);
  this.color = "#"+Math.floor(Math.random()*16777215).toString(16);

}


User.prototype.register = function(data){
  var time = new Date().toJSON();
  // $('body').append('<p>ID# ' + data.user.id + ' logged on at '+ time +'</p>');
  $('body').append('<div class="avatar" id="id-' + data.user.id +'" style="background:' + data.user.color +';"">' + data.user.id +'</div>');

}

User.prototype.logoff = function(data){
//   var time = new Date().toJSON();
var selector = '#id-' + data.user.id;
$(selector).remove();
}

User.prototype.loadAll = function(data){
  console.log(data);

  var users = data.users;

  users.forEach(function(user, index){
    $('body').append('<div class="avatar" id="id-' + user.id +'" style="background:' + user.color +';"">' + user.id +'</div>');
    });
}

User.prototype.generateColor = function(data){
  return "#"+Math.floor(Math.random()*16777215).toString(16);

}

User.prototype.updateColor = function(data){
  var selector = '#id-' + data.user.id;
  $(selector).css('background', data.user.color);
}
