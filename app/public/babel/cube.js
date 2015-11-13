
// Main entry point
define(['jquery'], function() {

    class Cube {

        constructor(owner) {

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

            $(document).on('keydown', e => {
                switch(e.keyCode) {
                    case 37: this.rotate(0, -1); break;  // left
                    case 38: this.rotate(-1); break;     // up
                    case 39: this.rotate(0, 1); break;   // right
                    case 40: this.rotate(1); break;      // down
                }
            });

            this.$cube.on('mousedown touchstart', e => {
                this.inDrag = true;
                this.lastPos = [e.pageX, e.pageY];
                this.transitionEnabled(false);
            });

            this.$cube.on('mousemove ouchmove', e => {
                if (this.inDrag) {
                    var x = e.pageX;
                    var y = e.pageY;
                    var deltaX = x - this.lastPos[0];
                    var deltaY = y - this.lastPos[1];
                    this.lastPos = [x, y];
                    if (this.rotation[0] > 180) {
                        this.rotate(-deltaY, deltaX);
                    } else {
                        this.rotate(-deltaY, -deltaX);
                    }

                    this.owner.send('rotation', this.rotation);
                }
            });

            this.$cube.on('mouseup mouseleave touchend', () => {
                this.inDrag = false;
                this.transitionEnabled(true);
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
        transitionEnabled(state=false) {
            if (state) this.$cube.css({ transitionDuration: '1s' });
            else this.$cube.css({ transitionDuration: '0s' });
        }

        /**
         * Perform rotation
         * @param {Number} degX
         * @param {Number} degY
         * @param {Number} degZ
         */
        rotate(degX=0, degY=0, degZ=0) {
            
            this.rotation[0] += degX;
            this.rotation[1] += degY;
            this.rotation[2] += degZ;

            if (this.rotation[0] >= 360) this.rotation[0] -= (Math.floor(this.rotation[0] / 360) * 360);
            if (this.rotation[1] >= 360) this.rotation[1] -= (Math.floor(this.rotation[1] / 360) * 360);
            if (this.rotation[2] >= 360) this.rotation[2] -= (Math.floor(this.rotation[2] / 360) * 360);

            if (this.rotation[0] < 0) this.rotation[0] -= (Math.floor(this.rotation[0] / 360) * 360);
            if (this.rotation[1] < 0) this.rotation[1] -= (Math.floor(this.rotation[1] / 360) * 360);
            if (this.rotation[2] < 0) this.rotation[2] -= (Math.floor(this.rotation[2] / 360) * 360);

            this.$cube.css({
                transform: 'rotateX(' + this.rotation[0] + 'deg) ' +
                    'rotateY(' + this.rotation[1] + 'deg) ' + 
                    'rotateZ(' + this.rotation[2] + 'deg)'
            });

            this.$x.text(this.rotation[0]);
            this.$y.text(this.rotation[1]);
            this.$z.text(this.rotation[2]);
        }

    }

    return Cube;

});