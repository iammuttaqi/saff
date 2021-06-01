    "use strict";
    jQuery(document).ready(function () {
		
		 var loader_html = '<div class="system-site-wrap"><div class="system-loader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>';
         /* ---------------------------------------
		 Swap POPUP
		 --------------------------------------- */
		jQuery('.register-me').on('click', function() {
			jQuery('.login-modalbox').modal('hide');
			jQuery('.signup-modalbox').modal('show');
		});
	
		jQuery('.login-me').on('click', function() {
			jQuery('.signup-modalbox').modal('hide');
			jQuery('.login-modalbox').modal('show');
		});

		
		jQuery(document).on('click', '.subscribe_newsletter', function (event) {
			'use strict';
			event.preventDefault();
			var _this = jQuery(this);
			jQuery('body').append(loader_html);
			
			jQuery.ajax({
				type: 'POST',
				url: scripts_vars.ajaxurl,
				data: _this.parents('form').serialize() + '&action=subscribe_mailchimp',
				dataType: "json",
				success: function (response) {
					jQuery('body').find('.system-site-wrap').remove();
					if (response.type == 'success') {
						jQuery.sticky(response.message, {classList: 'success', speed: 200, autoclose: 5000});
						jQuery('.tg-formtheme').get(0).reset();
					} else {
						jQuery.sticky(response.message, {classList: 'important', speed: 200, autoclose: 5000});
					}
				}
			});
		});

		/* ---------------------------------------
         Login Ajax
         --------------------------------------- */
        jQuery('.do-login-form').on('click', '.do-login-button', function (event) {
            event.preventDefault();
            var $this = jQuery(this);
            $this.append('<i class="fa fa-refresh fa-spin"></i>');
            jQuery('.login-message').html('').hide();
            jQuery.ajax({
                type: "POST",
                url: scripts_vars.ajaxurl,
                data: jQuery('.do-login-form').serialize() + '&action=soccer_acumen_ajax_login',
                dataType: "json",
                success: function (response) {
                    $this.find('i.fa-spin').remove();
                    jQuery('.login-message').show();
                    if (response.type == 'success') {
                        jQuery('.login-message').html(response.message);
                        window.location.reload();
                    } else {
                        jQuery('.login-message').html(response.message);
                    }
                }
            });
        });
        /*
         * @Registration
         * @return{}
         */
        jQuery('.do-registration-form').on('click', '.do-register-button', function (event) {
            event.preventDefault();
            var $this = jQuery(this);
            $this.append('<i class="fa fa-refresh fa-spin"></i>');
            jQuery('.registration-message').html('').hide();
            jQuery.ajax({
                type: "POST",
                url: scripts_vars.ajaxurl,
                data: jQuery('.do-registration-form').serialize() + '&action=soccer_acumen_user_registration',
                dataType: "json",
                success: function (response) {
                    $this.find('i.fa-spin').remove();
                    jQuery('.registration-message').show();
                    if (response.type == 'success') {
                        jQuery('.registration-message').html(response.message);
                        //window.location.reload();
                    } else {
                        jQuery('.registration-message').html(response.message);
                    }
                }
            });
        });


        /*------------------------------------------
         HOME TWO NAVIGATION
         ------------------------------------------*/
        jQuery('#tg-btnnav').on('click', function () {
            jQuery('#tg-wrapper').toggleClass('tg-sidenavshow');
        });

        /*
         * @Contact Form
         * @return{}
         */
        jQuery('.contact_wrap_pg').on('click', '.contact_now_pg', function (e) {
            e.preventDefault();
            var _this = jQuery(this);
            var serialize_data = _this.parents('.contact_wrap_pg').find('.contact_form').serialize();
            var dataString = serialize_data + '&action=soccer_acumen_submit_contact';
            
			_this.parents('.contact_wrap_pg').find('.message_contact').html('').hide();
            _this.append("<i class='fa fa-refresh fa-spin'></i>");
            _this.parents('.contact_wrap_pg').find('.message_contact').removeClass('alert-success');
            _this.parents('.contact_wrap_pg').find('.message_contact').removeClass('alert-danger');

            jQuery.ajax({
                type: "POST",
                url: scripts_vars.ajaxurl,
                data: dataString,
                dataType: "json",
                success: function (response) {
                    _this.find('i').remove();
                    jQuery('.message_contact').show();
                    
					if (response.type == 'error') {
                        _this.parents('.contact_wrap_pg').find('.message_contact').addClass('alert alert-danger').show();
                        _this.parents('.contact_wrap_pg').find('.message_contact').html(response.message);
                    } else {
                        _this.parents('.contact_wrap_pg').find('.contact_form').get(0).reset();
                        _this.parents('.contact_wrap_pg').find('.message_contact').addClass('alert alert-success').show();
                        _this.parents('.contact_wrap_pg').find('.message_contact').html(response.message);
                    }
                }
            });

            return false;

        });
        /*--------------------------------------
         PRODUCT INCREASE
         --------------------------------------*/
        jQuery('.minus').on('click', function () {
            var $this = jQuery(this);
            if (jQuery('#quantity1').val() == '1') {
                $this.parents('.tg-productquentity').find('.quantity_variation').val(1);
            } else {
                $this.parents('.tg-productquentity').find('.quantity_variation').val(parseInt(jQuery('#quantity1').val()) - 1);
            }
        });
        jQuery('.plus').on('click', function () {
            var $this = jQuery(this);
            if ($this.parents('.tg-productquentity').find('#quantity1').val() == jQuery('#quantity1').attr('max')) {
            } else {
                $this.parents('.tg-productquentity').find('.quantity_variation').val(parseInt(jQuery('#quantity1').val()) + 1);
            }
        });

        /*
         /*------------------------------------------
         SLIDER BACKGROUND MOVE
         ------------------------------------------*/
        function sliderbgMove() {
            var moveForce = 25;
            var rotateForce = 15;
            jQuery(document).mousemove(function (e) {
                var docX = jQuery(document).width();
                var docY = jQuery(document).height();
                var moveX = (e.pageX - docX / 2) / (docX / 2) * -moveForce;
                var moveY = (e.pageY - docY / 2) / (docY / 2) * -moveForce;
                var rotateY = (e.pageX / docX * rotateForce * 2) - rotateForce;
                var rotateX = -((e.pageY / docY * rotateForce * 2) - rotateForce);
                jQuery('.tg-imglayer')
                        .css('left', moveX + 'px')
                        .css('top', moveY + 'px')
                        .css('transform', 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
            });
        }
        sliderbgMove();

        /*------------------------------------------
         SEARCH AREA
         ------------------------------------------*/
        function searchToggle() {
            jQuery('#tg-btn-search').on('click', function () {
                jQuery('.tg-searchbox').addClass('in');
            });
            jQuery('#tg-close-search').on('click', function () {
                jQuery('.tg-searchbox').removeClass('in');
            });
        }
        searchToggle();
        
        function mobilemenuToggle() {
            jQuery('#tg-close').on('click', function () {
                jQuery('.tg-navigationm-mobile').addClass('in');
            });
            jQuery('#tg-close').on('click', function () {
                jQuery('.tg-navigationm-mobile').removeClass('in');
            });
        }
        mobilemenuToggle();
        /*------------------------------------------
         MEDIA SCROLLBAR
         ------------------------------------------*/
        jQuery("#tg-soccermediascrollbar").mCustomScrollbar({
            axis: "x",
            advanced: {
                autoExpandHorizontalScroll: true
            }
        });
        /*------------------------------------------
         ALL MATCHS SCROLLBAR
         ------------------------------------------*/
        jQuery("#tg-playerscrollbar, #tg-matchscrollbar, #tg-navscrollbar").mCustomScrollbar({
            axis: "y",
        });
        /*------------------------------------------
         ALL MATCHS SLIDER
         ------------------------------------------*/
        var swiper = new Swiper('#tg-match-slider', {
            direction: 'vertical',
            slidesPerView: 4,
            spaceBetween: 10,
            mousewheelControl: true,
            nextButton: '.tg-themebtnnext',
            prevButton: '.tg-themebtnprev',
            autoplay: 2000,
        });
        /*------------------------------------------
         ALL MATCHS SLIDER
         ------------------------------------------*/
        var swiper = new Swiper('#tg-slideshow-slider', {
            slidesPerView: 1,
            pagination: '.swiper-pagination',
            paginationType: 'fraction',
            mousewheelControl: true,
            nextButton: '.tg-themebtnnext',
            prevButton: '.tg-themebtnprev',
            autoplay: 2000,
        });
        /*------------------------------------------
         PLAYER DETAIL SLIDER
         ------------------------------------------*/
        var swiper = new Swiper('#tg-playerslider', {
            slidesPerView: 1,
            nextButton: '.tg-themebtnnext',
            prevButton: '.tg-themebtnprev',
            autoplay: 2000,
        });
        /* ---------------------------------------
         STATISTICS
         -------------------------------------- */
        try {
            jQuery('.tg-statistic').appear(function () {
                jQuery('.tg-statistic-count').countTo();
            });
        } catch (err) {
        }
        /* ---------------------------------------
         Add li class in vertical menu
         -------------------------------------- */
        jQuery('#menu-vertical-menu > li').addClass('tg-hasdropdown');
        jQuery('#menu-vertical-menu > li > ul > li').addClass('tg-hasdropdown');

        /*------------------------------------------
         SPONSER SLIDER
         ------------------------------------------*/
        var mainswiper = new Swiper('#tg-sponser-slider', {
            direction: 'vertical',
            slidesPerView: 3,
            spaceBetween: 10,
            mousewheelControl: true,
            nextButton: '.tg-themebtnnext',
            prevButton: '.tg-themebtnprev',
        });


        /* ---------------------------------------
         PRETTY PHOTO GALLERY
         -------------------------------------- */
        jQuery("a[data-rel]").each(function () {
           jQuery(this).attr("rel", $(this).data("rel"));
        });
        jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
            animation_speed: 'normal',
            theme: 'dark_square',
            slideshow: 3000,
            autoplay_slideshow: false,
            social_tools: false
        });




        /*------------------------------------------
         RESULT DETAIL SLIDER
         ------------------------------------------*/
        var swiper = new Swiper('#tg-matchdetailslider', {
            slidesPerView: 1,
            nextButton: '.tg-themebtnnext',
            prevButton: '.tg-themebtnprev',
            autoplay: 0,
        });
        /*------------------------------------------
         SHOP BANNER SLIDER
         ------------------------------------------*/
        var swiper = new Swiper('#tg-shopslider', {
            loop: true,
            slidesPerView: 1,
            pagination: '.swiper-pagination',
            paginationClickable: true,
        });
		/* ---------------------------------------
				MEDIA SCROLLBAR RESET
		-------------------------------------- */
		function resetScrollbar(){
			jQuery('#tg-filterbale-nav li a').on('click', function () {
				jQuery('#tg-soccermediascrollbar').html();
				jQuery('#mCSB_1_container').animate({left: '0'});
			});
		}
		resetScrollbar();
		/* -------------------------------------
				FIXED HEADER
		-------------------------------------- */
		function collapseNav(){
			jQuery('.tg-sidenav .tg-navigation > ul > li a').attr('data-toggle', 'collapse');
			jQuery('.tg-sidenav .tg-navigation > ul > li a').attr('data-target', '#tg-navigation');
			jQuery('.tg-sidenav .tg-navigation > ul > li.tg-hasdropdown > ul').hide();
			jQuery('.tg-sidenav .tg-navigation > ul > li.tg-hasdropdown').prepend('<span class="tg-dropdowarrow"><i class="fa fa-angle-down"></i></span>');
			jQuery('.tg-sidenav .tg-navigation > ul > li.tg-hasdropdown span').on('click', function() {
				jQuery(this).next().next().slideToggle();
			});
		}
		collapseNav();
        /* ---------------------------------------
         PORTFOLIO FILTERABLE
         -------------------------------------- */
        var $container = jQuery('.tg-soccermedia-content');
        var $optionSets = jQuery('.option-set');
        var $optionLinks = $optionSets.find('a');
        function doIsotopeFilter() {
            if (jQuery().isotope) {
                var isotopeFilter = '';
                $optionLinks.each(function () {
                    var selector = jQuery(this).attr('data-filter');
                    var link = window.location.href;
                    var firstIndex = link.indexOf('filter=');
                    if (firstIndex > 0) {
                        var id = link.substring(firstIndex + 7, link.length);
                        if ('.' + id == selector) {
                            isotopeFilter = '.' + id;
                        }
                    }
                });
                $container.isotope({
                    filter: isotopeFilter
                });
                $optionLinks.each(function () {
                    var $this = jQuery(this);
                    var selector = $this.attr('data-filter');
                    if (selector == isotopeFilter) {
                        if (!$this.hasClass('active')) {
                            var $optionSet = $this.parents('.option-set');
                            $optionSet.find('.active').removeClass('active');
                            $this.addClass('active');
                        }
                    }
                });
                $optionLinks.on('click', function () {
                    var $this = jQuery(this);
                    var selector = $this.attr('data-filter');
                    $container.isotope({itemSelector: '.masonry-grid', filter: selector});
                    if (!$this.hasClass('active')) {
                        var $optionSet = $this.parents('.option-set');
                        $optionSet.find('.active').removeClass('active');
                        $this.addClass('active');
                    }
                    return false;
                });
            }
        }
        var isotopeTimer = window.setTimeout(function () {
            window.clearTimeout(isotopeTimer);
            doIsotopeFilter();
        }, 1000);
	
    });

	

