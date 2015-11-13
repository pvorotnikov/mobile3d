/*
 * =============================
 * Communication
 * =============================
 */

define(['socket.io'], io =>{

    class Communicator {

        constructor(handlersMap) {

            this._handlers = [];
            this._socket = io();

            for (var i in handlersMap) {
                this._socket.on(i, handlersMap[i]);
            }
        }

        send(topic, msg) {
            console.log('Sending %s', topic, msg);
            this._socket.emit(topic, msg);
        }
    }

    return Communicator

});