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

                /*$content.find('#drawArea').on('click', function(e) {
                    var $drawAreaOffset = $('#drawArea').offset();

                    artist.emit('draw', {
                        xPos: e.pageX - $drawAreaOffset.left,
                        yPos: e.pageY - $drawAreaOffset.top
                    });
                });*/
                $content.find('#drawArea').on('mousedown', function(e) {
                    var $drawAreaOffset = $('#drawArea').offset();

                    // send the initial position
                    artist.emit('draw', {
                        xPos: e.pageX - $drawAreaOffset.left,
                        yPos: e.pageY - $drawAreaOffset.top
                    });

                    $content.find('#drawArea').on('mousemove', function(e) {
                        artist.emit('draw', {
                            xPos: e.pageX - $drawAreaOffset.left,
                            yPos: e.pageY - $drawAreaOffset.top
                        });
                    });
                });

                $content.find('#drawArea').on('mouseup', function(e) {
                    $content.find('#drawArea').off('mousemove');
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
