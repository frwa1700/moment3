// Course: Webbutveckling III - DT173G
// Assignment: Moment 2
// Author: Fredrik Waldfelt - frwa1700
// Date: 2018-09-05
// Filename: script.js
// A simple slideshow to use as demo-js

"use strict"

var slideShow = function() {
    var init = function () {
        // Check if there is a slideshow-div and start slideshow
        var isSlideshow = document.getElementById("slideshow-div");
        if (isSlideshow) startSlides(3000);
    };

    var startSlides = function (timing) {
        var slides = document.querySelectorAll('#slideshow .slide');
        var currentSlide = 0;
        var slideInterval = setInterval(nextSlide, timing);

        function nextSlide() {
            slides[currentSlide].className = 'slide';
            currentSlide = (currentSlide + 1 )% slides.length;
            slides[currentSlide].className = 'slide showing';
        };
    };

    return {
        init: init
    };
}();

slideShow.init();