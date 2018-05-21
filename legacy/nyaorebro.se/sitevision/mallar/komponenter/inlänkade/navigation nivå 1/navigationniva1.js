var PropertyUtil = require('PropertyUtil'),
    LinkRenderer = require('LinkRenderer'),
    NodeTypeUtil = require('NodeTypeUtil'),
    InstanceUtil = require('InstanceTypeUtil'),
    NodeIteratorUtil = require('NodeIteratorUtil');
	
var currentPage = require('PortletContextUtil').getCurrentPage(),
    TOPNAVLINKS_DEFAULT = 3;		

LinkRenderer.setUseEncoding(false);

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
   return getProperty(node, "menuMetadata", "");   
};
 
var getDisplayName = function(node) {
   return getProperty(node, "displayName");
};

var getNumberOfTopLinks = function(node) {
   var navTopLinks = PropertyUtil.getInt(node, "navLinksTop");      
   return navTopLinks === 0 ? TOPNAVLINKS_DEFAULT  : navTopLinks;
};


var createLinkBlock = function(node, small){   
   var text = '<h3>' + getDisplayName(node) + '</h3>';
   
   if(!small) {
   	text = text + '<p>' + getProperty(node, "navLinkDescription", "")  + '</p>';
	}
   
   out.println('      <li>');      
   LinkRenderer.update(node);
   LinkRenderer.setText(text);
   out.println('        ' + LinkRenderer.render());
   out.println('      </li>');

};
   

 
// Skriver ut navigation
var createNavigation = function() {     
   var topNavLinks = getNumberOfTopLinks(currentPage),
       small = false;
   
   out.println('<nav class="or-secondary">');
   out.println('  <h2>' + getDisplayName(currentPage) + '</h2>');
   out.println('  <div class="or-content">');
   out.println('    <ul>');
   forEachChild(currentPage, function (child) {
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

   var navLinksManual = require('MetadataUtil').getRelatedMetadataPropertyValues(currentPage, 'navLinksManual'),
       i = 0;   
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