
// Main entry point
define(['jquery'], function() {

    class Compass {

        constructor() {

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
            setTimeout(() => this._transitionEnabled(false), 0); // allow DOM refresh
        }

        /**
         * Enable or disable smooth transition
         * @param {Boolean} state
         */
        _transitionEnabled(state=false) {

            if (state) this.$needle.css({ transitionDuration: '1s' });
            else this.$needle.css({ transitionDuration: '0s' });
        }

        /**
         * Perform relative rotation
         * @param {Number} deg
         */
        _rotateBy(deg=0) {
            
            this.direction += deg + this.offset;

            if (this.direction >= 360) this.direction -= (Math.floor(this.direction / 360) * 360);
            if (this.direction < 0) this.direction -= (Math.floor(this.direction / 360) * 360);

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
        rotate(deg=this.direction) {

            var delta = deg - this.direction;
            this._rotateBy(delta);
        }
    }

    return Compass;

});