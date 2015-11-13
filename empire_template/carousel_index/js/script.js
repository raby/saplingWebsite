// Template Name: EMPIRE
// Version: 1.3
// Author: Code & Square
// Author URI: codeandsquare.com

 jQuery(document).ready(function ($) {
     
//	PRELOADER
    $(".preloader").delay(1000).fadeOut("slow")
 
//	NAVIGATION
    $('.main-nav li a').bind('click',function(event){
        var $anchor = $(this);
	   		
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 102
        }, 1500,'easeInOutExpo');
        event.preventDefault();
    });

    $(".nav-trigger, .nav").on('click', function () {
        $(".nav").fadeToggle(500);
    });
    $(".nav-trigger, .nav").on('click', function () {
        $(".top-nav").toggleClass("nav-line-top");
        $(".mid-nav").toggleClass("nav-line-mid");
        $(".bottom-nav").toggleClass("nav-line-bottom");
    });

    $('.nav li, .internal-link').on('click', function() {
        var target = $(this).data('rel');
        var $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing');
    });
               
//	EASING
    $('.nav li a').bind('click',function(event){
        var $anchor = $(this);
			
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('data-rel')).offset().top - 102
        }, 1500,'easeInOutExpo');
        event.preventDefault();
    });

//	PAGE SCROLLING
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

//	COUNTER
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
               
//	WOW     
    var wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 100, // distance to the element when triggering the animation (default is 0)
        mobile: false // trigger animations on mobile devices (true is default)
    });
    wow.init();
    
//	INTRO CAROUSEL
    $("#owl-intro-text").owlCarousel({
        singleItem : true,
        slideSpeed : 300,
        autoPlay: true, 
        stopOnHover : true,
        navigation : false,
        navigationText : false,
        pagination : true
    });
    
//	CLIENTS CAROUSEL
    $("#owl-clients").owlCarousel({
        stopOnHover : true,
        pagination : false,
        autoPlay : 2000,
        autoPlay: true,  
        items : 4,
        itemsDesktop:[1199,4],  
        itemsDesktopSmall:[979,3], //As above.
        itemsTablet:[768,2], //As above.
        // itemsTablet:[640,2],   
        itemsMobile:[479,1], //As above  
    });
    
//	TESTIMONIALS FLEXSLIDER
	$('.flexslider').flexslider({
		animation: "fade",
		directionNav: false,
	});
    
//	PORTFOLIO FILTER
    $(window).load(function(){
    
        var container = $('.portfolio-container');

        container.isotope({
            itemSelector: '.portfolio-item',
            animationEngine: 'best-available',
            animationOptions: {
            duration: 200,
            queue: false
            },
            layoutMode: 'fitRows'
        });

        // sort items on button click
        $('.portfolio-filter a').on('click', function() {
            $('.portfolio-filter .current').removeClass('current');
            $(this).addClass('current');
            var selector = $(this).attr('data-filter');
            container.isotope({
                filter: selector,
            });
            return false;
        });
        
        // Split columns for different size layout
        function splitColumns() {
            var windowWidth = $(window).width(),
                columnNumber = 1;
            if (windowWidth > 1200) {
                columnNumber = 4;
            } else if (windowWidth > 767) {
                columnNumber = 3;
            } else if (windowWidth > 600) {
                columnNumber = 2;
            }
            return columnNumber;
        }
        // Set width for portfolio item
        function setColumns() {
            var windowWidth = $(window).width(),
                columnNumber = splitColumns(),
                postWidth = Math.floor(windowWidth / columnNumber);

            container.find('.portfolio-item').each(function() {
                $(this).css({
                    width: postWidth + 'px'
                });
            });
        }
        // initialize isotope
        function initIsotope() {
            setColumns();
            container.isotope('layout');
        }
        container.imagesLoaded(function() {
            setColumns();
        });
        $(window).bind('resize', function() {
            initIsotope();
        });
        initIsotope();
  
    });
    

//	SKILLBAR
    $('.skillbar').each(function(){
        $(this).find('.skillbar-bar').animate({
            width:$(this).attr('data-percent')
        },9000);
    });
    
