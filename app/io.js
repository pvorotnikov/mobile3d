var _io = null;

var IO = function(io) {

    _io = io;

    var _connectionHandler = function(e) {
        console.log('Client Connected to socket');

        io.on('rotation', msg => console.log(msg));

    };

    // liten for events on the socket
    io.on('connection', _connectionHandler);
    

    setInterval(() => {
        io.emit('date', new Date());
    }, 1000);
};

module.exports = IO;
