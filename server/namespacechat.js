var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(9231);

function handler (req, res) {
  fs.readFile(__dirname + '/../public/indexchat.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {

  socket.emit('message',  'Please enter a user name : ');

  var userName;

  socket.on('message', function (data) {
    /* set userName for first message */
    if(!userName)
    {
      /* some sanity checking */
      if(/(\w|\d)+/i.test(data))
      {
        userName = data;
        console.log("set userName to "+userName)
        socket.broadcast.emit('message', userName + " has entered the chatroom");
      }
        return;
    }

    console.log("received message to broadcast : "+userName+": "+data);
    socket.broadcast.emit('message', userName + ': '+data);
  });

  socket.on('disconnect', function () {
    socket.broadcast.emit('message', userName + " has left the chatroom");
  })


});


