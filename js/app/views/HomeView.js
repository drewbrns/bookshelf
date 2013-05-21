define([
	  'jquery',
	  'underscore',
	  'backbone',	 
	  'text!app/templates/homeView-tpl.html',
	  'bootstrap-modal'], function($, _, Backbone, homeViewTemplate){
	
  var HomeView = Backbone.View.extend({
    
		events: {

		},
							
		template : _.template(homeViewTemplate), 
	
		initialize : function() {		
		   _.bindAll(this, 'render');	
		},
	
		render: function() { 	
								
			$(this.el).html(this.template);
			
			return this;
		},
		
  });

  // Our module now returns our view
  return HomeView;

});
