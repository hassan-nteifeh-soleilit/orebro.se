var PropertyUtil = require('PropertyUtil'),
    ResourceLocatorUtil = require('ResourceLocatorUtil');

// Returnerar noden som är dekorationsinnehållet.
var getContentNode = function() {
  var portletId = request.getContext().getCurrentContent();
  return ResourceLocatorUtil.getNodeByIdentifier(portletId);  
};

// Returnerar alla underliggande layoutnamn
var getLayoutNames = function(parentNode) {
  var layoutNames = [],
      nodes = parentNode.getNodes();
   
  nodes.forEachRemaining(function(node) {
    var layoutNode = PropertyUtil.getNode(node, "currentLayout");
    layoutNames.push(layoutNode.getName());
  });
  return layoutNames;
};

try {
  var contentNode = getContentNode(),
      contentNodeId = contentNode.getIdentifier().replace(".", "_"),
      layoutNames = getLayoutNames(contentNode);
   
} catch (e) {
  out.println("Antingen är sidan som är dekorerad felaktig eller så är kan inte sidan visas i detta läge: " + e);
}