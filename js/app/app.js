//Top-level namespaces for our code

(function(){

	window.MallRiot = {};
	MallRiot.collections = {};
	MallRiot.models = {};
	MallRiot.views  = {};
	MallRiot.mixins = {};
	MallRiot.validation = {};
	MallRiot.recycleAll = 0;
	MallRiot.changePublished = 0;

	// Defer initialization until doc ready.
	$(function(){   
		  		
			$.ajaxSetup({
				cache: false
			});
			

			

			

			MallRiot.main = Backbone.Router.extend({
				
				routes:{
					'' 			: 	'home',
					'explore'	:   'explore',
					'brands'	:   'brands',
					'about'		:   'about',
					'product'	:	'product',
					'brand'	: 	'brand'
				},

				initialize: function(){
								
					//Models
					//MallRiot.models.product = new MallRiot.models.Product();

					//MallRiot.models.cart = new MallRiot.models.Cart();

					//Collections
					//MallRiot.collections.products = new MallRiot.collections.Products();								
					//MallRiot.collections.carts = new MallRiot.collections.Carts();										
					
					this.homeView = new MallRiot.views.HomeView({

					});
					
					//this.productView = new MallRiot.views.ProductView({
						
					//});
					
					
					
					
					//this.productview = new MallRiot.views.ProductView({
					//	collection: MallRiot.collections.products
					//});
					
					//this.shopview = new MallRiot.views.ShopView();

					//MallRiot.views.cartView = new MallRiot.views.cartView({
					//	model: MallRiot.models.cart,
					//	collection: MallRiot.collections.cart
					//});
								
				},
				
				home: function(){
					  $('#alembic').empty();
					  $('#alembic').html(this.homeView.render().el);

				},
				
				explore: function(){
					  $('#alembic').empty();
					  $('#alembic').text('Explore Products on Mall Riot');					
				}, 
				
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
					  $('#alembic').text(this.productView.render().el);					
					//$('#pageContainer').remove();
					//MallRiot.collections.products.fetch();
					//MallRiot.collections.cart.fetch();
					//RCHads.collections.propertyFeatures.fetch();
					//$('#pageContent').empty();
					//$('#rBinTargetModal').after(this.productsview.render().el);
				
				},
				
				brand: function(){
					  $('#alembic').empty();
					  $('#alembic').text('Specific Mall Riot Brand.');					
					//$('#pageContainer').remove();
					//$('#rBinTargetModal').after(this.shopview.render().el);
					//$('#CR').html( $('#copyright').html() );
				}

			});

			MallRiot.App = new MallRiot.main();
			Backbone.history.start();
		
	});

})();

