//Filename: BookView.js

define([
  'jquery',     
  'underscore', 
  'backbone',
  'text!app/templates/bookView-tpl.html'
], function($, _, Backbone, bookViewTemplate){

	var BookView = Backbone.View.extend({

			template : _.template(bookViewTemplate),
			
			render : function(){

				$(this.el).html(this.template(this.model.toJSON()));

				return this;
			}			

	});

    return BookView;

});