define([
	  'jquery',
	  'underscore',
	  'backbone',
	  'app/views/BookView',
	  'text!app/templates/homeView-tpl.html',
	  'bootstrap-modal'], function($, _, Backbone, BookView, homeViewTemplate){
	
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
			
			$books = this.$("#catalog ul");
	
			this.collection.each(function(book){
				
				var bookView = new BookView({
					model: book,
					collection: this.collection
				});
				
				$books.append(bookView.render().el);
				
				console.log("book title: "+ book.get("title") + " id: " + book.get("_id") );
			});

			return this;
		},
		
  });

  // Our module now returns our view
  return HomeView;

});
