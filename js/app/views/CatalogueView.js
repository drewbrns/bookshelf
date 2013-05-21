(function (views) {

	views.HomeView = Backbone.View.extend({
		
		id: 'mainContent',
		
		events: {
			//'click #productsLink': 'goToProductsPage'
		},
						
		template : _.template(
				  '<li class="span3">'+
				    '<a href="product.php" class="thumbnail">'+
						'<img src="../resources/Images/Brands/HeelTheWorld/Products/empowerment_beads.jpg"'+
						  'alt="Empowerment Beads" />'+
				    '</a>'+ 
					'<span class="" style="width: 100%;">'+
						'<h4 style="float: left;  margin: 4px;"><img src="../resources/Images/Brands/HeelTheWorld/htw_s.jpg" width="24" height="24" alt="Htw S" /></h4>'+	
						'<h4 style="float:left; background: yellow; margin: 4px; line-height: 24px;"><% productTitle %></h4>'+
						'<h4 style="float:right; text-align: center; margin: 4px; line-height:24px;"><% price %></h4>'+
					'</span>'+
				  '</li>'
		),
		
		initialize : function() {		
		   _.bindAll(this, 'render');	
		},
	
		render: function() { 	
			
			var collection = this.collection;
			
			collection.each(function(product){
				
				var productView = Backbone.View.extend({
					
					template: this.template()
					
					model : product,
					collection : collection
				});				
				
				$("mainContent").append(productView.render().el);
			});
			

		/////////////////////////////////////////////////////////////////	
			var renderedContent = this.template(this.collection.models);
		
			$(this.el).html(renderedContent);
					
			//$(this.el).html(this.template);
			
			return this;
		},
		
		goToProductsPage: function(e){
			e.preventDefault();
			//MallRiot.App.navigate('products', true);
		}
	});

})(MallRiot.views);
