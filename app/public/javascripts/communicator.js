'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * =============================
 * Communication
 * =============================
 */

define(['socket.io'], function (io) {
    var Communicator = function Communicator() {
        _classCallCheck(this, Communicator);

        this._handlers = [];
        this._socket = io.connect({});
    };

    return Communicator;
});