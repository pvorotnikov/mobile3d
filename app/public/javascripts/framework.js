'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['js/cube', 'js/compass', 'js/navigator', 'js/communicator', 'js/detector'], function (Cube, Compass, Navigator, Communicator, Detector) {
    var Framework = function () {
        function Framework() {
            _classCallCheck(this, Framework);

            this.cube = new Cube();
            this.compass = new Compass();
            this.navigator = new Navigator();

            this.communicator = new Communicator({
                'rotation': this._rotationHandler.bind(this),
                'movement': this._movementHandler.bind(this)
            });

            this.detector = new Detector({
                'orientation': this._orientationHandler.bind(this),
                'motion': this._motionHandler.bind(this)
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
                    this.compass.rotate(msg[1]);
                    this.navigator.move(msg[0], msg[1], msg[2]);
                }
            }
        }, {
            key: '_movementHandler',
            value: function _movementHandler(msg) {
                if (!this.detector.isMobile()) {

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
                    this.compass.rotate(alpha);
                    this.cube.rotate(-beta, alpha, gamma);
                    this.navigator.move(-beta, alpha, gamma);
                    this.send('rotation', [-beta, alpha, gamma]);
                }
            }
        }, {
            key: '_motionHandler',
            value: function _motionHandler(x, y) {
                if (this.detector.isMobile()) {
                    this.send('movement', [x, y]);
                }
            }
        }]);

        return Framework;
    }();

    return Framework;
});
