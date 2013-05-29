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
			
		   this.collection.bind("reset", this.render);
	
		   this.collection.fetch({
				success : function(collection, response, options){
					console.log('gud, all worked fine.');					
				}, error: function(){
					console.log('it didn\'t work.');
				}, reset: true
			
		   });
		
		},
	
		render: function() { 	
								
			$(this.el).html(this.template);
			
			this.collection.each(function(book){
				console.log("book title: "+ book.get("title") + " id: " + book.get("_id") );
			});
			
			return this;
		},
		
  });

  // Our module now returns our view
  return HomeView;

});
