var PortletContextUtil = require('PortletContextUtil'),
	PropertyUtil = require('PropertyUtil'),
	NodeTypeUtil = require('NodeTypeUtil');

var imageUrl,	
	selectedImageNode = PropertyUtil.getNode(PortletContextUtil.getCurrentPage(),'topImg');

if(selectedImageNode && NodeTypeUtil.isImage(selectedImageNode)) {
	var imageCount = 1,
      imageUrl= PropertyUtil.getString(selectedImageNode, 'URI'); //Default url
      archiveNodes = selectedImageNode.getParent().getNodes();    	

   while(archiveNodes.hasNext()) {
      var currentNode = archiveNodes.next();      	
		//Om bild och slumpat värde, mellan 0 och nuvarande bildnummer, är 0
      if (NodeTypeUtil.isImage(currentNode) && Math.floor(Math.random() * imageCount++) === 0) {
         imageUrl= PropertyUtil.getString(currentNode, 'URI');
      }      		      
   }
}