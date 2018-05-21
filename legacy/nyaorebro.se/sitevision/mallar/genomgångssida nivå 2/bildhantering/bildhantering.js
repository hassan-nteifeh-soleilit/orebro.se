var PropertyUtil = require('PropertyUtil'),
    NodeTypeUtil = require('NodeTypeUtil');

var currPage = require('PortletContextUtil').getCurrentPage(),
    node = PropertyUtil.getNode(currPage, 'topImg');

if (NodeTypeUtil.isImage(node)) {
   var topImgUrl = PropertyUtil.getString(node,'URI');    
}