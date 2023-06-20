// const http = require('http');
// http.createServer(function(request, response) {
//     response.writeHead(200, {'Content-Type':'text/plain'})
//     response.end('The Final Project')

// }).listen(8000);


const express = require('express');
const app = express();
const port = 8080;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const lodash = require('lodash');

// console.log(io);

let players = [];
let round = 0;

app.use(express.static(__dirname+'/public'));

http.listen(port,function() {
    console.log('Ready');

});

io.on('connection',function(socket){
    let userID;
    socket.on('new player',function(id,name){
        userID = {
            name : name,
            id : id,
            round : round,
            roll : null,
            winner : false

        };
        players.push(userID);
        io.emit('players',players);
        // console.log(userID);
        // console.log(name);
    })
    socket.on('disconnect', function(reason) {
        console.log(reason);
        players = players.filter(function(obj) {
            return obj !== userID;
        })
        io.emit('players',players);
    })
    socket.on('roll', function() {
        userID.roll = lodash.random(1,1000);
        console.log(userID);
        nextRoundCheck();

    })
    io.emit('players',players);

})

function nextRoundCheck() {
    
}

// console.log(lodash);

