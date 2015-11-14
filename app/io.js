var _io = null;

var IO = function(io) {

    _io = io;

    // on connect
    var _connectionHandler = function(socket) {
        console.log('Client Connected to socket');
        socket.on('rotation', msg => _io.emit('rotation', msg));
    };

    // liten for events on the socket
    _io.on('connection', _connectionHandler);
    

    setInterval(() => {
        _io.emit('date', new Date());
    }, 1000);
};

module.exports = IO;
