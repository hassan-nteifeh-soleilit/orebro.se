(function($) {
  $(function() {    
		if (!sv.PageContext.inEditMode) {
			/* Delegate on html works on html loaded by ajax calls */
			$('html').delegate('.or-wrapper-click', 'click', function (event) {            
				if(!$(event.target).is("a")) {
					if($('a:first', this).length > 0){
						try {
							$('a:first', this)[0].click();
						} catch(err) {
							window.location = $('a:first', this).attr("href");
						}
					}
				}
			});
			$('head').append('<style type="text/css">.or-wrapper-click { cursor: pointer; }</style>');
		}
     
		/* Case insensitive :contains */
		$.expr[':'].contains = function(a, i, m) {
			return $(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
		};  
		 
     /* Plusboxar */
		 
     $('.or-plus-box-content:not(.or-plus-box-v2, .or-plus-box-diskret-header)').css('display', 'none');
     $('.or-plus-box-header:not(.or-plus-box-v2, .or-plus-box-diskret-header)').click(function(){
       $(this).parent().next('div.or-plus-box-content').slideToggle();
       $(this).toggleClass('or-plus-box-active');
       $(this).find("img.or-arrow-down-collapse").toggleClass('or-plus-box-active');
       $(this).find(".or-collpase-button").toggleClass('or-plus-box-active');
       $(this).find("h4.plusboxxrubrik").toggleClass('or-plus-box-active');
       return false;
     });
     
      /* Kontakta oss "molnet" */
      $('.or-contact-bar-info-container').css('display', 'none');
      $('.or-contact-bar').click(function(){
         $(this).parent().next().slideToggle();
         $(this).find(".or-contact-bar-icon i").toggleClass('fa-rotate-45');
      });
     
        
      /* Ikoner i dokumentlistningsrutorna */
      $(".or-docs-box-content a").each(function( index ) {
				 var title = $(this).attr("title");
         var title = $( this ).attr("title");
         var iconCss, sizeStr;
         
         try {
            if(title && title.length>0) {
               title = title.replace('(', '').replace(')', '');
               var titleSplit = title.split(',');                              
               iconCss = titleSplit[0];                        
               sizeStr = '(' + titleSplit[1].replace(' ','')+')';                                 
            }            
         } catch(err) {}
         
         var content = '<div class="fileiconcontainer"><div class="iconfile' + iconCss + '"></div></div>'         
         $(this).before(content);   
         if(sizeStr){
            $(this).next().text( sizeStr );
         }
      
      });
	  
	  
			/* Ikoner i dokumentlistningsrutorna */
			$(".or-related-documents .or-text-content a").each(function(index) {
				var title = $(this).attr("title"),
					openInNewWindow = false,
					sizeStr;
					
				try {
					if (title && title.length > 0) {
							openInNewWindow = title.indexOf('öppnas i nytt fönster') !== -1;
							title = title.replace('(', '').replace(')', '').replace('öppnas i nytt fönster','');
							var titleSplit = title.split(',');						
							sizeStr = titleSplit[1].replace(' ', '');
					}
				} catch (err) {
					console.log('Error document icons');
				}
				
				if (sizeStr) {				
					$(this).find('.or-file-size').text(sizeStr);										
					if(openInNewWindow){
						$(this).append('<i style="font-size: 10px; position:static;" class="fa fa-clone fa-flip-vertical"></i>');				
					}
					$(this).next().text('');
				}
			});
			 
					
			/* Expandera meny items */
			$(".or-tree .or-toggle-panel").click(function() {
				$(this).parent().toggleClass("or-expanded");
			});
             
      /* Responsiva tabeller */  
      $(".sv-table-portlet table").stacktable({myClass:'stacktable small-only'});
      
           
  });
  
   
})(jQuery);



