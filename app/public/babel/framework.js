define(['js/cube', 'js/compass', 'js/communicator', 'js/detector'], (Cube, Compass, Communicator, Detector) => {
   
    class Framework {

        constructor() {
            
            this.cube = new Cube(this);
            this.compass = new Compass();

            this.communicator = new Communicator({
                'rotation': this._rotationHandler.bind(this)
            });

            this.detector = new Detector({
                'orientation': this._orientationHandler.bind(this)
            });
        }

        /**
         * Send a message to the server on a given topic.
         * @param {String} topic
         * @param {Object} msg
         */
        send(topic, msg) {
            this.communicator.send(topic, msg);
        }

        /**
         * Handle rotation over IO.
         * 3D rotate widgets depending on the passed values.
         * 3D rotate only if client is not a mobile device.
         * @param {Object} msg
         */
        _rotationHandler(msg) {
            if (!this.detector.isMobile()) {
                this.cube.rotate(msg[0], msg[1], msg[2]);
                this.compass.rotate(msg[1]);
            }
        }

        /**
         * Handle device orientation events.
         * 3D rotate only if client is a mobile device.
         * Send the rotation values to the server
         * @param {Number} alpha
         * @param {Number} beta
         * @param {Number} gamma
         */
        _orientationHandler(alpha, beta, gamma) {
            if (this.detector.isMobile()) {
                this.compass.rotate(alpha);
                this.cube.rotate(-beta, alpha, gamma);
                this.send('rotation', [-beta, alpha, gamma]);
            }
        }
    }
    
    return Framework;
});