
// Main entry point
define(['jquery'], function() {

    class Navigator {

        constructor() {

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
        _moveBy(x=0, y=0) {

            this.position = [
                Math.max(Math.min(this.position[0] + x, this.navigatorW), 0),
                Math.max(Math.min(this.position[1] + y, this.navigatorH), 0)
            ];

            this.$cursor.css({
                left: this.position[0] + 'px',
                top: this.position[1] + 'px',
            });

        }

        move(x, y) {
            // console.log(x, y);
            let relativeX = Math.floor(x);
            let relativeY = Math.floor(y);
            // this._moveBy(relativeX, relativeY);
        }

        rotate(degX, degY, degZ) {
            let relativeY = Math.round(degX);
            console.log(degX);
            // this._moveBy(0, relativeY);
            // console.log(degX, degY, degZ);
        }
    }

    return Navigator;

});
