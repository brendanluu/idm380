var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;


var users = [];


setInterval(function(){
  context.fillStyle = "#000000";
  // create a black rect covering canvas
  context.fillRect(0,0, canvas.width, canvas.height);

  for(var i in users){
    draw(users[i]);
  }


}, 24);

function draw(user){
  context.fillStyle = user.color;
  context.fillRect(user.x, user.y, user.size, user.size);
}
