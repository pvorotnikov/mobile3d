
// Main entry point
define(['jquery'], function() {

    class Navigator {

        constructor() {

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
        _moveBy(x=0, y=0) {

            // TODO
        }

        move(x, y) {
            console.log(x, y);
        }
    }

    return Navigator;

});