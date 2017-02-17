var ResourceUtil = require('ResourceLocatorUtil'),
    PropertyUtil = require('PropertyUtil');

// Returnerar noden som är dekorationsinnehållet.
var getContentNode = function() {
   var portletId = request.getContext().getCurrentContent();
   return ResourceUtil.getNodeByIdentifier(portletId);
};

try {
   var contentNode = getContentNode();

   if (contentNode) {
      var contentId = contentNode.getIdentifier().replace(".", "_"),
          contentName = PropertyUtil.getString(contentNode, 'displayName');
   }
} catch (e) {
   out.println("Antingen är sidan som är dekorerad felaktig eller så är kan inte sidan visas i detta läge: " + e);
}