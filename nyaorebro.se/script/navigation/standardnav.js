// Globala variabler
var SESSION = request.getAttribute("sitevision.jcr.session");
var SV_UTILS = request.getAttribute("sitevision.utils");
var CURRENT_PAGE = SV_UTILS.getPortletContextUtil().getCurrentPage();
var linkRenderer = SV_UTILS.getLinkRenderer();
var instanceUtil = SV_UTILS.getInstanceTypeUtil();
var nodeTypeUtil = SV_UTILS.getNodeTypeUtil();
var outputUtil = SV_UTILS.getOutputUtil();
var TOPNAVLINKS_DEFAULT = 3;
 
var CSS_PREFIX = "or-";

var menuHTML = '';
// Loopar över alla undernoder och anropar callback
var forEachChild = function(node, callback) {
   var children = SV_UTILS.getNodeIteratorUtil().getMenuItems(node);
   while (children.hasNext()) {
      var child = children.next();
      callback(child);
   }
};
 

 
var getProperty = function(node, property, defaultValue) {
   if(defaultValue === undefined) {
   	return SV_UTILS.getPropertyUtil().getString(node, property);
   } else {
     return SV_UTILS.getPropertyUtil().getString(node, property, defaultValue); 
   }
};
 
 
var getMetadata = function(node, metadataName) {
   var metadata = getProperty(node, "menuMetadata");
   return metadata === null ? "" : metadata;
};
 
var getDisplayName = function(node) {
   return getProperty(node, "displayName");
};

var getNumberOfTopLinks = function(node) {
   return SV_UTILS.getPropertyUtil().getInt(node, "navLinksTop", TOPNAVLINKS_DEFAULT);         
};


var createLinkBlock = function(node, single){
   // hack för att ta reda på om länken är extern
   linkRenderer.setUseLinkDecorationSettings(true);
   linkRenderer.update(node);
   var external = '';
   if (linkRenderer.render().indexOf('sv-linkicon') > 0) {
      external = '<img alt="länk till annan webbplats" title="länk till annan webbplats" src="/sitevision/util/images/externallink.png" class="sv-linkicon">';   
   }
   out.println('      <li>');
   var text = '<h3 class="'+ CSS_PREFIX + 'title">' + getDisplayName(node) + external + '</h3>';
   var aFontClass = CSS_PREFIX + 'list-wrapper';
   if(single){ 
      aFontClass = aFontClass + ' ' + CSS_PREFIX + 'single';
   } else {
      text = text + '<p>' + getProperty(node, "navLinkDescription", "") + '</p>';
   }               
   linkRenderer.setUseLinkDecorationSettings(false);
   linkRenderer.setUseEncoding(false);
   linkRenderer.update(node);
   linkRenderer.setText(text);
   linkRenderer.setFontClass(aFontClass);
   out.println('        ' + linkRenderer.render());
   out.println('      </li>');

};
   

 
// Skriver ut navigation
var createNavigation = function() {     
   
   var parent = CURRENT_PAGE.getParent();
   
  // getSize returnerar -1...
   if(SV_UTILS.getNodeIteratorUtil().getMenuItems(parent).hasNext()) {
   
      out.println('<h2 class="subheading">ANDRA SIDOR UNDER ÄMNET ' + parent + '</h2>')
      out.println('    <ul class="' + CSS_PREFIX + 'nav-list">');
      var topNavLinks = getNumberOfTopLinks(CURRENT_PAGE);
      
      // Syskonsidor
      forEachChild(parent, function (child) {    
         if( linkRenderer.isValidTarget(child) && !CURRENT_PAGE.equals(child)) {
         	createLinkBlock(child, topNavLinks-- <= 0);            
      	}      
      });   
      
      
      var navLinksManual = SV_UTILS.getMetadataUtil().getRelatedMetadataPropertyValues(CURRENT_PAGE, 'navLinksManual');
      var i = 0;   
      while (i < navLinksManual.size()) {
         var navLink = navLinksManual.get(i);
         if(instanceUtil.isNode(navLink)){               
            if(nodeTypeUtil.isLink(navLink)){               
               createLinkBlock(navLink, true);  
            }   
         }
         i++;
      }
          
      out.println('    </ul>');
   }
   
};
 
// Start skript
createNavigation();