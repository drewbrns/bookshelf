define([
	  'jquery',
	  'underscore',
	  'backbone'], function($, _, Backbone){
	
  var BookModel = Backbone.Model.extend({
	   idAttribute : "_id"
  });

  // return Model <for public use>
  return BookModel;

});
