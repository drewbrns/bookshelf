(function (collections, model) {
	
	collections.RecycleBinProducts = Backbone.Collection.extend({
		model: model,

		initialize: function() {
			_.bindAll(this, 'parse', 'url', 'pageInfo', 'nextPage', 'previousPage', 'firstPage', 'lastPage', 'goTo');
			typeof(options) != 'undefined' || (options = {});
			this.page = 1;
			typeof(this.perPage) != 'undefined' || (this.perPage = 10);
		},
		
	  	fetch: function(options) {
			typeof(options) != 'undefined' || (options = {});
			this.trigger("fetching");
			var self = this;
			var success = options.success;
			options.success = function(resp) {
			  self.trigger("fetched");
			  if(success) { success(self, resp); }
			};
			return Backbone.Collection.prototype.fetch.call(this, options);
	  	},
		
	  	parse: function(resp) {
			this.page = resp.page;
			this.perPage = resp.perPage;
			this.total = resp.total;
			this.pages = Math.ceil(resp.total / resp.perPage);
			this.rbListings = resp.recycleBinListings;
	  	},
		
	  	url: function() {
			return '/marketplace.web/api/recycleBinProducts.php' + '?' + $.param({page: this.page, perPage: this.perPage});
	  	},
		
  		pageInfo: function() {
			var info = {
			  total: this.total,
			  page: this.page,
			  perPage: this.perPage,
			  pages: this.pages,
			  prev: false,
			  next: false,
			  rbListings: this.rbListings
			};

    		var max = Math.min(this.total, this.page * this.perPage);

			if (this.total == this.pages * this.perPage) {
			  max = this.total;
			}

    		info.range = [(this.page - 1) * this.perPage + 1, max];

			if (this.page > 1) {
			  info.prev = this.page - 1;
			}

			if (this.page < info.pages) {
			  info.next = this.page + 1;
			}

    		return info;
  		},
		
  		nextPage: function() {
			if (!this.pageInfo().next) {
			  return false;
			}
			this.page = this.page + 1;
			return this.fetch();
  		},
		
  		previousPage: function() {
			if (!this.pageInfo().prev) {
			  return false;
			}
			this.page = this.page - 1;
			return this.fetch();
		},
		
		firstPage: function() {
			this.page = 1;
			return this.fetch();
		},
		
		lastPage: function() {
			this.page = this.pages;
			return this.fetch();
		},
		
		goTo: function(pageNumber) {
			this.page = pageNumber;
			return this.fetch();
		}
	});
	
})(MarketPlaceGH.collections, MarketPlaceGH.models.RecycleBinProduct)