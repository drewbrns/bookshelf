(function ( views ) {

	views.PropertyFeaturesView = Backbone.View.extend({
		tagName: 'tbody',
		events: {
			'change input[type=checkbox]' : 'checkFeature'
		},
		template: _.template(
				  	'<% if(features) { %>' +
						'<% for(i = 0; i < features.length; i++) { %>' +
							'<tr>' +
								'<td> <input type="checkbox" name="feature" id="<%= features[i].id %>"> </td>'+
								'<td> <label for="<%= features[i].id %>"><%= features[i].feature %></label> </td>'+
							'</tr>' +																
						'<% } %>' +
					'<% } %>'
				  ),
				
		initialize: function(){
			_.bindAll(this, 'render', 'getNewFeatureList', 'checkFeatures');
			
			RCHads.collections.propertyFeatures.bind('reset', this.render);			
			RCHads.collections.propertyFeatures.bind('add', this.getNewFeatureList);
			RCHads.collections.propertyFeatures.bind('checkFeatures', this.checkFeatures);
			
			checkedFeatures = [];
		},

		render: function(){
			$(this.el).html( this.template( RCHads.collections.propertyFeatures.features ) );
			this.delegateEvents();
			
			return this;
		},
		
		checkFeature: function(e){
			$(e.target).attr('id');
			
			function indexInArray(arr, val){
				for(var i = 0; i < arr.length; i++) if(arr[i] == val) return i;
				return -1;
			} 
						
			if( $(e.target).is(':checked') ){
				$(e.target).parent().css({'background': '#CCFFCC'});
				checkedFeatures.push( $(e.target).attr('id') );
			} else{	
				checkedFeatures.splice( indexInArray(checkedFeatures, $(e.target).attr('id')), 1 );
				$(e.target).parent().css({'background': ''});
			}
			console.log(checkedFeatures);
		},
		
		getNewFeatureList: function(){
			RCHads.collections.propertyFeatures.fetch({
				success: function(){
					RCHads.collections.propertyFeatures.trigger('checkFeatures');
				}
			});
		},
		
		checkFeatures: function(){
			_.map(checkedFeatures, function(featureId){
				$('#'+featureId).attr('checked', 'checked');
				$('#'+featureId).parent().css({'background': '#CCFFCC'});
			});
			
			newFeatureId = RCHads.collections.propertyFeatures.features['features'][RCHads.collections.propertyFeatures.features['features'].length - 1].id;
			
			$('#'+newFeatureId).attr('checked', 'checked');
			$('#'+newFeatureId).parent().css({'background': '#CCFFCC'});
			checkedFeatures.push(newFeatureId);
			
			console.log(checkedFeatures);    
		}
		
	});
	
})( RCHads.views )
