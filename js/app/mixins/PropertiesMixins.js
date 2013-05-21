//Utility functions to aid in quicker coding...

(function ($, mixins) {

	mixins.addPropertyImage = function (target, addButton, removeButton, limit){
	
		if ( counter <= limit ) {

			target.append(
				
					'<div id="appended'+counter+'" class="controls rchads-image-upload-container">' +
						 
					  '<div class="rchads-image-upload-number"><h1>'+counter+'</h1></div>'+
				
					  '<ul class="thumbnails rchads-image-upload-preview">'+
					  	'<li class="span2" style="width:110px;">'+
						  '<a id="preview" href="javascript:;" class="thumbnail">'+
						   	'<img src="../resources/images/rchads_2.jpg" />'+
						  '</a>'+
						'</li>'+
					  '</ul>'+
					
					  '<div class="rchads-image-upload-actions">'+
					      '<div id="upload-image-button" class="rchads-upload-btn">'+
						    '<div id="selected-image-name" class="rchads-selected-image-name">No Image Selected</div>'+
						    '<div class="btn pull-right" style="margin-top:-1px;">Select Image</div>'+
						  '</div> '+
						  '<input  class="input-file rchads-hidden-file-input" id="image'+counter+'" type="file" name="image'+counter+'" />' +
						  '<input type="text" class="span3"  name="captionForImage'+counter+'" placeholder="caption" /> ' +
					  '</div>'+	

 					  '<br class="clear" />'+	
	
					'</div>'
			    
			    );	
				
				++counter;
				
				if (counter == limit+1)
				{
					addButton.addClass("disabled");
					counter = limit+1;
				}

			    removeButton.removeClass("disabled");

		} else {

			counter = limit+1;

		}
	
		
	};
	
	mixins.removePropertyImage = function(removeButton, addButton){
		if (counter <= 2 )
		{ 
			counter = 2;
		}
		else {
		    --counter;									
			$("label#appended"+counter).remove();
			$("div#appended"+counter).remove();

			if (counter == 2)
			{
			  removeButton.addClass("disabled");
			}

			addButton.removeClass("disabled");					

	    }
	};
	
	mixins.animate = function(item){
			$(this).find(item).toggle();
	}
	
}) (jQuery, MarketPlaceGH.mixins);