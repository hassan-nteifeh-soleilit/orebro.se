var ARCHIVE_ID = '3.3342eaed15109c3d1d1ec9';


var utils = request.getAttribute('sitevision.utils');
var linkRenderer = utils.getLinkRenderer();
var scriptUtil = utils.getScriptUtil();
var propertyUtil = utils.getPropertyUtil();
var outputUtil = utils.getOutputUtil();
var resourceLocatorUtil = utils.getResourceLocatorUtil();


   
var archive = resourceLocatorUtil.getNodeByIdentifier(ARCHIVE_ID).getNodes();
var show = false;
var smallCss = "";

if(archive && archive.hasNext()) {
   
   var article = archive.next(); 
   
   //out.print(outputUtil.getNodeInfoAsHTML(article,1));
    
   
   var header = propertyUtil.getString(article,'SV.Title','');     
   var content = propertyUtil.getString(article,'SV.Content','');     
   var ingress = propertyUtil.getString(article,'SV.Description','');
  
   if(ingress.isEmpty()){      
      smallCss = "small";
   }
   
   linkRenderer.update(article, 'or-alert-button ' + smallCss , "MER INFORMATION");
   
   

   var target = propertyUtil.getNode(article,'alertMessageLink');
   var link = "";
         
                     
   if(target) {
      linkRenderer.setTarget(target);            
      var link = linkRenderer.render(); 
   } else {            
      target = propertyUtil.getString(article,'alertMessageLink');      
      
      if(target && !target.isEmpty()) {
         linkRenderer.setStringTarget(target);      
         var link = linkRenderer.render(); 
      }
  }
       
   show = true;

}