/* -------------------------------------
 Init Full Width Sections
 -------------------------------------- */
builder_full_width_section(); //Init Sections
var $ = window.jQuery;
$(window).off("resize.sectionSettings").on("resize.sectionSettings", builder_full_width_section);
function builder_full_width_section() {
    var $sections = jQuery('.main-page-wrapper .stretch_section');

    jQuery.each($sections, function (key, item) {
        var _sec = jQuery(this);
        var _sec_full = _sec.next(".section-current-width");
        _sec_full.length || (_sec_full = _sec.parent().next(".section-current-width"));

        var _sec_margin_left = parseInt(_sec.css("margin-left"), 10);
        var _sec_margin_right = parseInt(_sec.css("margin-right"), 10);
        var offset = 0 - _sec_full.offset().left - _sec_margin_left;
        var width = jQuery(window).width();

        if (_sec.css({
            position: "relative",
            left: offset,
            "box-sizing": "border-box",
            width: jQuery(window).width()
        }), !_sec.hasClass("stretch_data")) {

            var padding = -1 * offset;

            0 > padding && (padding = 0);
            var paddingRight = width - padding - _sec_full.width() + _sec_margin_left + _sec_margin_right;
            0 > paddingRight && (paddingRight = 0), _sec.css({
                "padding-left": padding + "px",
                "padding-right": paddingRight + "px"
            })
        }
    });
}

