'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Main entry point
define(['jquery'], function () {
    var Navigator = function () {
        function Navigator() {
            _classCallCheck(this, Navigator);

            this.$cursor = $('.cursor');
            this.$navigator = $('#navigator');

            this.thresholdsY = [-45, 45];
            this.thresholdsX = [-45, 45];

            this.position = [0, 0];
            this.navigatorW = this.$navigator.width();
            this.navigatorH = this.$navigator.height();

            /*
             * =============================
             * Initialization
             * =============================
             */
        }

        /**
         * Perform relative movement
         * @param {Number} x
         * @param {Number} y
         */

        _createClass(Navigator, [{
            key: '_moveBy',
            value: function _moveBy() {
                var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

                this.position = [Math.max(Math.min(this.position[0] + x, this.navigatorW), 0), Math.max(Math.min(this.position[1] + y, this.navigatorH), 0)];

                this.$cursor.css({
                    left: this.position[0] + 'px',
                    top: this.position[1] + 'px'
                });
            }
        }, {
            key: 'move',
            value: function move(x, y) {
                // console.log(x, y);
                var relativeX = Math.floor(x);
                var relativeY = Math.floor(y);
                // this._moveBy(relativeX, relativeY);
            }
        }, {
            key: 'rotate',
            value: function rotate(degX, degY, degZ) {
                var relativeY = Math.round(degX);
                console.log(degX);
                // this._moveBy(0, relativeY);
                // console.log(degX, degY, degZ);
            }
        }]);

        return Navigator;
    }();

    return Navigator;
});