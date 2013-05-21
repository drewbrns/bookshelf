(function ( views ) {
	
	views.RecycleBinProductsView = Backbone.View.extend({
		className: 'row',
		events: {			
			//'click #restoreAllProperties .modal-footer div:last-child' : 'restoreAllProperties'
		},
		
		template : '<div style="padding-bottom:10px;">' +
				   		'Properties listed here are not seen by the public. To make a property visible click restore.' +
				   '</div>'+
				   
				   '<div id="recycleBin">'+
					
						'<ul class="thumbnails"> </ul>'+
					
						'<div class="pagination pagination-centered" > </div>'+
					
				   '</div> <!-- #recycleBin -->',
				
		initialize : function() {
			_.bindAll(this, 'render', 'fetch', 'fetchFirstPage', 'fetchAfterDeletingProperty');
			
			this.collection.bind('reset', this.render);
			this.collection.bind('add', this.fetchFirstPage);
			this.model.bind('destroy', this.fetch); // Delete a Listing From the Recycle Bin
			this.model.bind('change:id', this.fetch); // Restore a Listing From the Recycle Bin
			MarketPlaceGH.collections.products.bind('destroy', this.fetchAfterDeletingProperty);			
		},	
	
		render: function() { 				
			//$(this.el).empty();
			$(this.el).html(this.template);

			var recycleBinProductView = new MarketPlaceGH.views.RecycleBinProductView({
				collection: this.collection
			});	
			this.$('#recycleBin > .thumbnails').append(recycleBinProductView.render().el);

			var recycleBinPaginationView = new MarketPlaceGH.views.RecycleBinPaginationView({
				collection: this.collection
			});
			
			this.$('#recycleBin > .pagination').append(recycleBinPaginationView.render().el);
			
			$("#recycleBin-item-count").html(MarketPlaceGH.collections.recycleBinProducts.total);
											
			return this;
		},
		
		fetch: function(deletedProperty){
			
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
			this.collection.firstPage({
				success: function(){
					$('#CR').html( $('#copyright').html() );
				}
			});
			MarketPlaceGH.collections.products.fetch({
				success: function(){
					$('#CR').html( $('#copyright').html() );
				}
			});
		},
		
		fetchAfterDeletingProperty: function() {
			this.collection.fetch({
				success: function(){
					$('#CR').html( $('#copyright').html() );
				}
			});
		},
		
		restoreAllProperties: function() {
			this.collection.create({wait: true});
		}
		
	});
	
})( MarketPlaceGH.views )