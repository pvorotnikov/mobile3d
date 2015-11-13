'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Main entry point
define(['jquery'], function () {
    var Cube = (function () {
        function Cube() {
            var _this = this;

            _classCallCheck(this, Cube);

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
                        _this.rotate(0, -1);break; // left
                    case 38:
                        _this.rotate(-1);break; // up
                    case 39:
                        _this.rotate(0, 1);break; // right
                    case 40:
                        _this.rotate(1);break; // down
                }
            });

            this.$cube.on('mousedown touchstart', function (e) {
                _this.inDrag = true;
                _this.lastPos = [e.pageX, e.pageY];
                _this.transitionEnabled(false);
            });

            this.$cube.on('mousemove ouchmove', function (e) {
                if (_this.inDrag) {
                    var x = e.pageX;
                    var y = e.pageY;
                    var deltaX = x - _this.lastPos[0];
                    var deltaY = y - _this.lastPos[1];
                    _this.lastPos = [x, y];
                    if (_this.rotation[0] > 180) {
                        _this.rotate(-deltaY, deltaX);
                    } else {
                        _this.rotate(-deltaY, -deltaX);
                    }
                }
            });

            this.$cube.on('mouseup mouseleave touchend', function () {
                _this.inDrag = false;
                _this.transitionEnabled(true);
            });

            /*
             * =============================
             * Initialization
             * =============================
             */

            this.rotate();
        }

        /**
         * Enable or disable smooth transition
         * @param {Boolean} state
         */

        _createClass(Cube, [{
            key: 'transitionEnabled',
            value: function transitionEnabled() {
                var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

                if (state) this.$cube.css({ transitionDuration: '1s' });else this.$cube.css({ transitionDuration: '0s' });
            }

            /**
             * Perform rotation
             * @param {Number} degX
             * @param {Number} degY
             * @param {Number} degZ
             */

        }, {
            key: 'rotate',
            value: function rotate() {
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
        }]);

        return Cube;
    })();

    return Cube;
});