function soccer_acumen_get_map_styles(style) {
    var styles = '';
    if (style == 'view_1') {
        var styles = [{"featureType": "administrative.country", "elementType": "geometry", "stylers": [{"visibility": "simplified"}, {"hue": "#ff0000"}]}];
    } else if (style == 'view_2') {
        var styles = [{"featureType": "water", "elementType": "all", "stylers": [{"hue": "#7fc8ed"}, {"saturation": 55}, {"lightness": -6}, {"visibility": "on"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"hue": "#7fc8ed"}, {"saturation": 55}, {"lightness": -6}, {"visibility": "off"}]}, {"featureType": "poi.park", "elementType": "geometry", "stylers": [{"hue": "#83cead"}, {"saturation": 1}, {"lightness": -15}, {"visibility": "on"}]}, {"featureType": "landscape", "elementType": "geometry", "stylers": [{"hue": "#f3f4f4"}, {"saturation": -84}, {"lightness": 59}, {"visibility": "on"}]}, {"featureType": "landscape", "elementType": "labels", "stylers": [{"hue": "#ffffff"}, {"saturation": -100}, {"lightness": 100}, {"visibility": "off"}]}, {"featureType": "road", "elementType": "geometry", "stylers": [{"hue": "#ffffff"}, {"saturation": -100}, {"lightness": 100}, {"visibility": "on"}]}, {"featureType": "road", "elementType": "labels", "stylers": [{"hue": "#bbbbbb"}, {"saturation": -100}, {"lightness": 26}, {"visibility": "on"}]}, {"featureType": "road.arterial", "elementType": "geometry", "stylers": [{"hue": "#ffcc00"}, {"saturation": 100}, {"lightness": -35}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "elementType": "geometry", "stylers": [{"hue": "#ffcc00"}, {"saturation": 100}, {"lightness": -22}, {"visibility": "on"}]}, {"featureType": "poi.school", "elementType": "all", "stylers": [{"hue": "#d7e4e4"}, {"saturation": -60}, {"lightness": 23}, {"visibility": "on"}]}];
    } else if (style == 'view_3') {
        var styles = [{"featureType": "water", "stylers": [{"saturation": 43}, {"lightness": -11}, {"hue": "#0088ff"}]}, {"featureType": "road", "elementType": "geometry.fill", "stylers": [{"hue": "#ff0000"}, {"saturation": -100}, {"lightness": 99}]}, {"featureType": "road", "elementType": "geometry.stroke", "stylers": [{"color": "#808080"}, {"lightness": 54}]}, {"featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{"color": "#ece2d9"}]}, {"featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{"color": "#ccdca1"}]}, {"featureType": "road", "elementType": "labels.text.fill", "stylers": [{"color": "#767676"}]}, {"featureType": "road", "elementType": "labels.text.stroke", "stylers": [{"color": "#ffffff"}]}, {"featureType": "poi", "stylers": [{"visibility": "off"}]}, {"featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{"visibility": "on"}, {"color": "#b8cb93"}]}, {"featureType": "poi.park", "stylers": [{"visibility": "on"}]}, {"featureType": "poi.sports_complex", "stylers": [{"visibility": "on"}]}, {"featureType": "poi.medical", "stylers": [{"visibility": "on"}]}, {"featureType": "poi.business", "stylers": [{"visibility": "simplified"}]}];

    } else if (style == 'view_4') {
        var styles = [{"elementType": "geometry", "stylers": [{"hue": "#ff4400"}, {"saturation": -68}, {"lightness": -4}, {"gamma": 0.72}]}, {"featureType": "road", "elementType": "labels.icon"}, {"featureType": "landscape.man_made", "elementType": "geometry", "stylers": [{"hue": "#0077ff"}, {"gamma": 3.1}]}, {"featureType": "water", "stylers": [{"hue": "#00ccff"}, {"gamma": 0.44}, {"saturation": -33}]}, {"featureType": "poi.park", "stylers": [{"hue": "#44ff00"}, {"saturation": -23}]}, {"featureType": "water", "elementType": "labels.text.fill", "stylers": [{"hue": "#007fff"}, {"gamma": 0.77}, {"saturation": 65}, {"lightness": 99}]}, {"featureType": "water", "elementType": "labels.text.stroke", "stylers": [{"gamma": 0.11}, {"weight": 5.6}, {"saturation": 99}, {"hue": "#0091ff"}, {"lightness": -86}]}, {"featureType": "transit.line", "elementType": "geometry", "stylers": [{"lightness": -48}, {"hue": "#ff5e00"}, {"gamma": 1.2}, {"saturation": -23}]}, {"featureType": "transit", "elementType": "labels.text.stroke", "stylers": [{"saturation": -64}, {"hue": "#ff9100"}, {"lightness": 16}, {"gamma": 0.47}, {"weight": 2.7}]}];

    } else if (style == 'view_5') {
        var styles = [{"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]}, {"featureType": "landscape", "elementType": "geometry", "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]}, {"featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"}, {"lightness": 17}]}, {"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]}, {"featureType": "road.arterial", "elementType": "geometry", "stylers": [{"color": "#ffffff"}, {"lightness": 18}]}, {"featureType": "road.local", "elementType": "geometry", "stylers": [{"color": "#ffffff"}, {"lightness": 16}]}, {"featureType": "poi", "elementType": "geometry", "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]}, {"featureType": "poi.park", "elementType": "geometry", "stylers": [{"color": "#dedede"}, {"lightness": 21}]}, {"elementType": "labels.text.stroke", "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]}, {"elementType": "labels.text.fill", "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]}, {"elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {"featureType": "transit", "elementType": "geometry", "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]}, {"featureType": "administrative", "elementType": "geometry.fill", "stylers": [{"color": "#fefefe"}, {"lightness": 20}]}, {"featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]}];

    } else if (style == 'view_6') {
        var styles = [{"featureType": "landscape", "stylers": [{"hue": "#FFBB00"}, {"saturation": 43.400000000000006}, {"lightness": 37.599999999999994}, {"gamma": 1}]}, {"featureType": "road.highway", "stylers": [{"hue": "#FFC200"}, {"saturation": -61.8}, {"lightness": 45.599999999999994}, {"gamma": 1}]}, {"featureType": "road.arterial", "stylers": [{"hue": "#FF0300"}, {"saturation": -100}, {"lightness": 51.19999999999999}, {"gamma": 1}]}, {"featureType": "road.local", "stylers": [{"hue": "#FF0300"}, {"saturation": -100}, {"lightness": 52}, {"gamma": 1}]}, {"featureType": "water", "stylers": [{"hue": "#0078FF"}, {"saturation": -13.200000000000003}, {"lightness": 2.4000000000000057}, {"gamma": 1}]}, {"featureType": "poi", "stylers": [{"hue": "#00FF6A"}, {"saturation": -1.0989010989011234}, {"lightness": 11.200000000000017}, {"gamma": 1}]}];
    }
    return styles;
}

/*
 Sticky v2.1.2 by Andy Matthews
 http://twitter.com/commadelimited
 
 forked from Sticky by Daniel Raftery
 http://twitter.com/ThrivingKings
 */
(function ($) {

    $.sticky = $.fn.sticky = function (note, options, callback) {

        // allow options to be ignored, and callback to be second argument
        if (typeof options === 'function')
            callback = options;

        // generate unique ID based on the hash of the note.
        var hashCode = function (str) {
            var hash = 0,
                    i = 0,
                    c = '',
                    len = str.length;
            if (len === 0)
                return hash;
            for (i = 0; i < len; i++) {
                c = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + c;
                hash &= hash;
            }
            return 's' + Math.abs(hash);
        },
                o = {
                    position: 'top-right', // top-left, top-right, bottom-left, or bottom-right
                    speed: 'fast', // animations: fast, slow, or integer
                    allowdupes: true, // true or false
                    autoclose: 5000, // delay in milliseconds. Set to 0 to remain open.
                    classList: '' // arbitrary list of classes. Suggestions: success, warning, important, or info. Defaults to ''.
                },
        uniqID = hashCode(note), // a relatively unique ID
                display = true,
                duplicate = false,
                tmpl = '<div class="sticky border-POS CLASSLIST" id="ID"><span class="sticky-close"></span><p class="sticky-note">NOTE</p></div>',
                positions = ['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'];

        // merge default and incoming options
        if (options)
            $.extend(o, options);

        // Handling duplicate notes and IDs
        $('.sticky').each(function () {
            if ($(this).attr('id') === hashCode(note)) {
                duplicate = true;
                if (!o.allowdupes)
                    display = false;
            }
            if ($(this).attr('id') === uniqID)
                uniqID = hashCode(note);
        });

        // Make sure the sticky queue exists
        if (!$('.sticky-queue').length) {
            $('body').append('<div class="sticky-queue ' + o.position + '">');
        } else {
            // if it exists already, but the position param is different,
            // then allow it to be overridden
            $('.sticky-queue').removeClass(positions.join(' ')).addClass(o.position);
        }

        // Can it be displayed?
        if (display) {
            // Building and inserting sticky note
            $('.sticky-queue').prepend(
                    tmpl
                    .replace('POS', o.position)
                    .replace('ID', uniqID)
                    .replace('NOTE', note)
                    .replace('CLASSLIST', o.classList)
                    ).find('#' + uniqID)
                    .slideDown(o.speed, function () {
                        display = true;
                        // Callback function?
                        if (callback && typeof callback === 'function') {
                            callback({
                                'id': uniqID,
                                'duplicate': duplicate,
                                'displayed': display
                            });
                        }
                    });

        }

        // Listeners
        $('.sticky').ready(function () {
            // If 'autoclose' is enabled, set a timer to close the sticky
            if (o.autoclose) {
                $('#' + uniqID).delay(o.autoclose).fadeOut(o.speed, function () {
                    // remove element from DOM
                    $(this).remove();
                });
            }
        });

        // Closing a sticky
        $('.sticky-close').on('click', function () {
            $('#' + $(this).parent().attr('id')).dequeue().fadeOut(o.speed, function () {
                // remove element from DOM
                $(this).remove();
            });
        });

    };
})(jQuery);