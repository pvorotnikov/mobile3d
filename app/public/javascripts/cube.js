'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Main entry point
define(['jquery'], function () {
    var Cube = (function () {
        function Cube(owner) {
            var _this = this;

            _classCallCheck(this, Cube);

            // keep owner's instance
            this.owner = owner;

            this.$cube = $('#cube');
            this.$x = $('.x');
            this.$y = $('.y');
            this.$z = $('.z');

            this.rotation = [330, 30, 0];
            this.inDrag = false;
            this.lastPos = [0, 0];

            /*
             * =============================
             * ROTATION
             * =============================
             */

            $(document).on('keydown', function (e) {
                switch (e.keyCode) {
                    case 37:
                        _this._rotateBy(0, -1);break; // left
                    case 38:
                        _this._rotateBy(-1);break; // up
                    case 39:
                        _this._rotateBy(0, 1);break; // right
                    case 40:
                        _this._rotateBy(1);break; // down
                }
            });

            this.$cube.on('mousedown touchstart', function (e) {
                _this.inDrag = true;
                _this.lastPos = [e.pageX, e.pageY];
            });

            this.$cube.on('mousemove ouchmove', function (e) {
                if (_this.inDrag) {
                    var x = e.pageX;
                    var y = e.pageY;
                    var deltaX = x - _this.lastPos[0];
                    var deltaY = y - _this.lastPos[1];
                    _this.lastPos = [x, y];
                    if (_this.rotation[0] > 180) {
                        _this._rotateBy(-deltaY, deltaX);
                    } else {
                        _this._rotateBy(-deltaY, -deltaX);
                    }

                    _this.owner.send('rotation', _this.rotation);
                }
            });

            this.$cube.on('mouseup mouseleave touchend', function () {
                _this.inDrag = false;
            });

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

        _createClass(Cube, [{
            key: '_transitionEnabled',
            value: function _transitionEnabled() {
                var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

                if (state) this.$cube.css({ transitionDuration: '1s' });else this.$cube.css({ transitionDuration: '0s' });
            }

            /**
             * Perform relative rotation
             * @param {Number} degX
             * @param {Number} degY
             * @param {Number} degZ
             * @param {Number} time
             */

        }, {
            key: '_rotateBy',
            value: function _rotateBy() {
                var degX = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                var degY = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                var degZ = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

                this.rotation[0] += degX;
                this.rotation[1] += degY;
                this.rotation[2] += degZ;

                if (this.rotation[0] >= 360) this.rotation[0] -= Math.floor(this.rotation[0] / 360) * 360;
                if (this.rotation[1] >= 360) this.rotation[1] -= Math.floor(this.rotation[1] / 360) * 360;
                if (this.rotation[2] >= 360) this.rotation[2] -= Math.floor(this.rotation[2] / 360) * 360;

                if (this.rotation[0] < 0) this.rotation[0] -= Math.floor(this.rotation[0] / 360) * 360;
                if (this.rotation[1] < 0) this.rotation[1] -= Math.floor(this.rotation[1] / 360) * 360;
                if (this.rotation[2] < 0) this.rotation[2] -= Math.floor(this.rotation[2] / 360) * 360;

                this.$cube.css({
                    transform: 'rotateX(' + this.rotation[0] + 'deg) ' + 'rotateY(' + this.rotation[1] + 'deg) ' + 'rotateZ(' + this.rotation[2] + 'deg)'
                });

                this.$x.text(this.rotation[0]);
                this.$y.text(this.rotation[1]);
                this.$z.text(this.rotation[2]);
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
                var degX = arguments.length <= 0 || arguments[0] === undefined ? this.rotation[0] : arguments[0];
                var degY = arguments.length <= 1 || arguments[1] === undefined ? this.rotation[1] : arguments[1];
                var degZ = arguments.length <= 2 || arguments[2] === undefined ? this.rotation[2] : arguments[2];

                var deltaX = degX - this.rotation[0];
                var deltaY = degY - this.rotation[1];
                var deltaZ = degZ - this.rotation[2];
                this._rotateBy(deltaX, deltaY, deltaZ);
            }
        }]);

        return Cube;
    })();

    return Cube;
});