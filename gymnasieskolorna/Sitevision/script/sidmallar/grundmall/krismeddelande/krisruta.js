var ARCHIVE_ID = '3.1ce67f8114fb4fd5cb318ae';


var linkRenderer = require('LinkRenderer');
var scriptUtil = require('ScriptUtil');
var propertyUtil = require('PropertyUtil');
var outputUtil = require('OutputUtil');
var resourceUtil = require('ResourceLocatorUtil');
var portletContextUtil = require('PortletContextUtil');

var currentPage = portletContextUtil.getCurrentPage();
var siteName = propertyUtil.getString(currentPage, 'sitenamn');

var archive = resourceUtil.getNodeByIdentifier(ARCHIVE_ID).getNodes();
var show = false;
var smallCss = "";


while(archive && archive.hasNext() && !show) {
   
   var article = archive.next(); 

   var showSites = propertyUtil.getStrings(article,'criseMessageSelector');      
   
   if(showSites.isEmpty() || showSites.contains(siteName)) {
      var header = propertyUtil.getString(article,'SV.Title','');     
      var content = propertyUtil.getString(article,'SV.Content','');     
      var ingress = propertyUtil.getString(article,'SV.Description','');

      var ingress = propertyUtil.getString(article,'SV.Description','');

      if(ingress && ingress.isEmpty()){      
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
          
}