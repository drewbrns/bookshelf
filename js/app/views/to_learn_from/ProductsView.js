(function (views, validation) {

	views.ProductsView = Backbone.View.extend({
		id: 'pageContainer',
		events: {
			'click #add' : 'showAddProductForm',
			'click #saveProperty' : 'saveProperty',
			'click #add-next-image-btn' : 'addPropertyImage',
			'click #remove-this-image-btn' : 'removePropertyImage',
			'change #addPropertyForm input[type="file"]' : 'addFormSelectedImageBtn',			
			'change #category': 'propertyTypesForm',
			'click #optionsRent' : 'propertyForRent',
			'click #optionsSale' : 'propertyForSale',
			'change #title' : 'titleValidation',			
			'change #descriptionTextArea' : 'descriptionValidation',
			'change #featuresTextArea' : 'featuresValidation',
			'change #noofrooms' : 'roomsValidation',
			'change #noofbaths' : 'bathsValidation',
			'change #property-location' : 'locationValidation',
			'change #appendedPrependedInput' : 'priceValidation',
			'click  #image1' : 'firstImageValidation',
			'change #image1' : 'firstImageValidation',
			'click #addOtherFeature': 'addOtherFeature',
			'keyup #descriptionTextArea': 'countDescriptionChar',
			'keypress #addOtherFeatureText': 'addOtherFeatureEnter',
			'hidden' : 'closeModalForm',
			
			//Recycle Bin Events
			//'click .bin-options a:first-child' : 'viewRecycleBin',
			'click #restoreAll' : 'restoreAllProperties',
			//'click #pemDel' : 'emptyRecyleBin',
			//'click #recycleAll' : 'recycleAllProperties',
			
			//Edit Form Events
			'change #editPropertyForm input[type="file"]' : 'editFormSelectedImageBtn',
			'click #editExistingProperty' : 'editProperty'
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
								'<a class="brand" href="index.php">Marketplace CMS</a>' +
								
								'<div class="nav-collapse">' +
									'<ul class="nav">' +
									  '<li><a href="#">Home</a></li>' +
									  '<li class="active" ><a href="#products">Products</a></li>' +
									  '<li><a href="#shop">My Store</a></li>' +
									'</ul>' +

									'<ul class="nav pull-right">' +
										'<li> <a href="../site/"><i class="icon-home icon-white"></i> </a> </li>' +
										'<li class="divider-vertical"></li>' +
										'<li id="fat-menu" class="dropdown">' +
											'<a href="#" class="dropdown-toggle" data-toggle="dropdown">' +
												'</i> Sarah Christian <b class="caret"></b>' +
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

						'<div id="pageContent">' +
							'<div class="row">' +
								'<div class="span12" style="position:relative;">' +
									'<div class="page-header">' +
										'<h1>Products</h1>' +
	
										'<!-- RecycleBin - Option 3 -->' +
										'<div id="trash-container" class="trash-container well" droppable="true" style="margin: 0; padding:0;">'+
											'<h3 style="padding-left:5px;">Recycle Bin</h3>'+
											'<p style="padding-left:10px;">Items: <span id="recycleBin-item-count"></span></p>'+
		
											'<div class="bin-options">'+
												'<a href="#" data-toggle="modal" data-target="#recycleBinModal" ><b>View</b> </a> /'+
												'<a id="pemDelProds" href="#" data-toggle="modal" data-target="#permanentlyDeleteProducts"> <b style="color:#ee5f5b;">Empty</b></a>'+
											'</div>'+
	
											'<div class="custom-icon-trash pull-right"></div>'+
										'</div>'+
									'</div>' +
								'</div>' +
	
								'<div class="span10" style="padding-bottom:5px;">' +
									'Active Products. Published products are seen by the public. To disable a product from public view, unpublish it...' +				
						 //'Properties listed here are seen by the public. To disable a property from public view, click on recycle.' +
								'</div>' +
	
								'<div class="span2" style="padding-bottom:5px;">' +
									'<div class="btn-group pull-right">' +
										'<div id="add" class="btn btn-success" data-toggle="modal" data-target="#addProduct">Add Product</div>' +
										'<div class="btn" data-toggle="modal" data-target="#recycleAllProperties"><i class="icon-trash"></i></div>' +
									'</div>' +
								'</div>' +
	
								'<div class="span12" style="">' +		 
	
									'<div id="properties">' +
	
										'<ul class="thumbnails"></ul>' +
	
										'<div class="row">' +							
											'<div class="pagination pagination-right">' +								
																	
											'</div>' +									
										'</div>' +
	
									'<div> <!-- #properties -->' +
	
								'</div>' +
							'<div>' +
	        			'</div>' +
	
	       				'<!--Footer -->' +
	  					'<div class="row">' +	    
                			'<div class="span6">' +
								'<ul class="nav nav-pills">' +
								   	'<li><a href="javascript:;">Advertise</a></li>' +
									'<li><a href="javascript:;">Contact Us</a></li>' +
									'<li><a href="javascript:;">About Us</a></li>' +
								'</ul>' +
                			'</div>' +

							'<div id="CR" class="span6" style="padding-top:7px; text-align:right;">' +
							'</div>' +
					
						'</div> <!-- //end row::Footer -->' +
			
				   	'</div> <!-- /container -->' +

				   
				   	'<div id="target_modals">' +
						'<!-- Modal Forms Go Here -->' +
				   	'</div>' +
				   
				   	'<!--Modals-->' +				   
				   
				   	'<!-- Restore All Properties -->' +
				   	'<div class="modal hide fade" id="restoreAllProperties">' +
						'<div class="modal-header">' +
							'<a class="close" data-dismiss="modal">&times;</a>' +
							'<h3>Restore All Properties</h3>' +
						'</div>' +
						'<div class="modal-body">' +
							'<center>Are you sure you want to restore all the properties in the recycle bin?</center>' +
						'</div>' +
						'<div class="modal-footer">' +
							'<div class="btn" data-dismiss="modal"> Cancel </div>' +
							'<div class="btn btn-success" id="restoreAll">Restore</div>' +
						'</div>' +
				   	'</div>' +				   
				   
				   	'<!-- Permanently Delete All Properties -->' +
				   	'<div class="modal hide fade" id="permanentlyDeleteProducts">' +
				   		'<div class="modal-header">' +
							'<a class="close" data-dismiss="modal">&times;</a>' +
							'<h3>Permanently Delete Properties</h3>' +
						'</div>' +
						'<div class="modal-body">' +
							'<center>All Properties in the recycle bin would be lost forever, do you wish to continue?</center>' +
						'</div>' +
						'<div class="modal-footer">' +
							'<div class="btn" data-dismiss="modal">Cancel</div>' +
							'<div id="pemDel" class="btn btn-danger">Delete</div>' +
						'</div>' +
				   	'</div>' +
				   
				   	'<!-- Recycle All Properties -->' +
				   	'<div class="modal hide fade" id="recycleAllProperties">' +
				   		'<div class="modal-header">' +
							'<a class="close" data-dismiss="modal">&times;</a>' +
							'<h3>Recycle All Properties</h3>' +
						'</div>' +
						'<div class="modal-body">' +
							'<center>Are you sure want to send all properties to the recycle bin?</center>' +
						'</div>' +
						'<div class="modal-footer">' +
							'<div class="btn" data-dismiss="modal">Cancel</div>' +
							'<div class="btn btn-success" id="recycleAll">Recycle</div>' +
						'</div>' +
				   	'</div>'
				   ),
		
		addProductFormTemplate: _.template(
									'<div id="addProduct" class="modal hide fade">'+
										'<div class="modal-header">'+
											'<div type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</div>'+
											'<h3>Add Product</h3>'+
									  	'</div>'+
									  	
										'<div class="modal-body">'+
		
											'<form id="addProductForm" name="addProductForm" class="" method="post" enctype="multipart/form-data">'+
			
												'<div class="top-half" style="background:none; margin:0; width:520px; float:left; border-bottom:1px solid #ddd;">'+
				
													'<div class="left-half" style="float:left; width: 342px; height:195px;">'+
				
														'<div id="titleContainer" class="control-group">'+
															'<label class="control-label" for="title">Name Your Product</label>'+
															'<div class="controls">'+
																'<input style="width:330px;" type="text" id="title" class="" maxlength="40" placeholder="eg. Some Product" />'+
															'</div>'+
														'</div>'+
												
														'<div id="categoryContainer" class="control-group" style="float:left; width:100%;">'+
															'<label class="control-label">Select Your Property Type</label>'+
															'<select id="category" name="category" class="controls input-medium">'+
																'<option value="" selected="selected">Please Select</option>'+															
															'</select>'+
														'</div>'+
					
													'</div>'+
				
													'<div class="right-half" style="float:right; width: 170px;">'+												
														'<ul class="thumbnails" style="margin-bottom:0">'+
															'<li class="span2" style="position: relative;" >'+
																'<a href="#" class="thumbnail">'+
																	'<img src="../resources/images/RCHads-h185.jpg" alt="" width="162" height="115" />'+
																'</a>'+
															'</li>'+
														'</ul>'+
													'</div>'+
				
												'</div>'+
			
												'<div class="bottom-half" style="background:none; margin-top:15px; width:520px; float:left;">'+											
													'<ul class="nav nav-tabs" id="myTab">'+
														'<li class="active"><a href="#details" data-toggle="tab">Details</a></li>'+
														'<li><a href="#features" data-toggle="tab">Features</a></li>'+
														'<li><a href="#imgs" data-toggle="tab">Images</a></li>'+
													'</ul>'+
	
													'<div class="tab-content" style="padding:5px;">'+
													 
														'<div class="tab-pane active" id="details">'+
	
															'<div id="priceContainer" class="control-group rchads-add-form-bottom-margin">'+														
																'<label class="control-label" for="currency" style="float:left; width:100%;">Price</label>'+
																'<div class="controls form-inline">'+
																	'<div class="input-prepend">'+
																		'<select id="currency" name="currency" class="add-on" style="height:25px;padding:1px;text-align:left;">'+
																			'<option value="$">$</option>'+
																			'<option value="GH&cent;">GH&cent;</option>'+
																			'<option value="&euro;">&euro;</option>'+
																			'<option value="&pound;">&pound;</option>'+
																		'</select>'+
																		
																		'<input class="span2 price-Id" id="appendedPrependedInput"style="margin-left:4px; width:140px;" />'+
																		
																		'<select id="pricePhrase" name="pricePhrase" class="add-on" style="height:25px;padding:1px;text-align:left;margin-left:3px;">'+
																			'<option value="per month">per month</option>'+
																			'<option value="per sq. meter">per square meter</option>'+
																			'<option value="per semester">per semester</option>'+
																			'<option value="per year">per year</option>'+
																			'<option value="">n/a</option>'+
																		'</select>'+
																	'</div>'+
																	'<label class="checkbox" style="padding-left:5px;">'+
																		'<input type="checkbox" id="priceFlexibility" checked="checked">Negotiable'+
																	'</label>'+
																'</div>'+
															'</div>'+
	
															'<div id="descriptionContainer" class="control-group rchads-add-form-bottom-margin">'+
																'<label class="control-label" for="descriptionTextArea" style="">Describe Your Product<span id="descCount" class="descCharCount" style="font-size:1em; padding-right: 45px; text-align:right; font-size:12px; ">200</span>'+
																'</label>'+
																'<div class="controls">'+
																  '<textarea id="descriptionTextArea" class="span5" style="height:75px;" maxlength="200"></textarea>'+
																'</div>'+
															'</div>'+
						
														'</div>'+
													  
														'<div class="tab-pane" id="features">'+
							
															'<div id="featuresContainer" class="featuresContainer control-group" style="margin:0 auto; width:350px; height:100%; margin-bottom:0;">'+
																'<label class="control-label">What Does Your Property Feature? <small style="font-size: 0.85em;">please tick.</small>'+
																'</label>'+
																'<div class="controls">'+
																	'<table id="features-table" class="table table-striped table-bordered">'+
																						 
																	'</table>'+
																'</div>' +'<!-- end .inner-->'+
							
																'<div class="controls">'+
																	'<div class="addFeature input-append">'+
																		'<input class="span5" id="addOtherFeatureText" type="text" placeHolder="Add Other Feature" size="16" style="width:310px;"/><button id="addOtherFeature" class="btn" type="button" style="">+</button>'+
																	'</div>'+
																'</div>'+
															'</div>'+
														
														'</div>'+
					
														'<div class="tab-pane" id="imgs">'+
															'<ul class="thumbnails property-images" style="margin-bottom:0">'+
																'<li class="span2" style="position: relative; width:150px;" >'+
																	'<a href="#" class="thumbnail">'+
																		'<img src="../resources/images/RCHads-h185.jpg" alt="" width="142" height="101" />'+
																	'</a>'+
																	'<input type="text" class="span2" id="captionForImage1"  name="captionForImage1" placeholder="Caption"  style="width:140px;text-align:center" />'+
																'</li>'+
							
																'<li class="span2" style="position: relative; width:150px;" >'+
																	'<a href="#" class="thumbnail">'+
																		'<img src="../resources/images/RCHads-h185.jpg" alt="" width="142" height="101" />'+
																	'</a>'+
																	'<input type="text" class="span2" id="captionForImage2"  name="captionForImage2" placeholder="Caption"  style="width:140px;text-align:center" />'+
																'</li>'+
							
																'<li class="span2" style="position: relative; width:150px;" >'+
																	'<a href="#" class="thumbnail">'+
																		'<img src="../resources/images/RCHads-h185.jpg" alt="" width="142" height="101" />'+
																	'</a>'+
																	'<input type="text" class="span2" id="captionForImage3"  name="captionForImage3" placeholder="Caption"  style="width:140px;text-align:center" />'+
																'</li>'+
							
																'<li class="span2" style="position: relative; width:150px;" >'+
																	'<a href="#" class="thumbnail">'+
																		'<img src="../resources/images/RCHads-h185.jpg" alt="" width="142" height="101" />'+
																	'</a>'+
																	'<input type="text" class="span2" id="captionForImage4"  name="captionForImage4" placeholder="Caption"  style="width:140px;text-align:center" />'+
																'</li>'+
							
																'<li class="span2" style="position: relative; width:150px;" >'+
																	'<a href="#" class="thumbnail">'+
																		'<img src="../resources/images/RCHads-h185.jpg" alt="" width="142" height="101" />'+
																	'</a>'+
																	'<input type="text" class="span2" id="captionForImage5"  name="captionForImage5" placeholder="Caption"  style="width:140px;text-align:center" />'+
																'</li>'+
							
																'<li class="span2" style="position: relative; width:150px;" >'+
																	'<a href="#" class="thumbnail">'+
																		'<img src="../resources/images/RCHads-h185.jpg" alt="" width="142" height="101" />'+
																	'</a>'+
																	'<input type="text" class="span2" id="captionForImage6"  name="captionForImage6" placeholder="Caption"  style="width:140px;text-align:center" />'+
																'</li>'+					
															'</ul>'+					  	
														'</div>'+
					
													'</div>'+			
												'</div>'+										
												'<br class="clear" />'+
			
											'</form>'+
		
	  									'</div>'+
	  
	  
	  									'<div class="modal-footer">'+		
											'<div class="" style="width:150px; float:left; margin-left:-40px; margin-top:5px;">'+
		 										'<label><input type="checkbox" name="publish" id="publish" style="margin-top:-2px;" checked="checked" /> Publish Product</label>'+
											'</div>'+		
											'<div class="btn" data-dismiss="modal">Discard Product</div>'+
											'<div id="saveProduct" class="btn btn-success">Save Product</div>'+											
										'</div>'+
									'</div>'
								 ),
								
		recycleBinTemplate: _.template(
						    	'<div class="modal hide fade" id="recycleBinModal">'+
							   		'<div class="modal-header">' +
							   			'<a class="close" data-dismiss="modal">&times;</a>' +
										'<h3>' +
											'<img style="margin-top:-5px;" src="../resources/icons/metro/black/trash.png" />' +
											'Recycle Bin <small> </small>' +
										'</h3>' +
							   		'</div>' +
								
							   		'<div class="modal-body">' +
										'<div id="recyleBinBody" style="margin-left:30px; float:left;">' +			
									
										'</div>' +
							   		'</div>' +
								
							   		'<div class="modal-footer">' +
										'<div class="btn" data-dismiss="modal">Close Bin </div>' +
										'<div class="btn btn-success" data-toggle="modal" data-target="#restoreAllProperties" >Restore All </div>' +		
										'<div class="btn btn-danger" data-toggle="modal" data-target="#permanentlyDeleteProducts">Empty Bin </div>' +	
							   		'</div>' +
						    	'</div>'
							),
		
		initialize : function() {
			_.bindAll(this, 'render', 'fetch', 'fetchFirstPage', 'fetchAfterRestoringProperty');
			
			this.collection.bind('reset', this.render);
			this.collection.bind('destroy', this.fetch);
			this.collection.bind('add', this.fetchFirstPage);
			this.collection.bind('change', this.render);
			MarketPlaceGH.models.recycleBinProduct.bind('change:id', this.fetchFirstPage);
			
			window.counter = 2;
		},
				
		nothing: function(){},
	
		render: function() { 
			
			$(this.el).html(this.template);
			
			this.collection.each(function(product) {
				var productView = new MarketPlaceGH.views.ProductView({
					model: product,
					collection: this.collection
				});	
				this.$('#properties > .thumbnails').append(productView.render().el);
			});
			
			var productsPaginationView = new MarketPlaceGH.views.ProductsPaginationView({
				collection: this.collection
			});
			
			this.$('#properties > .row > .pagination').append(productsPaginationView.render().el);
			
			$("#recycleBin-item-count").html(MarketPlaceGH.collections.recycleBinProducts.total);
			
			$('#CR').html( $('#copyright').html() );
			
			this.delegateEvents();
			
			return this;
		},
		
		fetch: function(){
			if( this.collection.page == this.collection.pages ) {
				if( this.collection.total == 1 ) {
					this.collection.fetch();
				} else if( (this.collection.total % this.collection.perPage) == 1 ) {
					this.collection.previousPage();
				} else {
					this.collection.fetch();
				}
			} else {
				this.collection.fetch();
			}
		},
		
		fetchFirstPage: function() {
			if( MarketPlaceGH.recycleAll == 1 ) {
				MarketPlaceGH.collections.recycleBinProducts.fetch();
			}
			this.collection.firstPage();
		},
		
		fetchAfterRestoringProperty: function() {
			this.collection.fetch();
		},
		
		viewRecycleBin: function(e) {
			e.preventDefault();	
			$('#rBinTargetModal').append(this.recycleBinTemplate);
			$('#recyleBinBody').append(MarketPlaceGH.views.recycleBinProductsView.render().el);	
		},
		
		restoreAllProperties: function(e) {
			e.preventDefault();
			MarketPlaceGH.collections.recycleBinProducts.create({"restoreAll": true}, {wait: true});
			$('#restoreAllProperties').modal('hide');
			//$('#recycleBinModal').modal('hide');
		},
		
		emptyRecyleBin: function(e) {
			e.preventDefault();
			MarketPlaceGH.collections.recycleBinProducts.create({"emptyRecycleBin": true}, {wait: true});
			$('#permanentlyDeleteProducts').modal('hide');
		},
		
		recycleAllProperties: function(e) {			
			e.preventDefault();
			this.collection.create({"recycleAllProperties" : true}, {wait: true});
			$('#recycleAllProperties').modal('hide');
			MarketPlaceGH.recycleAll = 1;
		},
		
		showAddProductForm: function(){
				
			//empty target area
			$("#target_modals").empty();		
			
			//inject prepared html there		
			$('#target_modals').html(this.addProductFormTemplate);
			
			var fileInput = $('#target_modals').find('input[type="file"]');
			
			fileInput.css("opacity", 0);
			
			window.counter = 2; //reset counter.
			
			
			//$('#features-table').append(MarketPlaceGH.views.propertyFeaturesView.render().el);

			$('#pricePhrase').hide();
			$('#priceFlexibility').css('margin-left', '4px');			
		},
		
		propertyTypesForm: function(){
			if( $('#category').val() == '' ){
				$('#roomsBaths').hide();
				$('#pricePhrase').hide();				
			} else if( $('#category').val() == 'House' || $('#category').val() == 'Apartment' ){
				$('#roomsBaths').show();
				if( $('#optionsRent').is(':checked') ){
					$('#pricePhrase').show();
					$('#pricePhrase option[value="per month"]').attr('selected', 'selected');
				}
			} else if( $('#category').val() == 'Land' ){
				$('#roomsBaths').hide();
				if( $('#optionsRent').is(':checked') ){
					$('#pricePhrase').show();
					$('#pricePhrase option[value="per year"]').attr('selected', 'selected');
				}
			} else if( $('#category').val() == 'Warehouse' || $('#category').val() == 'Office Space' ){
				$('#roomsBaths').hide();
				if( $('#optionsRent').is(':checked') ){
					$('#pricePhrase').show();
					$('#pricePhrase option[value="per sq. meter"]').attr('selected', 'selected');
				}
			} else if( $('#category').val() == 'Hostel' ){
				if( $('#optionsSale').is(':checked') ){
					$('#roomsBaths').show();
				} else if( $('#optionsRent').is(':checked') ){
					$('#roomsBaths').hide();
					$('#pricePhrase').show();
					$('#pricePhrase option[value="per year"]').attr('selected', 'selected');
				} else{
					$('#roomsBaths').hide();
				}
			}
			validation.categoryValidation();
		},
		
		propertyForRent: function(){			
			if( $('#category option:selected').val() == 'House' || $('#category option:selected').val() == 'Apartment' ){				
				$('#pricePhrase').show();
				$('#pricePhrase option[value="per month"]').attr('selected', 'selected');
			} else if( $('#category option:selected').val() == 'Land' || $('#category option:selected').val() == 'Hostel' ){
				$('#roomsBaths').hide();
				$('#pricePhrase').show();
				$('#pricePhrase option[value="per year"]').attr('selected', 'selected');
			} else if( $('#category option:selected').val() == 'Warehouse' || $('#category option:selected').val() == 'Office Space' ){
				$('#pricePhrase').show();
				$('#pricePhrase option[value="per sq. meter"]').attr('selected', 'selected');
			}
			validation.rent_saleValidation();
		},
		
		propertyForSale: function(){
			$('#pricePhrase').hide();
			if( $('#category option:selected').val() == 'Hostel' ){
				$('#roomsBaths').show();
			}
			validation.rent_saleValidation();
		},
		
		closeModalForm: function(){
			checkedFeatures = [];
		},
		
		addOtherFeature: function(){
			var feature = $("#addOtherFeatureText").val().toLowerCase();
			
			function indexInArray(arr, val){
				for(var i = 0; i < arr.length; i++) if(String(arr[i].feature).toLowerCase() == val) return i;
				return -1;
			} 
			
			if(indexInArray(MarketPlaceGH.collections.propertyFeatures.features['features'], feature)>-1){
				console.log("Yes");
			} else {
				MarketPlaceGH.collections.propertyFeatures.create({"feature" : $("#addOtherFeatureText").val()}, {wait: true});
				/*var table = $("#features-table tbody");
			
				table.append('<tr>'+
				  '<td>'+
					'<label class="checkbox">'+
						'<input type="checkbox" name="feature" id="feature" checked="checked">'+
					'</label>'+
				  '</td>'+
				  '<td>'+ $("#addOtherFeatureText").val() +'</td>'+
				'</tr>');*/
				
				$('#addOtherFeatureText').val('');
			}		
		},
		
		addOtherFeatureEnter: function(e) {
			if( e.keyCode == 13 ) { //Enter Key
				var feature = $("#addOtherFeatureText").val().toLowerCase();
			
				function indexInArray(arr, val){
					for(var i = 0; i < arr.length; i++) if(String(arr[i].feature).toLowerCase() == val) return i;
					return -1;
				} 
				
				if(indexInArray(MarketPlaceGH.collections.propertyFeatures.features['features'], feature)> -1){
					console.log("Yes");
				} else {
					MarketPlaceGH.collections.propertyFeatures.create({"feature" : $("#addOtherFeatureText").val()}, {wait: true});
					$('#addOtherFeatureText').val('');										
				}
			}
		},
		
		countDescriptionChar: function(){
		
			var descVal = $("#descriptionTextArea").val();
			
			$("#descCount").html(200 - descVal.length);
			
		},
		
		addFormSelectedImageBtn: function(e){
			var target = $(e.target);
    		var preview = target.parent().siblings('.thumbnails').find('#preview');
			var imageButtonLabel = target.siblings('#upload-image-button').find('#selected-image-name');
			  
			preview.html('');
			preview.html('<img class="rchads-image-upload-spinner" src="../resources/images/loader_green.gif" alt="Uploading...." width="110" />');
			
			imageButtonLabel.removeClass("rchads-selected-image-name-attached");
			imageButtonLabel.html('Attaching Image...');
							
			$("#addPropertyForm").ajaxForm({
				url: '../data/cms/uploadImages.php',						   
				target: preview,
				success: function(){
					imageButtonLabel.addClass("rchads-selected-image-name-attached");
					imageButtonLabel.html('Image Attached');
					//$('#addPropertyForm input[type="file"]').val('');
				}
			}).submit();					
		},
		
		addPropertyImage: function(){
			MarketPlaceGH.mixins.addPropertyImage(
										   $("#add-images-group"),
			                               $("#add-next-image-btn"),
			                               $("#remove-this-image-btn"),
											6 
			);	
			
			var fileInput = $('#target_modals').find('input[type="file"]');
			
			fileInput.css("opacity", 0);
	
		},
		
		removePropertyImage: function(){
			MarketPlaceGH.mixins.removePropertyImage(
				                           $("#remove-this-image-btn"),
										   $("#add-next-image-btn")
			);
		},
		
		categoryValidation: function(){
			MarketPlaceGH.validation.categoryValidation();
		},
		
		rent_saleValidation: function(){		
			MarketPlaceGH.validation.rent_saleValidation();
		},
		
		titleValidation: function(){		
			MarketPlaceGH.validation.titleValidation();
		},
		
		descriptionValidation: function(){		
			MarketPlaceGH.validation.descriptionValidation();
		},
		
		featuresValidation: function(){		
			MarketPlaceGH.validation.featuresValidation();
		},
		
		roomsValidation: function(){		
			MarketPlaceGH.validation.roomsValidation();
		},
		
		bathsValidation: function(){		
			MarketPlaceGH.validation.bathsValidation();
		},
		
		locationValidation: function(){		
			MarketPlaceGH.validation.locationValidation();
		},
		
		priceValidation: function(){		
			MarketPlaceGH.validation.priceValidation();
		},
		
		firstImageValidation: function(){		
			MarketPlaceGH.validation.firstImageValidation();
			console.log('testing');
		},
		
		saveProperty: function(){			
			MarketPlaceGH.validation.errors = false;
			validation.categoryValidation();
			validation.rent_saleValidation();
			validation.titleValidation();
			validation.descriptionValidation();
			//validation.featuresValidation();			
			if( $('#category option:selected').attr('value') == 'Land' || $('#category option:selected').attr('value') == 'Warehouse' || $('#category option:selected').attr('value') == 'Office Space' || ($('#category option:selected').attr('value') == 'Hostel' && $('#optionsRent').is(':checked')) ) {
				// Do nothing
			} else {
				validation.roomsValidation();
				validation.bathsValidation();
			}
			validation.locationValidation();
			validation.priceValidation();
			if(!MarketPlaceGH.validation.errors){
				if( $('#priceFlexibility').is(':checked') ) {
					var priceFlexibility = "Negotiable";
				} else {
					var priceFlexibility = "Non-Negotiable";
				}
				
				if( $('#publish').is(':checked') ) {
					var published = "Published";
				} else {
					var published = "Unpublished";
				}
				
				if( $('#category option:selected').attr('value') == 'House' || $('#category option:selected').attr('value') == 'Apartment' ) {
					if( $('#optionsRent').is(':checked') ){
						this.collection.create({"house": true, "rent": true, "selectedCategory": $('#addPropertyForm #category option:selected').val(), "rentOrSale": $('#addPropertyForm input[type="radio"]:checked').val(), "title": $('#addPropertyForm #title').val().trim(), "description": $('#addPropertyForm #descriptionTextArea').val().trim(), "features": checkedFeatures.toString(),  "noOfRooms": $('#addPropertyForm #noofrooms option:selected').val(), "noOfBaths": $('#addPropertyForm #noofbaths option:selected').val(), "location": $('#addPropertyForm #property-location').val().trim(), "currency": $('#addPropertyForm #currency option:selected').val(), "price": $('#addPropertyForm #appendedPrependedInput').val().trim(), "pricePhrase": $('#pricePhrase option:selected').val(), "priceFlexibility": priceFlexibility, "published": published, "image1": $('.preview').attr('id')}, {wait: true});
					} else{
						this.collection.create({"house": true, "sale": true, "selectedCategory": $('#addPropertyForm #category option:selected').val(), "rentOrSale": $('#addPropertyForm input[type="radio"]:checked').val(), "title": $('#addPropertyForm #title').val().trim(), "description": $('#addPropertyForm #descriptionTextArea').val().trim(), "features": checkedFeatures.toString(), "noOfRooms": $('#addPropertyForm #noofrooms option:selected').val(), "noOfBaths": $('#addPropertyForm #noofbaths option:selected').val(),  "location": $('#addPropertyForm #property-location').val().trim(), "currency": $('#addPropertyForm #currency option:selected').val(), "price": $('#addPropertyForm #appendedPrependedInput').val().trim(), "pricePhrase": "", "priceFlexibility": priceFlexibility, "published": published, "image1": $('.preview').attr('id')}, {wait: true});
					}	
				} else if( $('#category option:selected').attr('value') == 'Land' ){
					if( $('#optionsRent').is(':checked') ){
						this.collection.create({"land": true, "rent": true, "selectedCategory": $('#addPropertyForm #category option:selected').val(), "rentOrSale": $('#addPropertyForm input[type="radio"]:checked').val(), "title": $('#addPropertyForm #title').val().trim(), "description": $('#addPropertyForm #descriptionTextArea').val().trim(), "features": checkedFeatures.toString(), "location": $('#addPropertyForm #property-location').val().trim(), "currency": $('#addPropertyForm #currency option:selected').val(), "price": $('#addPropertyForm #appendedPrependedInput').val().trim(), "pricePhrase": $('#pricePhrase option:selected').val(),"priceFlexibility": priceFlexibility, "published": published, "image1": $('.preview').attr('id')}, {wait: true});
					} else{
						this.collection.create({"land": true, "sale": true, "selectedCategory": $('#addPropertyForm #category option:selected').val(), "rentOrSale": $('#addPropertyForm input[type="radio"]:checked').val(), "title": $('#addPropertyForm #title').val().trim(), "description": $('#addPropertyForm #descriptionTextArea').val().trim(), "features": checkedFeatures.toString(), "location": $('#addPropertyForm #property-location').val().trim(), "currency": $('#addPropertyForm #currency option:selected').val(), "price": $('#addPropertyForm #appendedPrependedInput').val().trim(), "pricePhrase": "", "priceFlexibility": priceFlexibility, "published": published, "image1": $('.preview').attr('id')}, {wait: true});
					}
				} else if( $('#category option:selected').attr('value') == 'Warehouse' || $('#category option:selected').attr('value') == 'Office Space' ) { 
					if( $('#optionsRent').is(':checked') ){
						this.collection.create({"office": true, "rent": true, "selectedCategory": $('#addPropertyForm #category option:selected').val(), "rentOrSale": $('#addPropertyForm input[type="radio"]:checked').val(), "title": $('#addPropertyForm #title').val().trim(), "description": $('#addPropertyForm #descriptionTextArea').val().trim(), "features": checkedFeatures.toString(), "location": $('#addPropertyForm #property-location').val().trim(), "currency": $('#addPropertyForm #currency option:selected').val(), "price": $('#addPropertyForm #appendedPrependedInput').val().trim(), "pricePhrase": $('#pricePhrase option:selected').val(),"priceFlexibility": priceFlexibility, "published": published, "image1": $('.preview').attr('id')}, {wait: true});
					} else{
						this.collection.create({"office": true, "sale": true, "selectedCategory": $('#addPropertyForm #category option:selected').val(), "rentOrSale": $('#addPropertyForm input[type="radio"]:checked').val(), "title": $('#addPropertyForm #title').val().trim(), "description": $('#addPropertyForm #descriptionTextArea').val().trim(), "features": checkedFeatures.toString(), "location": $('#addPropertyForm #property-location').val().trim(), "currency": $('#addPropertyForm #currency option:selected').val(), "price": $('#addPropertyForm #appendedPrependedInput').val().trim(), "pricePhrase": "", "priceFlexibility": priceFlexibility, "published": published, "image1": $('.preview').attr('id')}, {wait: true});
					}
				} else if( $('#category option:selected').attr('value') == 'Hostel' ){
					if( $('#optionsRent').is(':checked') ){
						this.collection.create({"hostel": true, "rent": true, "selectedCategory": $('#addPropertyForm #category option:selected').val(), "rentOrSale": $('#addPropertyForm input[type="radio"]:checked').val(), "title": $('#addPropertyForm #title').val().trim(), "description": $('#addPropertyForm #descriptionTextArea').val().trim(), "features": checkedFeatures.toString(), "location": $('#addPropertyForm #property-location').val().trim(), "currency": $('#addPropertyForm #currency option:selected').val(), "price": $('#addPropertyForm #appendedPrependedInput').val().trim(), "pricePhrase": $('#pricePhrase option:selected').val(),"priceFlexibility": priceFlexibility, "published": published, "image1": $('.preview').attr('id')}, {wait: true});
					} else{
						this.collection.create({"hostel": true, "sale": true, "selectedCategory": $('#addPropertyForm #category option:selected').val(), "rentOrSale": $('#addPropertyForm input[type="radio"]:checked').val(), "title": $('#addPropertyForm #title').val().trim(), "description": $('#addPropertyForm #descriptionTextArea').val().trim(), "features": checkedFeatures.toString(), "noOfRooms": $('#addPropertyForm #noofrooms option:selected').val(), "noOfBaths": $('#addPropertyForm #noofbaths option:selected').val(), "location": $('#addPropertyForm #property-location').val().trim(), "currency": $('#addPropertyForm #currency option:selected').val(), "price": $('#addPropertyForm #appendedPrependedInput').val().trim(), "pricePhrase": "", "priceFlexibility": priceFlexibility, "published": published, "image1": $('.preview').attr('id')}, {wait: true});
					}
				}
				
				/*setTimeout(function(){
					MarketPlaceGH.collections.properties.trigger('add');
				}, 1000);*/
				
				//remove overlay left behind by the modal view.
     	  		$('#addProperty').modal('hide');
				MarketPlaceGH.recycleAll = 0;
			}			
		},
		
		editFormSelectedImageBtn: function(e){			  
			var target = $(e.target);
    		var preview = target.parent().siblings('.thumbnails').find('#preview');
			var imageButtonLabel = target.siblings('#upload-image-button').find('#selected-image-name');
			  
            preview.html('');
			preview.html('<img class="rchads-image-upload-spinner" src="../resources/images/loader_green.gif" alt="Uploading...." width="110" />');
			
			imageButtonLabel.removeClass("rchads-selected-image-name-attached");
			imageButtonLabel.html('Attaching Image...');
							
			$("#editPropertyForm").ajaxForm({
				url: '../data/cms/uploadImages.php',
				target: preview,
				success: function(){
					imageButtonLabel.addClass("rchads-selected-image-name-attached");
					imageButtonLabel.html('Image Attached');
					$('#editPropertyForm input[type="file"]').val('');
				}
			}).submit(); 					
		},
		
		editProperty: function(){
			MarketPlaceGH.validation.errors = false;
			validation.categoryValidation();
			validation.rent_saleValidation();
			validation.titleValidation();
			validation.descriptionValidation();
			//validation.featuresValidation();
			if( $('#category option:selected').attr('value') == 'Land' || $('#category option:selected').attr('value') == 'Warehouse' || $('#category option:selected').attr('value') == 'Office Space' || ($('#category option:selected').attr('value') == 'Hostel' && $('#optionsRent').is(':checked')) ) {
				// Do nothing
			} else {
				validation.roomsValidation();
				validation.bathsValidation();
			}
			validation.locationValidation();
			validation.priceValidation();
			
			var id    = $("#editPropertyForm #propertyId").val();
			var model = MarketPlaceGH.collections.products.get(id);
			if(!MarketPlaceGH.validation.errors){
				if( $('#priceFlexibility').is(':checked') ) {
					var priceFlexibility = "Negotiable";
				} else {
					var priceFlexibility = "Non-Negotiable";
				}
				
				if( $('#publish').is(':checked') ) {
					var published = "Published";
				} else {
					var published = "Unpublished";
				}
				
				model.url = '/MarketPlaceGH/cms/data/cms/products.php/' + id;
				
				if( $('#category option:selected').attr('value') == 'House' || $('#category option:selected').attr('value') == 'Apartment' ) {
					if( $('#optionsRent').is(':checked') ){
						model.save({"house": true, "rent": true, "selectedCategory": $('#editPropertyForm #category option:selected').val(), "rentOrSale": $('#editPropertyForm input[type="radio"]:checked').val(), "title": $('#editPropertyForm #title').val().trim(), "description": $('#editPropertyForm #descriptionTextArea').val().trim(), "features": checkedFeatures.toString(),  "noOfRooms": $('#editPropertyForm #noofrooms option:selected').val(), "noOfBaths": $('#editPropertyForm #noofbaths option:selected').val(), "location": $('#editPropertyForm #property-location').val().trim(), "currency": $('#editPropertyForm #currency option:selected').val(), "price": $('#editPropertyForm #appendedPrependedInput').val().trim(), "pricePhrase": $('#pricePhrase option:selected').val(),"priceFlexibility": priceFlexibility, "published": published, "image1": $('.preview').attr('id')}, {wait: true});
					} else{
						model.save({"house": true, "sale": true, "selectedCategory": $('#editPropertyForm #category option:selected').val(), "rentOrSale": $('#editPropertyForm input[type="radio"]:checked').val(), "title": $('#editPropertyForm #title').val().trim(), "description": $('#editPropertyForm #descriptionTextArea').val().trim(), "features": checkedFeatures.toString(), "noOfRooms": $('#editPropertyForm #noofrooms option:selected').val(), "noOfBaths": $('#editPropertyForm #noofbaths option:selected').val(),  "location": $('#editPropertyForm #property-location').val().trim(), "currency": $('#editPropertyForm #currency option:selected').val(), "price": $('#editPropertyForm #appendedPrependedInput').val().trim(), "pricePhrase": "", "priceFlexibility": priceFlexibility, "published": published, "image1": $('.preview').attr('id')}, {wait: true});
					}	
				} else if( $('#category option:selected').attr('value') == 'Land' ){
					if( $('#optionsRent').is(':checked') ){
						model.save({"land": true, "rent": true, "selectedCategory": $('#editPropertyForm #category option:selected').val(), "rentOrSale": $('#editPropertyForm input[type="radio"]:checked').val(), "title": $('#editPropertyForm #title').val().trim(), "description": $('#editPropertyForm #descriptionTextArea').val().trim(), "features": checkedFeatures.toString(), "location": $('#editPropertyForm #property-location').val().trim(), "currency": $('#editPropertyForm #currency option:selected').val(), "price": $('#editPropertyForm #appendedPrependedInput').val().trim(), "pricePhrase": $('#pricePhrase option:selected').val(),"priceFlexibility": priceFlexibility, "published": published, "image1": $('.preview').attr('id')}, {wait: true});
					} else{
						model.save({"land": true, "sale": true, "selectedCategory": $('#editPropertyForm #category option:selected').val(), "rentOrSale": $('#editPropertyForm input[type="radio"]:checked').val(), "title": $('#editPropertyForm #title').val().trim(), "description": $('#editPropertyForm #descriptionTextArea').val().trim(), "features": checkedFeatures.toString(), "location": $('#editPropertyForm #property-location').val().trim(), "currency": $('#editPropertyForm #currency option:selected').val(), "price": $('#editPropertyForm #appendedPrependedInput').val().trim(), "pricePhrase": "", "priceFlexibility": priceFlexibility, "published": published, "image1": $('.preview').attr('id')}, {wait: true});
					}
				} else if( $('#category option:selected').attr('value') == 'Warehouse' || $('#category option:selected').attr('value') == 'Office Space' ) { 
					if( $('#optionsRent').is(':checked') ){
						model.save({"office": true, "rent": true, "selectedCategory": $('#editPropertyForm #category option:selected').val(), "rentOrSale": $('#editPropertyForm input[type="radio"]:checked').val(), "title": $('#editPropertyForm #title').val().trim(), "description": $('#editPropertyForm #descriptionTextArea').val().trim(), "features": checkedFeatures.toString(), "location": $('#editPropertyForm #property-location').val().trim(), "currency": $('#editPropertyForm #currency option:selected').val(), "price": $('#editPropertyForm #appendedPrependedInput').val().trim(), "pricePhrase": $('#pricePhrase option:selected').val(),"priceFlexibility": priceFlexibility, "published": published, "image1": $('.preview').attr('id')}, {wait: true});
					} else{
						model.save({"office": true, "sale": true, "selectedCategory": $('#editPropertyForm #category option:selected').val(), "rentOrSale": $('#editPropertyForm input[type="radio"]:checked').val(), "title": $('#editPropertyForm #title').val().trim(), "description": $('#editPropertyForm #descriptionTextArea').val().trim(), "features": checkedFeatures.toString(), "location": $('#editPropertyForm #property-location').val().trim(), "currency": $('#editPropertyForm #currency option:selected').val(), "price": $('#editPropertyForm #appendedPrependedInput').val().trim(), "pricePhrase": "", "priceFlexibility": priceFlexibility, "published": published, "image1": $('.preview').attr('id')}, {wait: true});
					}
				} else if( $('#category option:selected').attr('value') == 'Hostel' ){
					if( $('#optionsRent').is(':checked') ){
						model.save({"hostel": true, "rent": true, "selectedCategory": $('#editPropertyForm #category option:selected').val(), "rentOrSale": $('#editPropertyForm input[type="radio"]:checked').val(), "title": $('#editPropertyForm #title').val().trim(), "description": $('#editPropertyForm #descriptionTextArea').val().trim(), "features": checkedFeatures.toString(), "location": $('#editPropertyForm #property-location').val().trim(), "currency": $('#editPropertyForm #currency option:selected').val(), "price": $('#editPropertyForm #appendedPrependedInput').val().trim(), "pricePhrase": $('#pricePhrase option:selected').val(),"priceFlexibility": priceFlexibility, "published": published, "image1": $('.preview').attr('id')}, {wait: true});
					} else{
						model.save({"hostel": true, "sale": true, "selectedCategory": $('#editPropertyForm #category option:selected').val(), "rentOrSale": $('#editPropertyForm input[type="radio"]:checked').val(), "title": $('#editPropertyForm #title').val().trim(), "description": $('#editPropertyForm #descriptionTextArea').val().trim(), "features": checkedFeatures.toString(), "noOfRooms": $('#editPropertyForm #noofrooms option:selected').val(), "noOfBaths": $('#editPropertyForm #noofbaths option:selected').val(), "location": $('#editPropertyForm #property-location').val().trim(), "currency": $('#editPropertyForm #currency option:selected').val(), "price": $('#editPropertyForm #appendedPrependedInput').val().trim(), "pricePhrase": "","priceFlexibility": priceFlexibility, "published": published, "image1": $('.preview').attr('id')}, {wait: true});
					}
				}
								
				//remove overlay left behind by the modal view.
     	  		$('#editProperty').modal('hide');
			}		  
		
		}
		
	});

})(MarketPlaceGH.views, MarketPlaceGH.validation);
