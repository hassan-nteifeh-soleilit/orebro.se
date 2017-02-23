var LinkRenderer = require('LinkRenderer'),
    ScriptUtil = require('ScriptUtil'),
    PropertyUtil = require('PropertyUtil'),
    MimeTypeUtil = require('MimeTypeUtil');

    
var url = '<span class="or-elmt-actn-link">...</span>',
    error,
    faIcon,
    size;

size = scriptVariables.SizeSmall ? "or-small" : "";    

if(scriptVariables.IconId === null || scriptVariables.IconId === "" ) {
   faIcon = "fa-chevron-right"; //Default fontawesome icon   
} else {
   faIcon = scriptVariables.IconId;
}

if (scriptVariables.LinkInternal === null && scriptVariables.LinkDoc === null && (scriptVariables.LinkExternal === null || scriptVariables.LinkExternal === ""))  {  	
   error = "Ställ in extern adress, intern sida <b>eller</b> intern fil";
   
} else if (scriptVariables.LinkText === null || scriptVariables.LinkText === ""){
   error = "Länktext saknas";
} else {
	//LinkRenderer.setFontClass("or-elmt-action-link");   
   LinkRenderer.setFontClass("or-elmt-actn-link");   
      
   
   if(!(scriptVariables.LinkExternal === null || scriptVariables.LinkExternal === "") ) {         	
         if(scriptVariables.LinkExternal.startsWith("http")){         
         	LinkRenderer.setStringTarget(scriptVariables.LinkExternal);
         }else {
            LinkRenderer.setStringTarget("http://" + scriptVariables.LinkExternal);
         }
			
      	LinkRenderer.setText(scriptVariables.LinkText); 
      	url = LinkRenderer.render();        	
                  
   } else if(scriptVariables.LinkInternal !== null) {
       if (LinkRenderer.isValidTarget(scriptVariables.LinkInternal))  {
          LinkRenderer.update(scriptVariables.LinkInternal);                 
          LinkRenderer.setText(scriptVariables.LinkText);                     
          url = LinkRenderer.render();          
       } else {        
      	 error ="Ogiltig intern sida.";         
       }    
      
   } else if(scriptVariables.LinkDoc !== null) {
    	
      var size = PropertyUtil.getDouble(scriptVariables.LinkDoc, 'length',0),
          mime = PropertyUtil.getString(scriptVariables.LinkDoc, 'mimeType', ""),
          fileInfo = "";	
      
      
      if(!(size === 0 && mime === "")){
         fileInfo = ' (' + MimeTypeUtil.getExtension(mime) + ', '+ ScriptUtil.getHumanPresentableSize(size) + ')';
      }
  
      if (LinkRenderer.isValidTarget(scriptVariables.LinkDoc))  {
         LinkRenderer.clearUseResourceDecorationSettings();
         LinkRenderer.update(scriptVariables.LinkDoc);                 
         LinkRenderer.setText(scriptVariables.LinkText + fileInfo);                     
         url = LinkRenderer.render();          
      } else {        
         error ="Ogiltig fil.";         
      }    
      
   } else {
      error = "Ett oväntat fel, kontakta systemansvarig";
      
         	
   }

}   