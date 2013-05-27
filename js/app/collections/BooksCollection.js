define([
	  'jquery',
	  'underscore',
	  'backbone',
	  'app/models/BookModel'], function($, _, Backbone, BookModel){
	
  var BooksCollection = Backbone.Collection.extend({
	   model : BookModel,
	   url   : 'api/books.json',
	   //parse : function(response){
		// return response.data;
	   //} 
  });

  // return Model <for public use>
  return BooksCollection;

});
