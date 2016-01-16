'use strict';

$(document).ready(function () {

    // common properties
    var _duration = 2000;
    var _circleRadius = 30;
    var _width = 600;
    var _height = 100;

    /* 
     * ============================
     * SVG
     * ============================
     */

    (function () {

        var animation = document.getElementById('svgAnimation');
        var circle = document.getElementById('svgCircle');

        circle.addEventListener('click', function () {
            animation.beginElement();
        }, false);
    })();

    /* 
     * ============================
     * RAPHAEL
     * ============================
     */

    (function () {

        // get dom element
        var raphael = document.getElementById('raphael');

        // create circle
        var paper = Raphael(raphael, _width, _height);
        var circle = paper.circle(_circleRadius, _height / 2, _circleRadius);
        circle.attr("fill", "#f00");
        circle.attr("stroke", "#fff");

        // animate circle on click
        circle.click(function () {
            var animation = Raphael.animation({ cx: _width + _circleRadius }, _duration);
            circle.animate(animation);
        });
    })();

    /* 
     * ============================
     * CANVAS
     * ============================
     */

    (function () {

        var pureCanvas = document.getElementById('pureCanvas');
        var ctx = pureCanvas.getContext("2d");
        var currentX = _circleRadius;

        function clear() {
            ctx.clearRect(0, 0, pureCanvas.width, pureCanvas.height);
        }

        function drawCircle(x) {
            clear();
            ctx.beginPath();
            ctx.fillStyle = '#f00';
            ctx.arc(x, _height / 2, _circleRadius, 0, 2 * Math.PI);
            ctx.fill();
        }

        pureCanvas.addEventListener('click', function (e) {
            var x = e.pageX - pureCanvas.getBoundingClientRect().left;
            var y = e.pageY - pureCanvas.getBoundingClientRect().top;

            if (ctx.isPointInPath(x, y)) {
                animate();
            }
        });

        var pace = _width / _duration * 3;
        var animate = function animate() {
            setInterval(function () {
                currentX += pace;
                drawCircle(currentX);
            }, 1);
        };

        drawCircle(currentX);
    })();

    /* 
     * ============================
     * PROCESSING
     * ============================
     */

    (function () {

        var processingCanvas = document.getElementById('processingCanvas');
        var p = new Processing(processingCanvas, sketch);

        function sketch(processing) {

            processing.setup = function () {
                processing.size(_width, _height);
            };

            var x = 0;

            // override draw
            processing.draw = function () {

                processing.fill('#ff0000');
                processing.ellipse(0, 0, 20, 20);

                // erase background
                processing.background('#ffffff');

                processing.fill('#ff0000');
                processing.noStroke();
                processing.ellipse(_circleRadius, _height / 2, 20, 20);

                var now = new Date();
                drawElipse(++x);
            };
        }
    })();
});