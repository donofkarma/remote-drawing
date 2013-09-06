/*jslint eqeqeq: true, undef: true */
/*global $, window, console, alert */

var Template = Template || {};

Template = (function() {
    var
        // PRIVATE VARIABLES
        socket,
        viewer,
        artist

        // PRIVATE FUNCTIONS
        ;

    // PUBLIC METHODS
    return {
        init: function() {
            // DOM ready
            var $content = $('#content');
            
            if ($content.hasClass('viewer')) {
                // set up socket.io viewer connection
                viewer = io.connect('http://localhost/view');

                viewer.on('connect', function() {
                    console.log("viewer connected");
                });
            } else if ($content.hasClass('artist')) {
                // set up socket.io artist connection
                artist = io.connect('http://localhost/draw');

                artist.on('connect', function() {
                    console.log("artist connected");
                });
            }
        },
        pageInit: function() {
            // page load
        }
    };
}());

// ON DOM READY
$(function() {
    Template.init();
});

// ON PAGE LOAD
$(window).load(function() {
    Template.pageInit();
});