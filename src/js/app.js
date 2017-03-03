// Your code goes here

$(function () {
	
	// whenever hashchange occurs, call render with new hash to navigate to correct page
	$(window).on('hashchange', function(){
		render(decodeURI(window.location.hash));
	});

	function renderSplashPage(){
		var page=$('#splashPage');
		page.removeClass('hidden');
		setTimeout(function(){window.location.hash = 'home';}, 5000);
	}

	function renderHomePage(){
		var page = $('#homePage');
		page.removeClass('hidden');
	}

	function renderParametersPage(){
		var page = $('#parametersPage');
		page.removeClass('hidden');
	}

	function renderNavigationPage(){
		var page = $('#navigationPage');
		page.removeClass('hidden');
	}

	function renderErrorPage(){
		var page = $('#errorPage');
		page.removeClass('hidden');
	}

	function render(url) {

		var hash = url.split('/')[0];
		// hide current page
		$('#main .page').addClass('hidden');

		var map = {
			// default, render home page
			'' : function(){
				renderSplashPage();
			},
			'#parameters' : function(){
				renderParametersPage();
			},
			'#navigation' : function(){
				renderNavigationPage();
			},
			'#home' : function(){
				renderHomePage(); 
			}
		};

		if (map[hash]){
			map[hash]();
		}
		else {
			renderErrorPage();
		}
	}

	// activate navigation buttons
	$('#setParameters').on('click', function(event){
		window.location.hash = 'parameters';
	});
	$('#startNavigation').on('click', function(event){
		window.location.hash = 'navigation';
	});
	$('#returnHome').on('click', function(event){
		window.location.hash = 'home';
	});

	$(window).trigger('hashchange');


});
