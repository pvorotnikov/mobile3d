'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Main entry point
define(['jquery'], function () {
    var Compass = (function () {
        function Compass(owner) {
            var _this = this;

            _classCallCheck(this, Compass);

            // keep owner's instance
            this.owner = owner;

            this.$needle = $('.needle');

            this.direction = 0;
            this.offset = 75;

            /*
             * =============================
             * Initialization
             * =============================
             */

            // perform initial rotation
            this._transitionEnabled(true);
            this._rotateBy();
            setTimeout(function () {
                return _this._transitionEnabled(false);
            }, 0); // allow DOM refresh
        }

        /**
         * Enable or disable smooth transition
         * @param {Boolean} state
         */

        _createClass(Compass, [{
            key: '_transitionEnabled',
            value: function _transitionEnabled() {
                var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

                if (state) this.$needle.css({ transitionDuration: '1s' });else this.$needle.css({ transitionDuration: '0s' });
            }

            /**
             * Perform relative rotation
             * @param {Number} deg
             */

        }, {
            key: '_rotateBy',
            value: function _rotateBy() {
                var deg = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

                this.direction += deg + this.offset;

                if (this.direction >= 360) this.direction -= Math.floor(this.direction / 360) * 360;
                if (this.direction < 0) this.direction -= Math.floor(this.direction / 360) * 360;

                this.$needle.css({
                    transform: 'rotate(' + this.direction + 'deg)'
                });
            }

            /**
             * Perform arbitrary rotation to given position.
             * Calculate deltas between the requested positions and
             * the current ones and perform relative rotation
             * @param {Number} degX
             * @param {Number} degY
             * @param {Number} degZ
             */

        }, {
            key: 'rotate',
            value: function rotate() {
                var deg = arguments.length <= 0 || arguments[0] === undefined ? this.direction : arguments[0];

                var delta = deg - this.direction;
                this._rotateBy(delta);
            }
        }]);

        return Compass;
    })();

    return Compass;
});