/*jslint eqeqeq: true, undef: true */
/*global $, window, console, alert */

var RemoteDraw = RemoteDraw || {};

RemoteDraw = (function() {
    var
        // PRIVATE VARIABLES
        // sockets
        domain = window.location.hostname,
        socket,
        viewer,
        artist,

        // canvas
        canvas = document.getElementById('drawArea'),
        context = canvas.getContext('2d'),

        // PRIVATE FUNCTIONS
        artistCanvas = function(x, y) {
            context.beginPath();
            context.arc(x, y, 10, 0, 2 * Math.PI, false);
            context.fillStyle = 'red';
            context.fill();
        };

    // PUBLIC METHODS
    return {
        init: function() {
            // DOM ready
            var $content = $('#pageWrapper');

            // set up the canvas
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // init sockets
            if ($content.hasClass('viewer')) {
                // set up socket.io viewer connection
                viewer = io.connect('http://' + domain + '/view');

                viewer.on('connect', function() {
                    console.log("viewer connected");
                });

                viewer.on('draw', function(data) {
                    artistCanvas(data.pos.xPos, data.pos.yPos);
                });
            } else if ($content.hasClass('artist')) {
                // set up socket.io artist connection
                artist = io.connect('http://' + domain + '/draw');

                artist.on('connect', function() {
                    console.log("artist connected");
                });

                $content.find('#drawArea').on('mousedown touchstart', function(e) {
                    var $drawAreaOffset = $('#drawArea').offset();

                    // send the initial position
                    artist.emit('draw', {
                        xPos: e.originalEvent.pageX - $drawAreaOffset.left,
                        yPos: e.originalEvent.pageY - $drawAreaOffset.top
                    });

                    // draw on the canvas
                    artistCanvas(e.originalEvent.pageX - $drawAreaOffset.left, e.originalEvent.pageY - $drawAreaOffset.top);

                    $content.find('#drawArea').on('mousemove touchmove', function(e) {
                        e.preventDefault();

                        artist.emit('draw', {
                            xPos: e.originalEvent.pageX - $drawAreaOffset.left,
                            yPos: e.originalEvent.pageY - $drawAreaOffset.top
                        });

                        // draw on the canvas
                        artistCanvas(e.originalEvent.pageX - $drawAreaOffset.left, e.originalEvent.pageY - $drawAreaOffset.top);
                    });
                });

                $content.find('#drawArea').on('mouseup touchend', function(e) {
                    $content.find('#drawArea').off('mousemove touchmove');
                });
            }
        }
    };
}());

// ON DOM READY
$(function() {
    RemoteDraw.init();
});
