/*
 * =============================
 * Communication
 * =============================
 */

define(['socket.io'], io =>{

    class Communicator {

        constructor() {
            this._handlers = [];
            this._socket = io.connect({
            
            });
        }
    }

    return Communicator

});