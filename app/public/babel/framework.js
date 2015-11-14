define(['js/cube', 'js/communicator'], (Cube, Communicator) => {
   
    class Framework {

        constructor() {
            
            this.cube = new Cube(this);

            this.communicator = new Communicator({
                'date': this._dateHandler.bind(this),
                'rotation': this._rotationHandler.bind(this)
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

        _dateHandler(msg) {
            
        }

        _rotationHandler(msg) {
            this.cube.rotate(msg[0], msg[1], msg[2]);
        }
    }
    
    return Framework;
});