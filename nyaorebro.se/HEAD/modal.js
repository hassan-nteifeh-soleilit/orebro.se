(function($){

	// Defining our jQuery plugin

	$.fn.modal_box = function(prop){

		// Default parameters

		var options = $.extend({
			height : "250",
			width : "800",
			top: "25%",
			left: "50%",
			ref: "#contact",
		},prop);
			      		
		init($(this));                     		
								
		$("a[href*='"+ options.ref +"']").click(function() {
			//add_block_page();
            $('.or-backdrop').show();
			add_popup_box();
			add_styles();
			
			$('.or-modal').fadeIn();
		});

		
		function add_styles(){			
			$('.or-modal').css({ 				
				'left':options.left,
				'top':options.top,            
				'width': options.width + 'px',
				'margin-top': (-Math.round(options.height/2)) + 'px',
				'margin-left': (-Math.round(options.width/2)) + 'px',
			});          
		}
		
		function add_block_page(){
			var block_page = $('<div class="or-backdrop" style="display:none"></div>');						
			$(block_page).appendTo('body');
		}
		 		
		 function add_popup_box(){			 			                                                             			 			 
			 $('.or-modal-close').click(function(){
				$(this).parent().fadeOut().hide();                         
				$('.or-backdrop').fadeOut().hide();		
                return false;		 
			 });
		}

      function init (selector) {
         $(selector).wrap('<div class="or-modal-content" ></div>');      
         $('.or-modal-content').wrap('<div class="or-modal" style="display:none;"></div>');
         $('.or-modal-content').before('<a href="#" class="or-modal-close"><i class="fa fa-close"></i> Stäng</a>');
         $(selector).show();   
         add_block_page();
      }
		
	};
	
})(jQuery);  