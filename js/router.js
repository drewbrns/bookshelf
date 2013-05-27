define(['jquery', 
		 'underscore', 
		 'backbone',
		 'domReady!', 
		 'app/views/HomeView',
		 'app/collections/BooksCollection',
		 'app/models/BookModel'], function($, _ , Backbone, 
   									 			  DomReady,
												  HomeView,
												  BooksCollection,
												  BookModel){


		 var AppMainRouter = Backbone.Router.extend({

				routes:{
					'' 	    : 'home',
					'about' : 'about'
				},

				initialize: function(){									
					
					this.homeView = new HomeView({
						collection : new BooksCollection(),
						model	   : new BookModel()
					});
					
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
