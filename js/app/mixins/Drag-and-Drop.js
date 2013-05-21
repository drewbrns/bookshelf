//Drag and Drop

(function ($, mixins) {

	mixins.draganddrop = function()
	{
			//Drag N Drop
					
		  	var dragSrcEl = null;

			// algorithm 
			// 1. drag property .
			// 2. drop property in bin .
			// move property from location to bin .
			// rearrange all other properties to remove void left by the property .
			
			$('a#property').bind('dragstart', function(){
								
								//console.log("nodeName: " + event.target.nodeName); 
								
									$(this).css('opacity', 0.4);
									$(this).addClass('drag-animate');

									dragSrcEl = $(this).parent();

									event.dataTransfer.effectAllowed = 'move';
									event.dataTransfer.setData('text/html', $(this).html());

						  }).bind('dragover', function(){
									if (event.preventDefault) {
									    event.preventDefault(); // Necessary. Allows us to drop.
									}

									event.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

									return false;

						  }).bind('dragend', function(){

									$("a#property").css('opacity', 1);
									
									$(this).removeClass('drag-animate');									

									$("a#property").removeClass('over');
									
									$("#trash-container").removeClass('trash-over');

						  });			
							
						  $("#trash-container").bind('dragenter', function(){

									$(this).addClass('over-trash');

						  }).bind('dragleave', function(){

								    $(this).removeClass('over-trash');

						  }).bind('dragover', function(){
									if (event.preventDefault) {
									    event.preventDefault(); // Necessary. Allows us to drop.
									}

									event.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

									return false;

						  }).bind('drop', function(){

								if (event.stopPropagation) {
								    event.stopPropagation(); // stops the browser from redirecting.
								  }

								 // Don't do anything if dropping the same column we're dragging.
								  if (dragSrcEl != $(this)) {
								    // remove the selected element from view and drop into the bin.
							
									// do database things here, ie. set this property's recycled state to true.
								
								    dragSrcEl.remove();
							
									//increment counter, and indicate it here.
										// shows the number of properties in the bin.
							
							    
								    var count = $("#recycleBin-item-count").html();
							
								       count++;
									
									   $("#recycleBin-item-count").html(count);
								   
								  }

								  return false;	

						  }).bind('dragend', function(){

								$(this).removeClass('trash-over');

						  });							
		});
		
	};
	
}) (jQuery, RCHads.mixins);