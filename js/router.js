define(['jquery', 
		 'underscore', 
		 'backbone',
		 'domReady!', 
		 'app/views/HomeView',
		 'app/collections/BooksCollection'], function($, _ , Backbone, 
												 			 DomReady,
															 HomeView,
															 BooksCollection){


		 var AppMainRouter = Backbone.Router.extend({

				routes:{
					'' 	    : 'home',
					'about' : 'about'
				},

				initialize: function(){									
					this.homeView = new HomeView();
					
					var books = new BooksCollection();
					
					books.fetch();
					
					console.log(books.toJSON());
					
				},

				home: function(){
					$('#alembic').empty();
					$('#alembic').html(this.homeView.render().el);
				},
				
				about: function(){
					$('#alembic').text("About");
				}


		 });

		 var initialize = function(){
				
		  		var appMainRouter = new AppMainRouter();
		
				Backbone.history.start();	
				
		 };

		return {
			initialize: initialize
		};

});
