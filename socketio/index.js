var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require("mysql");


var con = false;

var mysql = require("mysql");


con = mysql.createConnection({
    host: "163.172.150.53",
    user: "ttrw",
    password: "ttRocks123",
    database :"thinktwice"
  });



global.con = function(){return con;};


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/msg/:id', function(req, res){
  var query = "select txt, personneid from msg where ttmatchid = ?";
  var con = global.con();
  con.query(query, req.params.id, function(err, rows) {
    if (err) {
      res.status(404).json([]);
    } else {
      res.status(200).json(rows);
    }
  })
});

io.on('connection', function(socket){

  socket.on('create', function(room) {
    console.log("room : " + room);
    socket.join(room);
  });

  socket.on('chat message', function(msg){

    console.log(msg);

    var insert = "insert into msg(txt, ttmatchid, personneid) values (?,?,?)";
    var con = global.con();

    con.query(insert, [msg.val, msg.room, msg.user], function(err, rows) {
      if (err) {
        console.log(err);
      }
    });

    io.to(msg.room).emit('chat message', {val : msg.val, user : msg.user});
  });

});

http.listen(9000, function(){
  console.log('listening on *:9000');
});
