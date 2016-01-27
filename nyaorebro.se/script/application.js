(function($) {
  $(function() {    
    if(!sv.PageContext.inEditMode) {
      $('html').delegate('.or-wrapper-click', 'click', function (event) {
         
         if(!$(event.target).is("a")) {
            if($('a:first', this)){
               $('a:first', this)[0].click();
            }
         }
      });
      
      $('head').append('<style type="text/css">.or-wrapper-click { cursor: pointer; }</style>');
    }
     
     
     
     /* Plusboxar */
     $('.or-plus-box-content').css('display', 'none');
     $('.or-plus-box-header').click(function(){
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
     
      var iconDecorator =  function( index ) {
      
         var title = $( this ).attr("title").replace('(','').replace(')','');
         var iconCss, sizeStr;
         
         try {
            if(title && title.length>0) {
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
      
      } 
	  
	  /*
	  $('.or-text-content a > img').each(function() {
		$(this).parent().after(this);
	  })
	  */
	  var iconDecorator2 =  function( index ) {
      
         var title = $( this ).attr("title").replace('(','').replace(')','');
         var icon, sizeStr;
         
		 $(this)
         try {
            if(title && title.length>0) {
               var titleSplit = title.split(',');                              
               icon = titleSplit[0];                        
               sizeStr = titleSplit[1].replace(' ','');                                 
            }            
         } catch(err) {}
         
         
         if(sizeStr){
			switch (icon) {
				case 'doc':
					icon = 'word';
					break;
				case 'pdf':
					icon = 'pdf';		
					break;
				case 'xls':
					icon = 'excel';
					break;
				default:
					icon = '';				 
			}
			var content = '<i class="fa fa-file-'+ icon +'-o"><span>'+ sizeStr +'</span></i>'         
			$(this).prepend(content);   
            $(this).next().text( '' );
         }
      
      } 
		
      /* Ikoner i dokumentlistningsrutorna */
      $(".or-docs-box-content a").each(iconDecorator);
	  $(".or-related-links .or-text-content a").each(iconDecorator2);
   
             
      /* Responsiva tabeller */  
      $(".sv-table-portlet table").stacktable({myClass:'stacktable small-only'});
      
           
  });
  
   
})(jQuery);



