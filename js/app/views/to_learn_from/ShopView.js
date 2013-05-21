(function (views) {

	views.ShopView = Backbone.View.extend({
		id: 'pageContainer',
		events: {
			//'click #productsLink': 'goToProductsPage'
		},
						
		template : _.template(
				  	'<div class="navbar navbar-fixed-top">' +
						'<div class="navbar-inner">' +
							'<div class="container">' +
								'<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">' +
									'<span class="icon-bar"></span>' +
									'<span class="icon-bar"></span>' +
									'<span class="icon-bar"></span>' +
								'</a>' +
								'<a class="brand" href="index.php">MarketPlaceGH CMS</a>' +
								
								'<div class="nav-collapse">' +
									'<ul class="nav">' +
									  '<li><a href="#" id="homeLink">Home</a></li>' +
									  '<li><a href="#products" id="productsLink">Products</a></li>' +
									  '<li class="active"><a href="#shop" id="storeLink">My Store</a></li>' +
									'</ul>' +

									'<ul class="nav pull-right">' +
										'<li> <a href="../site/"><i class="icon-home icon-white"></i> </a> </li>' +
										'<li class="divider-vertical"></li>' +
										'<li id="fat-menu" class="dropdown">' +
											'<a href="#" class="dropdown-toggle" data-toggle="dropdown">' +
												'</i> Drew Barnes <b class="caret"></b>' +
											'</a>' +
											'<ul class="dropdown-menu">' +
												'<li>' +
												   '<a href="#" data-toggle="modal" data-target="#userProfile">' +
													 '<i class="icon-user"></i> Profile' +
												   '</a>' +
												'</li>' +
												'<li><a href="#" data-toggle="modal" data-target="#userPreferences">' +
													 '<i class="icon-cog"></i> Preferences</a>' +
												'</li>' +
												'<li class="divider"></li>' +
												'<li><a href="#"><i class="icon-off"></i> Logout</a></li>' +
											'</ul>' +
										'</li>' +
									'</ul>' +

									'<form class="navbar-search pull-right">' +
									  '<input id="search-bar" type="text" placeHolder="Search" class="search-query span2">' +
									'</form>' +
								'</div><!--/.nav-collapse -->' +
							'</div>' +
						'</div>' +
					'</div>' +
					
					'<div class="container">' +
						'<div class="row">' +
		    				'<div class="span2">' +
		      					'<!--Sidebar content-->' +
		      	 				'Test Content' +
		    				'</div>' +
		   	 				'<div class="span10">' +
		      					'<!--Body content-->' +
								'<h1>Bootstrap starter template</h1>' +
								'<p>Use this document as a way to quick start any new project.<br> All you get is this message and a barebones HTML document.</p>' +
		    				'</div>' +		   
						'</div>' +
		
						'<div class="row">' +
							'<div class="span12">' +
		      					'<!--Footer content-->' +
		      					'<div class="row">' +		        
		         					'<div class="span8">' +		           
								   		'<ul class="nav nav-pills">' +
											'<li><a href="javascript:;">Advertise</a></li>' +
											'<li><a href="javascript:;">Contact Us</a></li>' +
											'<li><a href="javascript:;">About Us</a></li>' +
								   		'</ul>' +		           
		         					'</div>' +
	             
									'<div class="span4">' +
									   '<p id="CR" style="text-align:right;"></p>' +
									'</div>' +			  
			  					'</div>' +		    
		    				'</div>' +		
		  				'</div>' +		       				
			
				   	'</div> <!-- /container -->'
				   ),
		
		initialize : function() {		
		},
	
		render: function() { 			
			$(this.el).html(this.template);
			
			return this;
		},
		
		goToProductsPage: function(e){
			e.preventDefault();
			MarketPlaceGH.App.navigate('products', true);
		}
	});

})(MarketPlaceGH.views);
