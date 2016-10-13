var ARCHIVE_ID = '3.1ce67f8114fb4fd5cb318ae'; // GY
var ARCHIVE_ID = '3.3ea82f1c1507495b49b37ec'; // EX


var utils = request.getAttribute('sitevision.utils');
var linkRenderer = utils.getLinkRenderer();
var scriptUtil = utils.getScriptUtil();
var propertyUtil = utils.getPropertyUtil();
var outputUtil = utils.getOutputUtil();
var jcrSession = request.getAttribute('sitevision.jcr.session');

var archive = jcrSession.getNodeByIdentifier(ARCHIVE_ID).getNodes();
var show = false;
var smallCss = "";

if(archive && archive.hasNext()) {
   
   var article = archive.next(); 
   
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
      
      if(!target.isEmpty()) {
         linkRenderer.setStringTarget(target);      
         var link = linkRenderer.render(); 
      }
  }
        
   show = true;
          
}