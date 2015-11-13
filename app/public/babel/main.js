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
require(['js/framework'], (Framework) => {

    const framework = new Framework();

});