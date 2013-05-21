(function ( views ) {

	views.RecycleBinProductView = Backbone.View.extend({
		events: {
			'click #restore' : 'restoreProperty',
			'click #deleteFromBin' : 'deleteFromBin',
			'mouseenter #recycleBin .thumbnails li a' : 'recycleBinPropertyHover',
			'mouseleave #recycleBin .thumbnails li a' : 'recycleBinPropertyHoverOff'
		},

		template: _.template(
					'<% if(rbListings) { %>' +
						'<% for(i = 0; i < rbListings.length; i++) { %>' +
							'<div class="rchads-trashed-properties">'+ 
								//property image
								'<li class="span1" style="position: relative;">' +
									'<a id="property-small<%= rbListings[i].id %>" href="#" style="position: relative;" class="thumbnail">' +
										'<img src="../resources/images/RCHads_2.jpg" alt="" />' +
									'</a>' +
									'<div class="rchads-quick-details-small" style="display:none;">' +
						//				'<p><%= rbListings[i].title %><p>' +
						//				'<p><%= rbListings[i].currency %> <%= rbListings[i].price %></p>' +
						//				'<p><%= rbListings[i].location %></p>' +
									'</div>' +
								 '</li>'+ 
								 //property details and actions
								'<div class="rchads-thumbnail-name-trashed"><%= rbListings[i].title %></div>' +
								'<div class="btn-group">' +
									'<div class="rchads-trashed-btns">'+
										'<div class="btn" id="restore">Restore</div>' +
										'<input type="hidden" name="restoreId" id="restoreId" value="<%= rbListings[i].id %>" />' +
										'<div class="btn" id="deleteFromBin"><i class="icon-trash"></i></div>' +
									'</div>'+
								'</div>' +
							'</div>' +
						'<% } %>' +
					'<% } %>'),
				
		initialize: function(){
			_.bindAll(this, 'render');
			//this.model.bind('change', this.render);
		},

		render: function(){
			//$(this.el).empty();
			$(this.el).html( this.template( MarketPlaceGH.collections.recycleBinProducts.pageInfo() ) );
			
			return this;
		},

		restoreProperty: function(e){
			MarketPlaceGH.models.recycleBinProduct.id = $(e.target).siblings('#restoreId').val()
			MarketPlaceGH.models.recycleBinProduct.url = '/MarketPlaceGH/cms/data/cms/recycleBinProducts.php/' + $(e.target).siblings('#restoreId').val();
			MarketPlaceGH.models.recycleBinProduct.save({"id" : $(e.target).siblings('#restoreId').val()}, {wait:true});
	    },
		
		deleteFromBin: function(e) {
			MarketPlaceGH.models.recycleBinProduct.id = $(e.target).siblings('#restoreId').val()
			MarketPlaceGH.models.recycleBinProduct.url = '/MarketPlaceGH/cms/data/cms/recycleBinProducts.php/' + $(e.target).siblings('#restoreId').val();
			MarketPlaceGH.models.recycleBinProduct.destroy({wait: true});					
		},

		recycleBinPropertyHover: function(){
		//	$('a#property-small'+this.$('#restoreId').val()).append('<div class="rchads-preview-small">Preview</div>');
		//	$('a#property-small'+this.$('#restoreId').val()).find('.rchads-quick-details-small').show();
		},

		recycleBinPropertyHoverOff: function(){
		//	$('.rchads-preview-small').remove(); 
		//	$('a#property-small'+this.$('#restoreId').val()).find('.rchads-quick-details-small').hide();
		}
	});
	
})( MarketPlaceGH.views )
