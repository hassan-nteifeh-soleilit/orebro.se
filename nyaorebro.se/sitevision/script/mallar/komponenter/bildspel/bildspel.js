var PropertyUtil = require('PropertyUtil'),
    NodeTypeUtil = require('NodeTypeUtil'),
    ImageRenderer = require('ImageRenderer');

var currentPage = require('PortletContextUtil').getCurrentPage(),
    node = PropertyUtil.getNode(currentPage, 'carousel');

if (NodeTypeUtil.isImage(node)) {
   var folder = node.getParent().getNodes(); 

   ImageRenderer.forceUseTitleRendering();
   ImageRenderer.forceUseAutoTitle();
}