var ResourceUtil = require('ResourceLocatorUtil');
var PropertyUtil = require('PropertyUtil');
var PortletContextUtil = require('PortletContextUtil');

// Returnerar noden som är dekorationsinnehållet.
var getContentNode = function() {
  var portletId = request.getContext().getCurrentContent();
  return ResourceUtil.getNodeByIdentifier(portletId);
};

var getParameter = function(param) {
  var value = request.getParameter(param);
  if (value === null) {
    return '';
  }
  return value;
};

try {
   var query = getParameter("q");
  var contentNode = getContentNode();
  if (contentNode) {
    var contentId = contentNode.getIdentifier().replace(".", "_");
    var contentName = PropertyUtil.getString(contentNode, 'displayName');
  }
} catch (e) {
  out.println("Antingen är sidan som är dekorerad felaktig eller så är kan inte sidan visas i detta läge: " + e);
}