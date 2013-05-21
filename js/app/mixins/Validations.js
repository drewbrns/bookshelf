//Utility functions to aid in quicker coding...

(function ($, validation) {

		validation.categoryValidation = function(){
			var ele = $('#categoryContainer');
			
			if($('#category option:selected').val() == '') {
				RCHads.validation.errors = true;
				
				ele.removeClass('success').addClass('error');
				$('#categoryContainer .control-label small').remove();
				$('#categoryContainer .control-label').append(' <small style="font-size:0.85em;">(Please select a category)</small>');
				setInterval(function(){
					$('#categoryContainer .control-label small').fadeTo(700, 0, function(){
						$(this).fadeTo(700, 1);												  
					});					
				}, 4100);
			} else {
				ele.removeClass('error').addClass('success')
				$('#categoryContainer .control-label small').remove();
			}
		},
		
		validation.rent_saleValidation = function(){
			var ele = $('#rentOrSaleContainer');
			
			if($('input[name="optionsRentOrSale"]:checked').length === 0) {
				RCHads.validation.errors = true;
				
				ele.removeClass('success').addClass('error')
				$('#rentOrSaleContainer .control-label small').remove();
				$('#rentOrSaleContainer .control-label').append(' <small style="font-size:0.85em;">(Rent or Sale?)</small>');
				$('#rentOrSaleContainer .controls label').css('color', '#b94a48');
				setInterval(function(){
					$('#rentOrSaleContainer .control-label small').fadeTo(700, 0, function(){
						$(this).fadeTo(700, 1);												  
					});					
				}, 4100);
			} else {
				ele.removeClass('error').addClass('success');
				$('#rentOrSaleContainer .control-label small').remove();
				$('#rentOrSaleContainer .controls label').css('color', '#468847');
			}
		},
		
		validation.titleValidation = function(){
			var ele = $('#titleContainer');
			
			if(ele.find('#title').val().trim().length < 6) {
				RCHads.validation.errors = true;
				
				ele.removeClass('success').addClass('error');
				$('#titleContainer .control-label small').remove();
				$('#titleContainer .control-label').append(' <small style="font-size:0.85em;">(Please help people identify your property)</small>');
				setInterval(function(){
					$('#titleContainer .control-label small').fadeTo(700, 0, function(){
						$(this).fadeTo(700, 1);												  
					});					
				}, 4100);
			} else {
				ele.removeClass('error').addClass('success');
				$('#titleContainer .control-label small').remove();
			}
		},
		
		validation.descriptionValidation = function(){	
			var ele = $('#descriptionContainer');
			
			if(ele.find('#descriptionTextArea').val().trim().length < 6) {
				RCHads.validation.errors = true;
				
				ele.removeClass('success').addClass('error');	
				$('#descriptionContainer .control-label small').remove();
				$('#descriptionContainer .control-label').append(' <small style="font-size:0.85em;">(What would you like to tell people about your property?)</small>');
				setInterval(function(){
					$('#descriptionContainer .control-label small').fadeTo(700, 0, function(){
						$(this).fadeTo(700, 1);												  
					});					
				}, 4100);
			} else {
				ele.removeClass('error').addClass('success');
				$('#descriptionContainer .control-label small').remove();
			}
		},
		
		/*validation.featuresValidation = function(){		
			var featuresInfo = $('#featuresInfo');
			var ele = $('#featuresContainer');
			
			if(ele.find('#featuresTextArea').val().length < 6) {
				RCHads.validation.errors = true;
				featuresInfo.removeClass('correct').addClass('error').html('&larr; at least 6 characters').show();
				ele.removeClass('success').addClass('error');				
			} else {
				featuresInfo.removeClass('error').addClass('correct').html('&radic;').hide();
				ele.removeClass('error').addClass('success');
			}
		},*/
		
		validation.roomsValidation = function(){
			var ele = $('#noofroomsContainer');
			
			if($('#noofrooms option:selected').val() == '') {
				RCHads.validation.errors = true;
				
				ele.removeClass('success').addClass('error');
				$('#noofroomsContainer .controls small').remove();
				$('#noofroomsContainer .controls').append(' <small style="font-size:0.85em; color: #b94a48;">(How many rooms does your property have?)</small>');
				setInterval(function(){
					$('#noofroomsContainer .controls small').fadeTo(700, 0, function(){
						$(this).fadeTo(700, 1);												  
					});					
				}, 4100);
			} else {
				ele.removeClass('error').addClass('success');
				$('#noofroomsContainer .controls small').remove();
			}
		},
		
		validation.bathsValidation = function(){
			var ele = $('#noofbathsContainer');
			
			if($('#noofbaths option:selected').val() == '') {
				RCHads.validation.errors = true;
				
				ele.removeClass('success').addClass('error');
				$('#noofbathsContainer small').remove();
				$('#noofbathsContainer').append(' <small style="font-size:0.85em; color: #b94a48;">(How many bathrooms does your property have?)</small>');
				setInterval(function(){
					$('#noofbathsContainer small').fadeTo(700, 0, function(){
						$(this).fadeTo(700, 1);												  
					});					
				}, 4100);
			} else {
				ele.removeClass('error').addClass('success');
				$('#noofbathsContainer small').remove();
			}
		},
		
		validation.locationValidation = function(){
			var ele = $('#locationContainer');
			
			if($('#property-location').val().trim().length < 2) {
				RCHads.validation.errors = true;
				
				ele.removeClass('success').addClass('error');	
				$('#locationContainer .control-label small').remove();
				$('#locationContainer .control-label').append(' <small style="font-size:0.85em;">(Where is your property located?)</small>');
				setInterval(function(){
					$('#locationContainer .control-label small').fadeTo(700, 0, function(){
						$(this).fadeTo(700, 1);												  
					});					
				}, 4100);
			} else {
				ele.removeClass('error').addClass('success');
				$('#locationContainer .control-label small').remove();
			}
		},
		
		validation.priceValidation = function(){
			var ele = $('#priceContainer');			
			var eleVal = ele.find(".price-Id").val();
			
			var pricePattern = /^[0-9]+[0-9,]*[0-9]*$/;
			
			if( eleVal.length == '' || !pricePattern.test(eleVal) ) {
				RCHads.validation.errors = true;
				
				ele.removeClass('success').addClass('error');
				$('#priceContainer .control-label small').remove();
				$('#priceContainer .control-label').append(' <small style="font-size:0.85em;">(How much is your property going for?)</small>');
				setInterval(function(){
					$('#priceContainer .control-label small').fadeTo(700, 0, function(){
						$(this).fadeTo(700, 1);												  
					});					
				}, 4100);
			} else {
				ele.removeClass('error').addClass('success');
				$('#priceContainer .control-label small').remove();
			}
		},
		
		validation.firstImageValidation = function(){
			var firstImageInfo = $('#firstImageInfo');
			var ele = $('#firstImageContainer');
			
			if(ele.find('input[type="file"]').val().length == 0) {
				RCHads.validation.errors = true;
				firstImageInfo.removeClass('correct').addClass('error').html('&larr; at least 6 characters').show();
				ele.removeClass('success').addClass('error');				
			} else {
				firstImageInfo.removeClass('error').addClass('correct').html('&radic;').show();
				ele.removeClass('error').addClass('success');
			}
		}

}) (jQuery, MarketPlaceGH.validation);