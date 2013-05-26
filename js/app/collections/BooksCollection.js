define([
	  'jquery',
	  'underscore',
	  'backbone',
	  'app/models/BookModel'], function($, _, Backbone, BookModel){
	
  var BooksCollection = Backbone.Collection.extend({
	   model : BookModel,
	   url   : '/books'
  });

  // return Model <for public use>
  return BooksCollection;

});
