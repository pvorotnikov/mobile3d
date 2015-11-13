'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['js/cube', 'js/communicator'], function (Cube, Communicator) {
    var Framework = (function () {
        function Framework() {
            _classCallCheck(this, Framework);

            this.cube = new Cube(this);

            this.communicator = new Communicator({
                'date': this._dateHandler.bind(this),
                'bla': function bla(msg) {
                    return console.log(msg);
                }
            });
        }

        _createClass(Framework, [{
            key: 'send',
            value: function send(topic, msg) {
                this.communicator.send(topic, msg);
            }
        }, {
            key: '_dateHandler',
            value: function _dateHandler(msg) {}
        }]);

        return Framework;
    })();

    return Framework;
});