// INTRO SLIDER
   var slidesWrapper = $('.intro-slider');

     if ( slidesWrapper.length > 0 ) {
         var carouselNav = $('.carousel-nav'),
             navigationMarker = $('.carousel-marker'),
             slidesNumber = slidesWrapper.children('li').length,
             visibleSlidePosition = 0,
             autoPlayId,
             autoPlayDelay = 5000;

         uploadVideo(slidesWrapper);
         setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);
	     	
         carouselNav.on('click', 'li', function(event){
             event.preventDefault();
             var selectedItem = $(this);
             if(!selectedItem.hasClass('active')) {
                 var selectedPosition = selectedItem.index(),
                     activePosition = slidesWrapper.find('li.active').index();
		  		
                 if( activePosition < selectedPosition) {
                     nextSlide(slidesWrapper.find('.active'), slidesWrapper, carouselNav, selectedPosition);
                 } else {
                     prevSlide(slidesWrapper.find('.active'), slidesWrapper, carouselNav, selectedPosition);
                 }
                     
                 visibleSlidePosition = selectedPosition;
                   
                 updateSliderNavigation(carouselNav, selectedPosition);
                 updateNavigationMarker(navigationMarker, selectedPosition+1);
                 setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);
             }
         });
     }

     function nextSlide(visibleSlide, container, pagination, n){
         visibleSlide.removeClass('active from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
             visibleSlide.removeClass('is-moving');
         });

         container.children('li').eq(n).addClass('active from-right').prevAll().addClass('move-left');
         checkVideo(visibleSlide, container, n);
     }

     function prevSlide(visibleSlide, container, pagination, n){
         visibleSlide.removeClass('active from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
             visibleSlide.removeClass('is-moving');
         });

         container.children('li').eq(n).addClass('active from-left').removeClass('move-left').nextAll().removeClass('move-left');
         checkVideo(visibleSlide, container, n);
     }

     function updateSliderNavigation(pagination, n) {
         var navigationDot = pagination.find('.active');
         navigationDot.removeClass('active');
         pagination.find('li').eq(n).addClass('active');
     }

     function setAutoplay(wrapper, length, delay) {
         if(wrapper.hasClass('autoplay')) {
             clearInterval(autoPlayId);
             autoPlayId = window.setInterval(function(){autoplaySlider(length)}, delay);
         }
     }

     function autoplaySlider(length) {
         if( visibleSlidePosition < length - 1) {
             nextSlide(slidesWrapper.find('.active'), slidesWrapper, carouselNav, visibleSlidePosition + 1);
             visibleSlidePosition +=1;
         } else {
             prevSlide(slidesWrapper.find('.active'), slidesWrapper, carouselNav, 0);
             visibleSlidePosition = 0;
         }
         updateNavigationMarker(navigationMarker, visibleSlidePosition+1);
         updateSliderNavigation(carouselNav, visibleSlidePosition);
     }

     function uploadVideo(container) {
         container.find('.video-wrapper').each(function(){
             var videoWrapper = $(this);
             if( videoWrapper.is(':visible') ) {
                 var videoUrl = videoWrapper.data('video'),
                     video = $('<video loop><source src="'+videoUrl+'.mp4" type="video/mp4" /><source src="'+videoUrl+'.webm" type="video/webm" /><source src="'+videoUrl+'.ogv" type="video/ogv" /></video>');
                 video.appendTo(videoWrapper);
                 if(videoWrapper.parent('.video-bg.active').length > 0) video.get(0).play();
             }
         });
     }

     function checkVideo(hiddenSlide, container, n) {
         var hiddenVideo = hiddenSlide.find('video');
         if( hiddenVideo.length > 0 ) hiddenVideo.get(0).pause();
         
         var visibleVideo = container.children('li').eq(n).find('video');
         if( visibleVideo.length > 0 ) visibleVideo.get(0).play();
     }
       
     function updateNavigationMarker(marker, n) {
         marker.removeClassPrefix('item').addClass('item-'+n);
     }

     $.fn.removeClassPrefix = function(prefix) {
         this.each(function(i, el) {
             var classes = el.className.split(" ").filter(function(c) {
                 return c.lastIndexOf(prefix, 0) !== 0;
             });
             el.className = $.trim(classes.join(" "));
         });
         return this;
     };

//	VIDEO BACKGROUND
    $(function() {

        scaleVideoContainer();
        
        $(window).on('resize', function() {
            scaleVideoContainer();
        });

    });

    function scaleVideoContainer() {
        
        var height = $(window).height();
        var unitHeight = parseInt(height) + 'px';
        $('.video-intro').css('height',unitHeight);

    }
    
//	SUBSCRIBE AJAX MAILCHIMP FORM
	// Example MailChimp url: http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
	var mailChimpURL = 'http://codeandsquare.us11.list-manage.com/subscribe/post?u=2a14dee51c1c79d79d01d17b3&amp;id=da88437b43'


	$('#mc-form').ajaxChimp({

		language: 'es',
	   url: mailChimpURL

	});

	// Mailchimp translation
	//
	//  Defaults:
	//	 'submit': 'Submitting...',
	//  0: 'We have sent you a confirmation email',
	//  1: 'Please enter a value',
	//  2: 'An email address must contain a single @',
	//  3: 'The domain portion of the email address is invalid (the portion after the @: )',
	//  4: 'The username portion of the email address is invalid (the portion before the @: )',
	//  5: 'This email address looks fake or invalid. Please enter a real email address'

	$.ajaxChimp.translations.es = {
	  'submit': 'Submitting...',
	  0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
	  1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
	  2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
	  3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
	  4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
	  5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
	}

    
//	CONTACT FORM
    function initContactForm() {
        var scrollElement = $('html,body'),
            contactForm = $('.contact-form');

        contactForm.on('submit', function() {

            var requiredFields = $(this).find('.required'),
                formData = contactForm.serialize(),
                formAction = $(this).attr('action'),
                formSubmitMessage = $('.response-message');

            requiredFields.each(function() {

                if( $(this).val() === "" ) {
                        
                    $(this).addClass('input-error');

                } else {

                    $(this).removeClass('input-error');
                }

            });

            function validateEmail(email) { 
                var exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return exp.test(email);
            }
            
            var emailField = $('.contact-form-email');

            if( !validateEmail(emailField.val()) ) {

                emailField.addClass("input-error");

            }

            if ($(".contact-form :input").hasClass("input-error")) {
                return false;
            } else {

                $.post(formAction, formData, function(data) {
                    formSubmitMessage.text(data);

                    requiredFields.val("");
                    
                    setTimeout(function() {
                        formSubmitMessage.slideUp();
                    }, 5000);
                });
                
            }

            return false;
        });

    }
    initContactForm();
    
});