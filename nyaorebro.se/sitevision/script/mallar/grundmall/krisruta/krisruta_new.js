var ARCHIVE_ID = '3.3342eaed15109c3d1d1ec9';


var LinkRenderer = require('LinkRenderer'),
    PropertyUtil = require('PropertyUtil'),
    resourceLocatorUtil = require('ResourceLocatorUtil');

//var archive = resourceLocatorUtil.getNodeByIdentifier(ARCHIVE_ID).getNodes(),
var archive = scriptVariables.archiveNode.getNodes(),
    show = false,
    smallCss = "";

if(archive && archive.hasNext()) {
   
   var article = archive.next(),
       header = PropertyUtil.getString(article,'SV.Title',''),
       content = PropertyUtil.getString(article,'SV.Content',''),
       ingress = PropertyUtil.getString(article,'SV.Description','');
  
   if(ingress.isEmpty()){      
      smallCss = "small";
   }
   
   LinkRenderer.update(article, 'or-alert-button ' + smallCss , "MER INFORMATION");

   var target = PropertyUtil.getNode(article,'alertMessageLink'),
       link = "";
         
   if(target) {
      LinkRenderer.setTarget(target);            
      link = LinkRenderer.render(); 
   } else {            
      target = PropertyUtil.getString(article,'alertMessageLink');      
      
      if(target && !target.isEmpty()) {
         LinkRenderer.setStringTarget(target);      
         link = LinkRenderer.render(); 
      }
  }
   show = true;
}
