// Course: Webbutveckling III - DT173G
// Assignment: Moment 2
// Author: Fredrik Waldfelt - frwa1700
// Date: 2018-09-05
// Filename: showform.js
// A javascript to show and hide a form

"use strict"

var slideShow = function() {
    var init = function () {
        var toggleElement = document.getElementById('contactToggle');

        toggleElement.addEventListener('click', toggleFunc);
    };

    var toggleFunc = function() {
        var formDiv = document.getElementById('contact-div');
        if (formDiv.style.display != 'block') {
            formDiv.style.display = 'block';
        } else {
            formDiv.style.display = 'none';
        }
    }

    return {
        init: init
    };
}();

slideShow.init();