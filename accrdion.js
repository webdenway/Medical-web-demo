/**
 * Copyright © 2020 KSalting
 *
 * https://github.com/codebyksalting/jquery-accrdion
 *
 * Licensed under the GNU General Public License v3.0
 *
 * https://github.com/codebyksalting/jquery-accrdion/blob/master/LICENSE
 *
 * Permissions of this strong copyleft license are conditioned
 * on making available complete source code of licensed works
 * and modifications, which include larger works using
 * a licensed work, under the same license. Copyright
 * and license notices must be preserved. Contributors
 * provide an express grant of patent rights.
 *
 * jQuery.accrdion()
 *
 * @param {boolean} openFirstByDefault Open the first item by default
 * @param {string} displayStyle Close all others when or open/close the current item
 * @param {integer/string} toggleSpeed The animation speed in milliseconds or string (slow/fast)
 * @param {boolean} scrollToActive Scroll to the top of the current item
 * @param {integer/string} scrollSpeed The animation speed in milliseconds
 */
 $(document).ready(function() {

     $('.my-accordion').accrdion({
         openFirstByDefault: true,
         displayStyle: 'single',
         toggleSpeed: 'slow'
     });

     // $('.my-accordion2').accrdion({
     //     openFirstByDefault: true,
     //     displayStyle: 'any',
     //     toggleSpeed: 20
     // });
     //
     // $('.my-accordion3').accrdion({
     //     openFirstByDefault: false,
     //     displayStyle: 'single',
     //     toggleSpeed: 'slow'
     // });

 });





(function( $ ) {
    $.fn.accrdion = function( options ) {

        // Default options
        var configuration = $.extend({
            openFirstByDefault: true,   // [true, false]
            displayStyle: 'single',     // ['single', 'any']
            toggleSpeed: 500,           // [milliseconds, 'slow', 'fast']
            scrollToActive: true,       // [true, false]
            scrollSpeed: 500,           // [milliseconds]
        }, options );

        return this.each( function() {
            const $_accrdion_wrapper = $(this);
            const $_accrdion_item = $_accrdion_wrapper.find( '.accrdion-entry' );

            // Add class for styling purposes
            $_accrdion_wrapper.addClass( `accrdion-wrapper ${configuration.displayStyle}` );

            // Set initial behavior
            $_accrdion_item.each( function( index ) {
                $_item = $(this);

                // If openFirstByDefault is true, leave the first one open by default
                if ( configuration.openFirstByDefault && index == 0 ) {
                    $_item.addClass( 'accrdion-active' );
                } else {
                    $_item.find( '.accrdion-content' ).slideUp( configuration.toggleSpeed );
                }
            });

            // Main event handler
            $_accrdion_wrapper.on( 'click', '.accrdion-header', function( event ) {
                const $_clicked = $(this);
                let $_item = $_clicked.parent();
                const $_wrapper = $_item.parent();
                const $_index = $_item.index();

                let $_flag = false;

                if ( configuration.displayStyle === 'single' ) {
                    // Cycle through all of the accordion items
                    $_wrapper.find( '.accrdion-entry' ).each( function( index ) {
                        $_current_item = $(this);

                        // Enable toggle if openFirstByDefault: true and displayStyle: single
                        if ( $_index == index && !$_current_item.hasClass( 'accrdion-active' ) ) {
                            $_flag = true;
                        } else {
                            // Nothing should happen if the current active accordion item's header is clicked
                            if ( $_index != index ) {
                                if ( $_current_item.hasClass( 'accrdion-active' ) ) {
                                    $_current_item.removeClass( 'accrdion-active' );
                                }

                                $_current_item.find( '.accrdion-content' ).slideUp( configuration.toggleSpeed );
                            }
                        }
                    });
                } else {
                    $_flag = true;
                }

                if ( $_flag ) {
                    $_clicked.next().toggle( configuration.toggleSpeed, function() {
                        // Add the active class and scroll to current item top
                        $_item.toggleClass( 'accrdion-active' );

                        $('html, body').animate({
                            scrollTop: $_item.offset().top - 20 // Add breathing space
                        }, configuration.scrollSpeed);
                    });
                }
            });
        });

    }
})( jQuery );
