// Course: Webbutveckling III - DT173G
// Assignment: Moment 3
// Author: Fredrik Waldfelt - frwa1700
// Date: 2018-09-14
// Filename: navigation.js
// A simple navigation

"use strict"

var showNav = function() {
    var init = function () {
        var toggleElement = document.getElementById('navlink');

        toggleElement.addEventListener('click', toggleFunc);
    };

    var toggleFunc = function() {
        var formDiv = document.getElementById('mainnav');
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

showNav.init();