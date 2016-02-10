(function($){

	// Defining our jQuery plugin

	$.fn.modal_box = function(prop){

		// Default parameters

		var options = $.extend({
			height : "250",
			width : "800",
			top: "25%",
			left: "50%",
		},prop);
			
      
		var selector = $(this).attr('data-target')      
	
		if (selector !== null ) {                                                     
		 init(selector);                     		
		}
			
	  
		return this.click(function(e){
			add_block_page();
			add_popup_box();
			add_styles();
			
			$('.or-modal').fadeIn();
		});

		
		function add_styles(){			
			$('.or-modal').css({ 				
				'position':'fixed', 
				'left':options.left,
				'top':options.top,            
				'display':'none',				
				'width': options.width + 'px',
				'margin-top': (-Math.round(options.height/2)) + 'px',
				'margin-left': (-Math.round(options.width/2)) + 'px',
				'border':'1px solid #fff',
				'box-shadow': '0px 2px 7px #292929',
				'-moz-box-shadow': '0px 2px 7px #292929',
				'-webkit-box-shadow': '0px 2px 7px #292929',
				'border-radius':'10px',
				'-moz-border-radius':'10px',
				'-webkit-border-radius':'10px',
				'background': '#f2f2f2', 
				'z-index':'11',
			});
          
			$('.or-modal-close').css({
				'position':'relative',
				'top':'20px',
				'left':'30px',
				'float':'left',
				'display':'block',
				'height':'50px',
				'width':'50px',				
			});
                 
			$('.or-modal-content').css({
				'background-color':'#fff',
				'padding':'10px',
				'margin':'15px',
				'border-radius':'10px',
				'-moz-border-radius':'10px',
				'-webkit-border-radius':'10px'
			});


			$('.or-backdrop').css({
				'position':'fixed',
				'top':'0',
				'left':'0',
				'background-color':'rgba(0,0,0,0.6)',
				'height':'100%',
				'width':'100%',
				'z-index':'10'
			});

		}
		
		function add_block_page(){
			var block_page = $('<div class="or-backdrop"></div>');						
			$(block_page).appendTo('body');
		}
		 		
		 function add_popup_box(){			 			                                                             			 			 
			 $('.or-modal-close').click(function(){
				$(this).parent().fadeOut().hide();                         
				$('.or-backdrop').fadeOut().remove();				 
			 });
		}

      function init (selector) {
         $(selector).wrap('<div class="or-modal-content" ></div>');      
         $('.or-modal-content').wrap('<div class="or-modal" style="display:none;"></div>');
         $('.or-modal-content').before('<a href="#" class="or-modal-close"><i class="fa fa-close"></i></a>');
         $(selector).show();   
      }
		
	};
	
})(jQuery);  