var PropertyUtil = require('PropertyUtil');
var ResourceLocatorUtil = require('ResourceLocatorUtil');

// Returnerar noden som är dekorationsinnehållet.
var getContentNode = function() {
  var portletId = request.getContext().getCurrentContent();
  return ResourceLocatorUtil.getNodeByIdentifier(portletId);
};

// Returnerar alla underliggande layoutnamn
var getLayoutNames = function(parentNode) {
  var layoutNames = [];
  var nodes = parentNode.getNodes();
  nodes.forEachRemaining(function(node) {
    var layoutNode = PropertyUtil.getNode(node, "currentLayout");
    layoutNames.push(layoutNode.getName());
  });
  return layoutNames;
};

/**************************************************************************************
 *
 * Main function
 *
 **************************************************************************************/
try {
  var contentNode = getContentNode();
  var contentNodeId = contentNode.getIdentifier().replace(".", "_");
  var layoutNames = getLayoutNames(contentNode);
} catch (e) {
  out.println("Antingen är sidan som är dekorerad felaktig eller så är kan inte sidan visas i detta läge: " + e);
}