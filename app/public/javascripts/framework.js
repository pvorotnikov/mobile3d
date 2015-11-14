'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['js/cube', 'js/communicator', 'js/detector'], function (Cube, Communicator, Detector) {
    var Framework = (function () {
        function Framework() {
            _classCallCheck(this, Framework);

            this.cube = new Cube(this);

            this.communicator = new Communicator({
                'rotation': this._rotationHandler.bind(this)
            });

            this.detector = new Detector({
                'orientation': this._orientationHandler.bind(this)
            });
        }

        /**
         * Send a message to the server on a given topic.
         * @param {String} topic
         * @param {Object} msg
         */

        _createClass(Framework, [{
            key: 'send',
            value: function send(topic, msg) {
                this.communicator.send(topic, msg);
            }

            /**
             * Handle rotation over IO.
             * 3D rotate widgets depending on the passed values.
             * 3D rotate only if client is not a mobile device.
             * @param {Object} msg
             */

        }, {
            key: '_rotationHandler',
            value: function _rotationHandler(msg) {
                if (!this.detector.isMobile()) {
                    this.cube.rotate(msg[0], msg[1], msg[2]);
                }
            }

            /**
             * Handle device orientation events.
             * 3D rotate only if client is a mobile device.
             * Send the rotation values to the server
             * @param {Number} alpha
             * @param {Number} beta
             * @param {Number} gamma
             */

        }, {
            key: '_orientationHandler',
            value: function _orientationHandler(alpha, beta, gamma) {
                if (this.detector.isMobile()) {
                    this.cube.rotate(-beta, gamma, -alpha);
                    this.send('rotation', [-beta, gamma, -alpha]);
                }
            }
        }]);

        return Framework;
    })();

    return Framework;
});