/* ================================================
Theme Name: EMPIRE HTML Template FAQ
Description: A Responsive One Page HTML 5 Template with a sophisticated style and great design
Version: 1.0
Author: Code & Square
Author URI: codeandsquare.com
================================================ */

jQuery(document).ready(function($){

	var MqM= 768,
		MqL = 1024;

	var faqsSections = $('.faq-group'),
		faqTrigger = $('.faq-trigger'),
		faqsContainer = $('.faq-items'),
		faqsCategoriesContainer = $('.faq-categories'),
		faqsCategories = faqsCategoriesContainer.find('a'),
		closeFaqsContainer = $('.close-panel');
	
	//select a faq section 
	faqsCategories.on('click', function(event){
		event.preventDefault();
		var selectedHref = $(this).attr('href'),
			target= $(selectedHref);
		if( $(window).width() < MqM) {
			faqsContainer.scrollTop(0).addClass('slide-in').children('ul').removeClass('selected').end().children(selectedHref).addClass('selected');
			closeFaqsContainer.addClass('move-left');
			$('body').addClass('overlay');
		} else {
	        $('body,html').animate({ 'scrollTop': target.offset().top - 19}, 200); 
		}
	});

	//close faq lateral panel - mobile only
	$('body').bind('click touchstart', function(event){
		if( $(event.target).is('body.overlay') || $(event.target).is('.close-panel')) { 
			closePanel();
		}
	});
	faqsContainer.on('swiperight', function(event){
		closePanel();
	});

	//show faq content clicking on faqTrigger
	faqTrigger.on('click', function(event){
		event.preventDefault();
		$(this).next('.faq-content').slideToggle(200).end().parent('li').toggleClass('content-visible');
	});

	if ( $(window).width() > MqL ) {
		//update category sidebar while scrolling
		$(window).on('scroll', function(){
			(!window.requestAnimationFrame) ? updateCategory() : window.requestAnimationFrame(updateCategory);
		});
	}

	$(window).on('resize', function(){
		if($(window).width() <= MqL) {
			faqsCategoriesContainer.removeClass('is-fixed');
		} else {
			updateCategory();
			$(window).on('scroll', function(){
				(!window.requestAnimationFrame) ? updateCategory() : window.requestAnimationFrame(updateCategory);
			});
		}

		if( faqsCategoriesContainer.hasClass('is-fixed') ) {
			faqsCategoriesContainer.css({
				'left': faqsContainer.offset().left,
			});
		}
	});

	function closePanel() {
		event.preventDefault();
		faqsContainer.removeClass('slide-in').find('li').show();
		closeFaqsContainer.removeClass('move-left');
		$('body').removeClass('overlay');
	}

	function updateCategory(){
		updateCategoryPosition();
		updateSelectedCategory();
	}

	function updateCategoryPosition() {
		var top = $('.faq-main').offset().top,
			margin = 20;
		if( top - margin > $(window).scrollTop()) {
			faqsCategoriesContainer.removeClass('is-fixed').css({
				'left': 0,
				'top': 0,
			});
		} else { 
			var leftValue = faqsCategoriesContainer.offset().left,
				widthValue = faqsCategoriesContainer.width();
			faqsCategoriesContainer.addClass('is-fixed').css({
				'left': leftValue,
				'top': margin,
			});
		}
	}

	function updateSelectedCategory() {
		faqsSections.each(function(){
			var actual = $(this),
				margin = parseInt($('.faq-title').eq(1).css('marginTop').replace('px', '')),
				activeCategory = $('.faq-categories a[href="#'+actual.attr('id')+'"]'),
				topSection = (activeCategory.parent('li').is(':first-child')) ? 0 : Math.round(actual.offset().top);
			
			if ( ( topSection - 20 <= $(window).scrollTop() ) && ( Math.round(actual.offset().top) + actual.height() + margin - 20 > $(window).scrollTop() ) ) {
				activeCategory.addClass('selected');
			}else {
				activeCategory.removeClass('selected');
			}
		});
	}
});