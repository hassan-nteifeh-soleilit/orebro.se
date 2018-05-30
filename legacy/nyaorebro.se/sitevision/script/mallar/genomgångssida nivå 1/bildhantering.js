var propertyUtil = require('PropertyUtil');
var nodeTypeUtil = require('NodeTypeUtil');
var portletContextUtil = require('PortletContextUtil');

var currPage = portletContextUtil.getCurrentPage();

var node = propertyUtil.getNode(currPage, 'backgroundImg');
if (nodeTypeUtil.isImage(node)) {
   var backgroundImgUrl = propertyUtil.getString(node,'URI'); 
}

node = propertyUtil.getNode(currPage, 'topImg');
if (nodeTypeUtil.isImage(node)) {
   var topImgUrl = propertyUtil.getString(node,'URI'); 
}