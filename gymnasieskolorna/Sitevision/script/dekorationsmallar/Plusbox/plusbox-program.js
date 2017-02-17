var ResourceLocatorUtil = require('ResourceLocatorUtil'),
    PropertyUtil = require('PropertyUtil');

// Returnerar noden som är dekorationsinnehållet.
var getContentNode = function() {
   var portletId = request.getContext().getCurrentContent();
   return ResourceLocatorUtil.getNodeByIdentifier(portletId);
};


try {
   var contentNode = getContentNode();

   if (contentNode) {
      var contentId = contentNode.getIdentifier().replace(".", "_"),
          contentName = PropertyUtil.getString(contentNode, 'displayName');

      if(contentName.indexOf("[")>-1){
         var splitString = contentName.split('[');
         contentName = splitString[0];
         points = splitString[1].replace("]","");
      }
   }
} catch (e) {
   out.println("Antingen är sidan som är dekorerad felaktig eller så kan inte sidan visas i detta läge: " + e);   
}