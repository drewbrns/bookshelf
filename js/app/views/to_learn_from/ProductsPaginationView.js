(function ( views ) {
	views.ProductsPaginationView = Backbone.View.extend({
		tagName: 'ul',
		events: {
			'click a.prev' : 'previous',
			'click a.next' : 'next',
			'click a.pageNumber' : 'goToPage',
			'click a.first' : 'goToFirstPage',
			'click a.last'  : 'goToLastPage'
	    },
	  
	  	initialize: function() {
			_.bindAll(this, 'previous', 'next', 'render');
			this.collection.bind('reset', this.render);
	  	},
	  
		template: _.template('<% if(pages > 1) { %>' +
							
//								'<div class="pull-left">testing</div>'+
								//	'<%= range[0] %> - <%= range[1] %> of <%= total %>' 
							
								'<% if (page == 1) { %>' +
									'<li class="disabled"><a class="prev" href="#">←</a></li>  '+  	
								'<% } else { %>' +
									'<li><a class="prev" href="#">←</a></li>  '+ 								
									'<li><a href="#" class="first">First</a></li>' +
								'<% } %>' +
							
								'<% for(i = 1; i <= pages; i++){ %>' +
									'<% if (i == page) { %>' +
										'<li class="active"><a href="#"><%= i %></a></li>' +
									'<% } else { %>' +
										'<li><a href="#" class="pageNumber"><%= i %></a></li>' +
									'<% } %>' +
								'<% } %>' +
								
								'<% if (page == pages) { %>' +
								 	 '<li class="disabled"><a class="next" href="#">→</a></li> '+
								'<% } else { %>' +
									'<li><a href="#" class="last">Last</a></li>' +
									 '<li><a class="next" href="#">→</a></li> '+
								'<% } %>' +
								
							'<% } %>'),
					
		render: function() {
			$(this.el).html(this.template(this.collection.pageInfo()));
					
			return this;
		},
		
		previous: function(e) {
			e.preventDefault();
			this.collection.previousPage();
		},
		
		next: function(e) {
			e.preventDefault();
			this.collection.nextPage();
		},
		
		goToFirstPage: function(e) {
			e.preventDefault();
			this.collection.firstPage();
		},
		
		goToLastPage: function(e) {
			e.preventDefault();
			this.collection.lastPage();
		},
		
		goToPage: function(e) {
			e.preventDefault();
			this.collection.goTo( $(e.target).html() );						
		}
	});
})( MarketPlaceGH.views )