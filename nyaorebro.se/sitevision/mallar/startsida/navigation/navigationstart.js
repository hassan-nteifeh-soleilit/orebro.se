var PortletContextUtil= require('PortletContextUtil'),
    LinkRenderer = require('LinkRenderer'),
    NodeTypeUtil = require('NodeTypeUtil'),
    InstanceUtil = require('InstanceUtil'),
    PropertyUtil = require('PropertyUtil'),
		MetadataUtil = require('MetadataUtil'),
		NodeIteratorUtil = require('NodeIteratorUtil');

var CURRENT_PAGE = PortletContextUtil.getCurrentPage(),
    TOPNAVLINKS_DEFAULT = 6,
    MENU_TITLE = "Hej, vad kan vi hjälpa dig med?";

// Loopar över alla undernoder och anropar callback
var forEachChild = function(node, callback) {
   var children = NodeIteratorUtil.getMenuItems(node);
   while (children.hasNext()) {
      var child = children.next();
      callback(child);
   }
};
 
var getProperty = function(node, property, defaultValue) {
   if(defaultValue === undefined) {
   	return PropertyUtil.getString(node, property);
   } else {
     return PropertyUtil.getString(node, property, defaultValue); 
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
   var navTopLinks = PropertyUtil.getInt(node, "navLinksTop");      
   return navTopLinks === 0 ? TOPNAVLINKS_DEFAULT  : navTopLinks;
};

var createLinkBlock = function(node, small){
   out.println('      <li>');
   var pageDescription = getProperty(node, "navLinkDescription", "");
   var text = '<h3>' + getDisplayName(node) + '</h3>';
   if(!small) {
   	text = text + '<p>' + pageDescription  + '</p>';
	}
   LinkRenderer.setUseEncoding(false);
   LinkRenderer.update(node);
   LinkRenderer.setText(text);
   out.println('        ' + LinkRenderer.render());
   out.println('      </li>');

};
   
// Skriver ut navigation
var createNavigation = function() {     
   var topNavLinks = getNumberOfTopLinks(CURRENT_PAGE);
   var small = false;   
   out.println('<nav class="or-secondary">');   
   out.println('  <h2>' + MENU_TITLE + '</h2>');
   
   out.println('  <div class="or-content">');
   out.println('    <ul>');
   forEachChild(CURRENT_PAGE, function (child) {
      if(topNavLinks-- === 0) {
         out.println('    </ul>');
         out.println('    <ul class="or-extra">');          
         small = true;
      }
      createLinkBlock(child, small);      
   });   
   
   if(topNavLinks > 0) {
      out.println('    </ul>');
      out.println('    <ul class="or-extra">');                
   }
   
   var navLinksManual = MetadataUtil.getRelatedMetadataPropertyValues(CURRENT_PAGE, 'navLinksManual');
   var i = 0;   
   while (i < navLinksManual.size()) {
      var navLink = navLinksManual.get(i);
      if(InstanceUtil.isNode(navLink)){               
         if(NodeTypeUtil.isLink(navLink)){               
            createLinkBlock(navLink, true);  
         }   
      }
      i++;
   }
   out.println('    </ul>');
   out.println('  </div>');
   out.println('</nav>');
};
 
// Start skript
createNavigation();