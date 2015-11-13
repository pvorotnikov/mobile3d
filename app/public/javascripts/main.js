'use strict';

// Configuration
requirejs.config({
    baseUrl: 'components',
    paths: {
        'js': '../javascripts',
        'socket.io': '/socket.io/socket.io',
        'jquery': '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min'
    }
});

// Main entry point
require(['js/cube', 'js/communicator'], function (Cube, Communicator) {

    var cube = new Cube();
    var communicator = new Communicator();
});