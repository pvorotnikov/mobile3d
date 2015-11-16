'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Main entry point
define(['jquery'], function () {
    var Navigator = (function () {
        function Navigator() {
            _classCallCheck(this, Navigator);

            this.$cursor = $('.cursor');

            this.position = [0, 0];

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

                // TODO

                var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            }
        }]);

        return Navigator;
    })();

    return Navigator;
});