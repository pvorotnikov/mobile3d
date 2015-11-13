var _io = null;

var IO = function(io) {

    _io = io;

    var _connectionHandler = function(e) {
        console.log('Client Connected to socket');
    };

    // liten for events on the socket
    io.on('connection', _connectionHandler);
};

module.exports = IO;
