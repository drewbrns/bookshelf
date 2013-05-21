(function (views) {
	 
	views.ProductView = Backbone.View.extend({
		events: {
			//'click #edit'  : 'showEditPropertyForm',
			//'click #delete': 'deleteProperty',
			'mouseenter #properties .thumbnails li a' : 'propertyHover',
			'mouseleave #properties .thumbnails li a' : 'propertyHoverOff'//,
			//'click #add-next-image-btn-edit'    : 'addPropertyImage',
			//'click #remove-this-image-btn-edit' : 'removePropertyImage',
			//'mouseenter .label': 'propertyStatusHover',
			//'mouseleave .label': 'propertyStatusHoverOff',
			//'click .label': 'changePropertyStatus'
			
			//Validations
/*			'change #category' : 'categoryValidation',
			'change #optionsRent' : 'rent_saleValidation',
			'change #optionsSale' : 'rent_saleValidation',
			'change #title' : 'titleValidation',			
			'change #descriptionTextArea' : 'descriptionValidation',
			'change #featuresTextArea' : 'featuresValidation',
			'change #noofrooms' : 'roomsValidation',
			'change #noofbaths' : 'bathsValidation',
			'change #property-location' : 'locationValidation',
			'change #appendedPrependedInput' : 'priceValidation',
			'click #image1' : 'firstImageValidation',
			'change #image1' : 'firstImageValidation',
			'click #addOtherFeature': 'addOtherFeature',
			'keyup #descriptionTextArea': 'countDescriptionChar',
			'keypress #addOtherFeatureText': 'addOtherFeatureEnter',
			'click #pemDelProps' : 'showPemDelModal',
*/			
		},
	
		template: _.template(
				   '<li class="span2" style="position: relative;"><br />' +
						'<a id="property<%=id%>"draggable="true" href="javascript:;" style="position: relative;" class="thumbnail">' +						
							'<img src="<%if(images.length>0){%><%=images[0]%><%}else{%>../resources/images/RCHads-h185-w185.jpg<%}%>"  alt="" />' +
				
							'<div id="details-overlay" class="rchads-preview" style="display:none;">'+
								'<div class="hoverToolbar">'+
								//	'<div class="plain-btn plain-btn-large plain-btn-no-hover"> <p>Viewed: </p> </div>'+
									'<div class="pull-right">'+
										'<div class="plain-btn" id="edit" data-toggle="modal" data-target="#editProduct"><p>Edit</p></div>'+																
										'<div class="plain-btn" id="images" data-toggle="modal" data-target="#editProduct"><i class=" icon-picture icon-white"></i></div>'+
										'<div class="plain-btn" id="delete"><i class="icon-trash icon-white"></i></div>'+
									'</div>'+																
								'</div>'+
							'</div>'+
										
							'<div id="quick-details" class="rchads-quick-details" style="display:none;">' +
								'<p class="moreFocused"><%=currency%><%=price%></p>' +
							'</div>' +
						'</a>' +
						'<div class="rchads-thumbnail-name"><h2 id="propertyTitle" rel="tooltip" title="<%=name%>" ><%=name%> </h2></div>' +
						'<input type="hidden" name="productId" id="productId" value="<%=id%>" />' +
				   '</li>'),
			
		editPropertyFormTemplate: _.template(
									'<div class="modal hide fade" id="editProperty">' +
										'<div class="modal-header">' +
											'<a class="close" data-dismiss="modal">&times;</a>' +
											'<h3>' +
												'<img style="margin-top:-5px;" src="../resources/icons/metro/black/maintenance.png" />' +										  	
												'Edit <%= fullTitle %>' +
											'</h3>' +
										'</div>' +
									
										'<div class="modal-body">' +
	
											'<form id="editPropertyForm" name="editPropertyForm" class="well" method="post" enctype="multipart/form-data">' +
																		
												'<div id="categoryContainer" class="control-group">' +
											   		'<input type="hidden" id="propertyId" value="<%= id %>" />'+											
											   		'<label class="control-label">Select Your Property Type</label>'+
											   		
													'<select id="category" name="category" class="controls input-medium rchads-add-form-bottom-margin">' +													
											   		'<% for(i = 0; i < MarketPlaceGH.collections.products.pageInfo()["categories"].length; i++){ %>' +
														'<option value="<%= MarketPlaceGH.collections.products.pageInfo()["categories"][i] %>" <% if(selectedCategory == MarketPlaceGH.collections.products.pageInfo()["categories"][i]) { %>selected="selected"<% } %>><%= MarketPlaceGH.collections.products.pageInfo()["categories"][i] %></option>' +
											   		'<% } %>' +
											   		'</select> ' +											
												'</div>'+											
											
												'<div id="rentOrSaleContainer" class="control-group rchads-add-form-bottom-margin">' +
													'<label class="control-label">Is Your Property For Rent Or Sale?</label>' +
													'<div class="controls">' +
														'<label class="radio">' +
															'<input type="radio" name="optionsRentOrSale" id="optionsRent" value="Rent" <% if(rentOrSale == "Rent") { %>checked="checked"<% } %> />Rent' +
														'</label>' +
														'<label class="radio">' +
															'<input type="radio" name="optionsRentOrSale" id="optionsSale" value="Sale"  <% if(rentOrSale == "Sale") { %>checked="checked"<% } %> />Sale' +
														'</label>' +
													'</div>' +
												'</div>' +
					
												'<div id="titleContainer" class="control-group rchads-add-form-bottom-margin">' +
													'<label class="control-label" for="title">Name Your Property</label>' +
													'<div class="controls">' +		
														'<input type="text" id="title" class="span4" maxlength="40" value="<%= fullTitle %>" />' +
													'</div>' +
												'</div>' +
											
										    	'<div id="descriptionContainer" class="control-group rchads-add-form-bottom-margin">' +
													'<label class="control-label"  for="descriptionTextArea">Describe Your Property</label>' +
													'<div class="controls">' +
													  '<textarea id="descriptionTextArea" class="span4" maxlength="200"><%= description %></textarea><span id="descCount" class="descCharCount">200</span>' +
													'</div>' +
												'</div>' +
											
												'<div id="featuresContainer" class="featuresContainer control-group">'+
													'<label class="control-label">What Does Your Property Feature? <small style="font-size: 0.85em;">please tick.</small>' +
													'</label>' +
											  		'<div class="inner controls">'+											    
														'<table id="features-table" class="table table-striped table-bordered">'+
														  
														'</table>'+
											  		'</div><!-- end .inner-->'+ 
											
												  	'<div class="controls">'+
														'<div class="addFeature input-append">'+
													   		'<input class="span3" id="addOtherFeatureText" type="text" placeHolder="Add Other Feature" size="16" /><button id="addOtherFeature" class="btn" type="button">+</button>'+
														'</div>'+
												  	'</div>'+											
												'</div>'+
												
												'<div class="control-group rchads-add-form-bottom-margin" id="roomsBaths">' +
												
													'<div id="noofroomsContainer" class="control-group">' +													
														'<div class="controls">' +
															'<select id="noofrooms" name="noofrooms" class="input-medium">' +
																'<option value="1" <% if(noOfRooms == 1) {%>selected="selected"<% } %>>1 Room</option>' +
															'<% for(i = 2; i <= 15; i++){ %>' +
																'<option value="<%= i %>" <% if(i == noOfRooms) {%>selected="selected"<% } %>><%= i %> Rooms</option>' +
															'<% } %>' +
															'</select>' +
														'</div>' +									
													'</div>' +
													
													'<div id="noofbathsContainer" class="control-group">' +
									
														'<select id="noofbaths" name="noofbaths" class="input-medium">' +
															'<option value="1" <% if(noOfBaths == 1) {%>selected="selected"<% } %>>1 Bathroom</option>' +
														'<% for(i = 2; i <= 15; i++){ %>' +
															'<option value="<%= i %>" <% if(i == noOfBaths) {%>selected="selected"<% } %>><%= i %> Bathrooms</option>' +
														'<% } %>' +
														'</select>' +
													
													'</div>' +
												'</div>' +
						
										    	'<div id="locationContainer" class="control-group rchads-add-form-bottom-margin">' +
													'<label  class="control-label" for="property-location">Location</label>' +
													'<div class="controls">' +											
														'<input id="property-location" type="text"  class="span4" placeHolder="eg. Accra" value="<%= location %>">' +
										  
										  				'<!-- google maps integration -->' +										
													'</div>' +
												'</div>' +
						
												'<div id="priceContainer" class="control-group rchads-add-form-bottom-margin">' +
													'<label class="control-label" for="currency">Price</label>' +
					
													'<div class="controls form-inline">' +
														'<div class="input-prepend">' +
															'<select id="currency" name="currency" class="add-on" style="height:25px;padding:1px;text-align:left;">' +
																'<option value="$" <% if(currency=="$") { %>selected="selected"<% } %>>US Dollar ($)</option>' +
																'<option value="GH&cent;" <% if(currency=="GH\u00a2") { %>selected="selected"<% } %>>Ghana Cedi (GH&cent;)</option>' +
																'<option value="&euro;" <% if(currency=="\u20ac") { %>selected="selected"<% } %>>Euro (&euro;)</option>' +
																'<option value="&pound;" <% if(currency=="\u00a3") { %>selected="selected"<% } %>>British Pound (&pound;)</option>' +
															'</select>' +
															'<input class="span2 price-Id" id="appendedPrependedInput" size="16" style="margin-left:4px;" value="<%= price %>" />' +
															'<select id="pricePhrase" name="pricePhrase" class="add-on" style="height:25px;padding:1px;text-align:left;margin-left:3px;">' +
																'<option value="per month" <% if(pricePhrase=="per month") { %>selected="selected"<% } %>>per month</option>' +
																'<option value="per sq. meter" <% if(pricePhrase=="per sq. meter") { %>selected="selected"<% } %>>per square meter</option>' +																
																'<option value="per semester" <% if(pricePhrase=="per semester") { %>selected="selected"<% } %>>per semester</option>' +
																'<option value="per year" <% if(pricePhrase=="per year") { %>selected="selected"<% } %>>per year</option>' +
																'<option value="">n/a</option>' +
															'</select>' +
														'</div>' +
														' <label class="checkbox"><input type="checkbox" id="priceFlexibility" <% if(priceFlexibility == "Negotiable") { %>checked="checked"<% } %>>Negotiable</label>' +
													'</div>' +
												'</div>' +
											
												'<div class="control-group  well rchads-add-form-bottom-margin">' +
											
													'<label class="control-label">' +
														'<h3>Property Images <small style="font-size:0.6em;"><a id="imageGuide" href="#" ><i class="icon-info-sign"></i> why images?</a></small>' +
														'</h3>' +
													'</label>' +
												
													'<div class="controls">' +						
													
														'<ul class="thumbnails">' +				
															'<li class="span2" style="position:relative;">' +
																'<a id="property-image" href="#" class="thumbnail">' +
																	'<img src="../resources/images/RCHads_1.jpg" alt="" />' +
																	'<span id="delete-property-image" class="close rchads-delete-image" style="display:none;">&times;</span>' +
																	'<span id="edit-property-image" class="rchads-edit-image" style="display:none;"><i class="icon-pencil icon-white"></i> Change</span>' +
																'</a>' +
																'<div class="rchads-thumbnail-name-small rchads-center-text">Living &amp; Dining Area.</div>' +
															'</li>' +						
														'</ul>' +				
																
													'</div>' +
				
													'<div id="add-images-group-edit" class="controls">' +				
														'<div class="page-header">' +
															'<h3>Add Images' +
																'<div class="btn-group pull-right">' +
																	'<div id="add-next-image-btn-edit" rel="tooltip" data-original-title="Add Image" class="btn">+</div>' +
																	'<div id="remove-this-image-btn-edit" rel="tooltip" data-original-title="Remove Image" class="btn disabled">-</div>' +
																'</div>' +
															'</h3>' +					
														'</div>' +

														'<div class="controls rchads-image-upload-container">' +

															'<div id="firstImageContainer" class="control-group">'+

																'<div class="rchads-image-upload-number"><h1>1</h1></div>'+

																'<ul class="thumbnails rchads-image-upload-preview">'+
																	'<li class="span2" style="width:110px;">'+
																		'<a id="preview" href="javascript:;" class="thumbnail">'+
																			'<img src="../resources/images/rchads_2.jpg" />'+
																		'</a>'+
																	'</li>'+
																'</ul>'+

																'<div class="rchads-image-upload-actions">'+
																	'<div id="upload-image-button" class="rchads-upload-btn">'+
																		'<div id="selected-image-name" class="rchads-selected-image-name">No Image Selected</div>'+
																		'<div class="btn pull-right" style="margin-top:-1px;">Select Image</div>'+
																	'</div> '+
																	'<input  class="input-file rchads-hidden-file-input" id="image1" type="file" name="image1" />' +
																	'<input type="text" class="span3"  name="captionForImage1" placeholder="caption" /> ' +
																'</div>'+	

															'</div> <!--end #firstImageContainer-->'+
														
														'</div>' + //End Controls

														'<br class="clear" />'+
													'</div>' +
								
													'<br class="clear" />'+					
												'</div>' +
				
												'<br class="clear" />' +
								
												'<label class="checkbox">'+
													'<input type="checkbox" name="publish" id="publish" <% if(published == "Published") { %>checked="checked"<% } %>>'+
													'Publish Property to Public view.'+
												'</label>'+
												
												'<br class="clear" />'+
								
											'</form>' +	
										'</div>' +
							
										'<div class="modal-footer rchads-nav-color">' +
											'<div class="btn" data-dismiss="modal">Discard Changes</div>' +	
											'<div id="editExistingProperty" class="btn btn-success">Save Changes</div>' +	
										'</div>' +		  
								  	'</div>'
								  ),
	
		initialize: function(){
			_.bindAll(this, 'render', 'fetch');
			
			this.model.bind('change', this.fetch);
		},
	
		render: function(){
			$(this.el).html( this.template( this.model.toJSON() ) );
				
			return this;
		},
		
		fetch: function(){
			MarketPlaceGH.collections.properties.fetch();
		},
		
		deleteProperty: function(){
			this.model.url = '/MarketPlaceGH/cms/data/cms/products.php/' + this.$('#propertyId').val();
			this.model.destroy({wait: true});
	    },
		
		propertyStatusHover: function(e) {
			$(e.target).css({'cursor':'pointer'});	
			
			if ( MarketPlaceGH.changePublished == 1 ) {
				
			} else {
				if( $(e.target).hasClass('label-success') ) {
					$(e.target).removeClass('label-success');
					$(e.target).text('Unpublish...');
					$(e.target).addClass('label-inverse');
				} else {
					$(e.target).removeClass('label-inverse');
					$(e.target).text('Publish...');
					$(e.target).addClass('label-success');
				}
			}
			
		},
		
		propertyStatusHoverOff: function(e) {
			if( $(e.target).text() == 'Publish...' ) {
				$(e.target).removeClass('label-success');
				$(e.target).text('Unpublished');
				$(e.target).addClass('label-inverse');
			} else if( $(e.target).text() == 'Unpublish...' ) {
				$(e.target).removeClass('label-inverse');
				$(e.target).text('Published');
				$(e.target).addClass('label-success');
			}
			MarketPlaceGH.changePublished = 0;	
		},
		
		changePropertyStatus: function(e) {
			this.model.url = '/MarketPlaceGH/cms/data/cms/products.php/' + this.$('#propertyId').val();
			
			if( $(e.target).hasClass('label-success') ) {
				$(e.target).text('Published');				
				this.model.save({"published": "Published"}, {wait: true});				
			} else {
				$(e.target).text('Unpublished');
				this.model.save({"published": "Unpublished"}, {wait: true});
			}
			MarketPlaceGH.changePublished = 1;
		},
	
		propertyHover: function(){
			$(this.el).find('#quick-details').show();
			$(this.el).find('#details-overlay').show();
		},
	
		propertyHoverOff: function(){
			$(this.el).find('#quick-details').hide();
			$(this.el).find('#details-overlay').hide();
		},
	
		showEditPropertyForm: function(){
			var id    = $(this.el).find("#propertyId").val();
			var model = MarketPlaceGH.collections.products.get(id);
			
			//prepare html
			var html = this.editPropertyFormTemplate(model.toJSON());			
			
			//inject prepared html there		
			$('#target_modals').html(html);
			
			if( $('#category option:selected').attr('value') == 'Land' ) {
				$('#roomsBaths').hide();
			}
			
			//$('#features-table').append(MarketPlaceGH.views.propertyFeaturesView.render().el);
			
			if( model.toJSON().selectedCategory == 'House' || model.toJSON().selectedCategory == 'Apartment' || (model.toJSON().selectedCategory == 'Hostel' && model.toJSON().rentOrSale == 'Sale') ){
				$('#roomsBaths').show();
			} else{
				$('#roomsBaths').hide();
			}
			
			if( model.toJSON().rentOrSale == 'Rent' ){
				$('#pricePhrase').show();
			} else{
				$('#pricePhrase').hide();
			}
			
			function indexInArray(arr, val){
				for(var i = 0; i < arr.length; i++) if(String(arr[i].id) == val) return i;
				return -1;
			}
			listingsArrayId = indexInArray(MarketPlaceGH.collections.products.models, id);
			
			if( MarketPlaceGH.collections.products.at(listingsArrayId).get('features')[0] == 'none' ) {				
				// Do Nothing
			} else {
				checkedFeatures = [];
				_.map(MarketPlaceGH.collections.products.at(listingsArrayId).get('features'), function(featureId) {
					$('#'+featureId).attr('checked', 'checked');
					$('#'+featureId).parent().css({'background': '#CCFFCC'});
					checkedFeatures.push( $('#'+featureId).attr('id') );
				});
		    }
			
			var fileInput = $('#target_modals').find('input[type="file"]');
			
			fileInput.css("opacity", 0);		
			
			window.counter = 2; //reset counter.
			
			//Type Ahead for property location
			$('#property-location').typeahead({source:['Ablekuma', 'Abosokai', 'Accra', 'Adenta']});			
			
			
		},
		
		addPropertyImage: function(){
			MarketPlaceGH.mixins.addPropertyImage(
										   $("#add-images-group-edit"),
			                               $("#add-next-image-btn-edit"),
			                               $("#remove-this-image-btn-edit"),
											6 
			);	
			
			var fileInput = $('#target_editProperty').find('input[type="file"]');
			
			fileInput.css("opacity", 0);
		},
		
		removePropertyImage: function(){
			MarketPlaceGH.mixins.removePropertyImage(
				                           $("#remove-this-image-btn-edit"),
										   $("#add-next-image-btn-edit")
			);
		}
	});

}) (MarketPlaceGH.views)	