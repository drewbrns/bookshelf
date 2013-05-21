(function (collections, model) {
	
	collections.PropertyFeatures = Backbone.Collection.extend({
		model: model,
		
		url: '/rchads2.0/data/cms/propertyFeatures.php',
		
		parse: function(resp){
			this.features = resp;
		},
			
		features: this.features	
	});
	
})(RCHads.collections, RCHads.models.Property)