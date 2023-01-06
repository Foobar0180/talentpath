/**
 * Theme: Ubold Admin Template
 * Author: Coderthemes
 * Module/App: Main Js
 */


(function($) {

    'use strict';

    function initNavbar() {

        $('.navbar-toggle').on('click', function(event) {
            $(this).toggleClass('open');
            $('#navigation').slideToggle(400);
        });

        $('.navigation-menu>li').slice(-1).addClass('last-elements');

        $('.navigation-menu li.has-submenu a[href="#"]').on('click', function(e) {
            if ($(window).width() < 992) {
                e.preventDefault();
                $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
            }
        });
    }

    function init() {
        initNavbar();
    }

    init();

})(jQuery)

// Toggle state of specified element
function toggleSwitch(id, target) {
    $(id).on('switchChange.bootstrapSwitch', function(event, state) {
        var checked = state;
        if (checked) {
            $(target).removeClass('hidden');
        } else {
            $(target).addClass('hidden');
        }
    });
};
