(function(e){var t="click.scrolly";e.fn.scrolly=function(r,i){var s=e(this);return r||(r=1e3),i||(i=0),s.off(t).on(t,function(t){var n,s,o,u=e(this),a=u.attr("href");a.charAt(0)=="#"&&a.length>1&&(n=e(a)).length>0&&(s=n.offset().top,u.hasClass("scrolly-centered")?o=s-(e(window).height()-n.outerHeight())/2:(o=Math.max(s,0),i&&(typeof i=="function"?o-=i():o-=i)),t.preventDefault(),e("body,html").stop().animate({scrollTop:o},r,"swing"))}),s}})(jQuery);

'use strict'

class Main{
	constructor(){
		this.owl = $('#slider').owlCarousel({
		    animateOut: 'fadeOut',
		    animateIn: 'fadeIn',
		    autoplay: true,
		    loop: true,
		    items: 1,
		    margin: 10,
		    autoplaySpeed: 800
	  	}),
	  	this.width = $(window).width()
		this.initNavControls()
		this.sliderController()
		this.testimonials()
		this.inputControls()
		this.navLinks()
		this.bodylinks()
		this.formSubmit()
		var wow = new WOW({
		    mobile: false
		})
		wow.init()
	}

	bodylinks() {
		$('[class*="bak-"]').on('click', () => {
			this.goto('#contactame')
		})

		$('.text-cont > p').on('click', () => {
			this.goto('#contactame')
		})
	}

	goto(location) {
		console.log(location)
		if(location !== null && location !== ''){
	    	$('html, body').animate({
	      		scrollTop: $(location).offset().top
	    	}, 900)
	  	}
	}

	navLinks() {
		$('.navbar-nav a').click((e) => {
			e.preventDefault()

			let href = $(e.currentTarget).attr('href')
			this.goto(href)
		})
	}

	initNavControls() {
		$('body').scrollspy({ target: '#menu' })

		$('button.navbar-toggler').click((elem) => {
			let selector = $(elem.currentTarget).find('.nav-ibtn')

			if(selector.hasClass('open')){
				selector.removeClass('open')
			} else {
				selector.addClass('open')
			}
		})

		$('.navbar-nav > li > a').on('click', () =>{
		    $('.navbar-collapse').collapse('hide')
		    $('.nav-ibtn').removeClass('open')
		})
	}

	sliderController() {
		this.owl.on('translate.owl.carousel', (event) => {
			this.owl.find('h1').removeClass('animated').hide()
			if(this.width > 767) this.owl.find('p').removeClass('animated').hide()
		})

		this.owl.on('translated.owl.carousel', (event) => {
		    this.owl.find('h1').addClass('animated flipInX').show()
		    if(this.width > 767) this.owl.find('p').addClass('animated fadeInUp').show()
		})
	}

	windowResize(){
		$(window).on('resize scroll', () => {
			this.width = $(window).width()
		})
	}

	testimonials() {
		$('#clients').owlCarousel({
		    animateOut: 'slideOutDown',
		    animateIn: 'zoomIn',
		    autoplay: true,
		    loop: true,
		    items: 1,
		    margin: 30,
		    stagePadding: 30,
		    smartSpeed: 500
	  	})
	}

	inputControls(){
		$('.form-control').focus(function(){
			$(this).parent('.form-group').addClass('focused')
		})

		$('.form-control').focusout(function(){
			$(this).parent('.form-group').removeClass('focused')
		})
	}

	validateInputs(inputs_form){
	    return document.querySelector(inputs_form).checkValidity()
	}

	formSubmit() {
		$('#contactForm').submit((e) => {
			e.preventDefault()

			let form = `#${$(e.currentTarget).attr('id')}`
			if(this.validateInputs(form)){
		        let form   = $('#contactForm'),
					footer = form.find('.form-footer')

				footer.find('[type="submit"]').removeClass('flipInY').html('Enviando...').prop('disabled', true)

				setTimeout(function(){
					footer.find('[type="submit"]').hide()
					footer.append('<p class="send-success fadeInUp animated"><i class="fas fa-check-circle"></i> ¡Su mensaje ha sido enviado!</p>')
					form[0].reset()

					setTimeout(function(){
						footer.find('.send-success').remove()
						footer.find('[type="submit"]').html('Enviar').addClass('flipInY').prop('disabled', false).show()
					}, 3000)
				}, 3000)
		    }else{
		        var $invalid_fieldset = $(form).find('.input:invalid')
		        $($invalid_fieldset).focus()
		    }
		})
	}
}

$(document).ready(function($) {
	let main = new Main()
})