define(['jquery', 
		 'underscore', 
		 'backbone',
		 'domReady!', 
		 'app/views/HomeView'], function($, _ , Backbone, 
												   DomReady,
												   HomeView){


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
