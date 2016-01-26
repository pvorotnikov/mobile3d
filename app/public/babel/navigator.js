
// Main entry point
define(['jquery'], function() {

    class Navigator {

        constructor() {

            this.$cursor = $('.cursor');
            this.$navigator = $('#navigator');

            this.thresholdsX = [-30, 30];
            this.thresholdsY = [-30, 30];

            this.cursorW = this.$cursor.width();
            this.cursorH = this.$cursor.height();
            this.navigatorW = this.$navigator.width();
            this.navigatorH = this.$navigator.height();

            this.position = [(this.navigatorW / 2) - (this.cursorW / 2), (this.navigatorH / 2) - (this.cursorH / 2)];

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
        _move(x, y) {
            this.position = [
                Math.max(Math.min(x, this.navigatorW - this.cursorW), 0),
                Math.max(Math.min(y, this.navigatorH - this.cursorH), 0)
            ];
            this.$cursor.css({
                left: this.position[0] + 'px',
                top: this.position[1] + 'px',
            });
        }

        move(degX, degY, degZ) {

            // inverse the X rotation
            degX = -degX;

            // calibrate the rotation
            if (null === this.initialRotationX || null === this.initialRotationY) {
                this.initialRotationX = degX;
                this.initialRotationY = degY;
            }

            // get the delta
            let deltaX = this.initialRotationX - degX;
            let deltaY = this.initialRotationY - degY;

            // normalize
            let normX = (deltaX - this.thresholdsX[0]) / (this.thresholdsX[1] - this.thresholdsX[0]);
            normX = Math.max(Math.min(normX, 1), 0);
            let normY = (deltaY - this.thresholdsY[0]) / (this.thresholdsY[1] - this.thresholdsY[0]);
            normY = Math.max(Math.min(normY, 1), 0);

            // convert
            let absoluteY = normX * this.navigatorH;
            let absoluteX = normY * this.navigatorW;

            this._move(absoluteX, absoluteY);
        }
    }

    return Navigator;

});
