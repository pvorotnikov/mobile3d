define(['js/cube', 'js/communicator'], (Cube, Communicator) => {
   
    class Framework {

        constructor() {
            
            this.cube = new Cube(this);

            this.communicator = new Communicator({
                'date': this._dateHandler.bind(this),
                'bla': msg => console.log(msg)
            });
        }

        send(topic, msg) {
            this.communicator.send(topic, msg);
        }

        _dateHandler(msg) {
            
        }
    }
    
    return Framework;
});