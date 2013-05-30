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
	
		   this.collection.fetch({ reset:true});
		
		},
	
		render: function() { 	
								
			$(this.el).html(this.template);
			
			this.collection.comparator = function(book){
				
				return book.get("_id");
			}
			
			this.collection.each(function(book){
				console.log("book title: "+ book.get("title") + " id: " + book.get("_id") );
			});
			
			if (this.collection.at(0)){
				console.log(this.collection.at(0).get("title"));			
		  	}
			
			return this;
		},
		
  });

  // Our module now returns our view
  return HomeView;

});
