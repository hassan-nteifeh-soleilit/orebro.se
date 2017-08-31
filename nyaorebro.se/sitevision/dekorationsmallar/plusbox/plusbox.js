var ResourceLocatorUtil = require('ResourceLocatorUtil'),
    PropertyUtil = require('PropertyUtil');

var interface = {
    /* Text - Klass för omgivande <div>. Om ej angiven skapas ingen div. */
    wrapperClass: scriptVariables.wrapperClass,
    /* Text - Fontawesomeikon, t ex "fa-comments". */
    icon: scriptVariables.icon,
    /* Text - Titel, "%s" ersätts med det dekorerades namn. */
    title: scriptVariables.title
};

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
   }
   if (interface.title && interface.title !== '') {
        contentName = interface.title.replace("%s", contentName || "").trim();
   }
} catch (e) {
   out.println("Antingen är sidan som är dekorerad felaktig eller så är kan inte sidan visas i detta läge: " + e);
}
