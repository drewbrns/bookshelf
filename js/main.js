require.config({
	
	//enforceDefine: true,
	
	//in production mode, replace local copies with CDN versions.
	//waitSeconds: 30,
	
	paths:{
		'jquery'     : 'lib/jquery-1.9.1.min',
		'underscore' : 'lib/underscore-min',
		'backbone'   : 'lib/backbone-min',
		'bootstrap-transition':'lib/bootstrap/js/bootstrap-transition',
		'bootstrap-alert'     :'lib/bootstrap/js/bootstrap-alert',
		'bootstrap-modal'     :'lib/bootstrap/js/bootstrap-modal',
		'bootstrap-dropdown'  :'lib/bootstrap/js/bootstrap-dropdown',
		'bootstrap-tab'       :'lib/bootstrap/js/bootstrap-tab',
		'bootstrap-tooltip'   :'lib/bootstrap/js/bootstrap-tooltip',
		'bootstrap-popover'   :'lib/bootstrap/js/bootstrap-popover',
		'bootstrap-button'    :'lib/bootstrap/js/bootstrap-button',
		'bootstrap-typeahead' :'lib/bootstrap/js/bootstrap-typeahead'												
	},
	
	shim:{
		"underscore": {
			deps : [],
			exports : "_"
		},
		
		"backbone": {
			deps : ["jquery", "underscore"],
			exports : "Backbone"
		},
		
		"bootstrap-transition":["jquery"],
		"bootstrap-alert":["jquery"],
		"bootstrap-modal":["jquery"],
		"bootstrap-dropdown":["jquery"],
		"bootstrap-tab":["jquery"],
		"bootstrap-tooltip":["jquery"],	
		"bootstrap-popover":["jquery","bootstrap-tooltip"],
		"bootstrap-button":["jquery"],	
		"bootstrap-typeahead":["jquery"],		 
	}
	
});

require(['app'], function(App){

	App.initialize();
	
});