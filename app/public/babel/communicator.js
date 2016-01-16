/*
 * =============================
 * Communicator
 * This class facilitates any communication
 * with underlying services.
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

        /**
         * Send a message to the server on a given topic.
         * @param {String} topic
         * @param {Object} msg
         */
        send(topic, msg) {
            this._socket.emit(topic, msg);
        }
    }

    return Communicator

});