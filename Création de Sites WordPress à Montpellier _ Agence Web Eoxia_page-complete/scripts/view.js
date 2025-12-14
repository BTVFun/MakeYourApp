(()=>{var __webpack_exports__={};
/*!**************************************!*\
  !*** ./blocks/src/eo-sticky/view.js ***!
  \**************************************/
(function($){var initializeBlock=function($block){$($block).find('.eo-sticky__menu').on('click',function(){$($block).toggleClass('is-active-mobile-menu')});$($block).find('.eo-sticky__menu-close').on('click',function(){$($block).removeClass('is-active-mobile-menu')})};$(document).ready(function(){$('.wp-block-eo-sticky').each(function(){initializeBlock($(this))})})})(jQuery)})()