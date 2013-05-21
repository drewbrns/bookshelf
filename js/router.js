define(['jquery', 
		 'underscore', 
		 'backbone',
		 'domReady!',
		 //'app/models/ProductModel', 
		 //'app/collections/ProductsCollection', 
		 'app/views/HomeView',
		 'app/views/ProductView'], function($, _ , Backbone, 
												   Router, /*ProductModel, ProductCollection,*/ 
												   HomeView, 
												   ProductView){


		 var AppMainRouter = Backbone.Router.extend({

				routes:{
					'' 	      : 'home',
					'explore' : 'explore',
					'brands'  : 'brands',
					'about'	  : 'about',
					'product' :	'product',
					'brand'	  : 'brand'
				},

				initialize: function(){										
					
					this.homeView = new HomeView();
					this.productView = new ProductView();

				},

				home: function(){
					  $('#alembic').empty();
					  $('#alembic').html(this.homeView.render().el);
				},

				//explore: function(){
				//	  $('#alembic').empty();
				//	  $('#alembic').text('Explore Products on Mall Riot');					
				//}, 

				brands: function(){
					  $('#alembic').empty();
					  $('#alembic').text('Browse All Brands');					
				}, 

				about: function(){
					  $('#alembic').empty();
					  $('#alembic').text('About Mall Riot');					
				},

				product: function(){
					  $('#alembic').empty();
					  $('#alembic').html(this.productView.render().el);	
				},

				brand: function(){
					  $('#alembic').empty();
					  $('#alembic').text('Specific Mall Riot Brand.');
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
