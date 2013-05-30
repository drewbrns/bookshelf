define([
	  'jquery',
	  'underscore',
	  'backbone',
	  'app/models/BookModel'], function($, _, Backbone, BookModel){
	
  var BooksCollection = Backbone.Collection.extend({
	   model : BookModel,
	   url   : 'http://localhost:8080/books', 
	 //  parse : function(response){
			//console.log(response);
			//return response.data;
			
		//	console.log(response);
			
		//	return response;
	  //} 
  });

  // return Collection <for public use>
  return BooksCollection;

});
