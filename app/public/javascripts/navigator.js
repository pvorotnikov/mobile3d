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

                                    this.thresholdsX = [-30, 30];
                                    this.thresholdsY = [-30, 30];

                                    this.cursorW = this.$cursor.width();
                                    this.cursorH = this.$cursor.height();
                                    this.navigatorW = this.$navigator.width();
                                    this.navigatorH = this.$navigator.height();

                                    this.position = [this.navigatorW / 2 - this.cursorW / 2, this.navigatorH / 2 - this.cursorH / 2];

                                    this.initialRotationX = null;
                                    this.initialRotationY = null;

                                    /*
                                     * =============================
                                     * Initialization
                                     * =============================
                                     */

                                    // perform initial movement
                                    this._move(this.position[0], this.position[1]);
                        }

                        /**
                         * Perform absolute movement movement
                         * @param {Number} x
                         * @param {Number} y
                         */

                        _createClass(Navigator, [{
                                    key: '_move',
                                    value: function _move(x, y) {
                                                this.position = [Math.max(Math.min(x, this.navigatorW - this.cursorW), 0), Math.max(Math.min(y, this.navigatorH - this.cursorH), 0)];
                                                this.$cursor.css({
                                                            left: this.position[0] + 'px',
                                                            top: this.position[1] + 'px'
                                                });
                                    }
                        }, {
                                    key: 'move',
                                    value: function move(degX, degY, degZ) {

                                                // inverse the X rotation
                                                degX = -degX;

                                                // calibrate the rotation
                                                if (null === this.initialRotationX || null === this.initialRotationY) {
                                                            this.initialRotationX = degX;
                                                            this.initialRotationY = degY;
                                                }

                                                // get the delta
                                                var deltaX = this.initialRotationX - degX;
                                                var deltaY = this.initialRotationY - degY;

                                                // normalize
                                                var normX = (deltaX - this.thresholdsX[0]) / (this.thresholdsX[1] - this.thresholdsX[0]);
                                                normX = Math.max(Math.min(normX, 1), 0);
                                                var normY = (deltaY - this.thresholdsY[0]) / (this.thresholdsY[1] - this.thresholdsY[0]);
                                                normY = Math.max(Math.min(normY, 1), 0);

                                                // convert
                                                var absoluteY = normX * this.navigatorH;
                                                var absoluteX = normY * this.navigatorW;

                                                this._move(absoluteX, absoluteY);
                                    }
                        }]);

                        return Navigator;
            }();

            return Navigator;
});