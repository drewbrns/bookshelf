define(['jquery', 
		'underscore', 
		'backbone',
		'text!app/templates/productView-tpl.html',
		'bootstrap-tab'], function($, _ , Backbone, productViewTemplate){
			
		var ProductView = Backbone.View.extend({

			//id: 'alembic',

			//tagName: 'div', 

			events: {
				//'click #productTab a' : 'showTab'
			},

			template : _.template(productViewTemplate),

			initialize : function() {		
			   _.bindAll(this, 'render');	
			},

			render: function() { 	

				$(this.el).html(this.template);

				return this;
			},

			showTab: function(e){
			   e.preventDefault();
			}
			
		});
		
		return ProductView
			
});