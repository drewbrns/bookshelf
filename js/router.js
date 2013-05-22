define(['jquery', 
		 'underscore', 
		 'backbone',
		 'domReady!', 
		 'app/views/HomeView',
		 'app/views/ProductView'], function($, _ , Backbone, 
												   DomReady,
												   HomeView, 
												   ProductView){


		 var AppMainRouter = Backbone.Router.extend({

				routes:{
					'' 	      : 'home'
				},

				initialize: function(){										
					
					this.homeView = new HomeView();

				},

				home: function(){
					  $('#alembic').empty();
					  $('#alembic').html(this.homeView.render().el);
				},


		 });

		 var initialize = function(){
				
		  		var appMainRouter = new AppMainRouter();
		
				Backbone.history.start();	
				
		 };

		return {
			initialize: initialize
		};

});
