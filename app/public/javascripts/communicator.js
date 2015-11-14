'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * =============================
 * Communicator
 * This class facilitates any communication
 * with underlying services.
 * =============================
 */

define(['socket.io'], function (io) {
    var Communicator = (function () {
        function Communicator(handlersMap) {
            _classCallCheck(this, Communicator);

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

        _createClass(Communicator, [{
            key: 'send',
            value: function send(topic, msg) {
                this._socket.emit(topic, msg);
            }
        }]);

        return Communicator;
    })();

    return Communicator;
});