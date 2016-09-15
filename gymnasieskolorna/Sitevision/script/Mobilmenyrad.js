var propertyUtil = require('PropertyUtil');
var nodeTypeUtil = require('NodeTypeUtil');
var portletContextUtil  = require('PortletContextUtil');
var dollar ='$';


var currentPage = portletContextUtil.getCurrentPage();
var linkNode = propertyUtil.getNode(currentPage, "menustart");
var imageNode = propertyUtil.getNode(currentPage, "header-icon");
var headerText = propertyUtil.getString(currentPage, "heder-topp-text",""); 

if(!headerText.isEmpty()) {
   //Temporay fix, TODO: remove text with html
	headerText = headerText.replace(/<[^>]*>/g, ' ')
               .replace(/\s{2,}/g, ' ')
               .trim();
}
              


var imagURI="";

if (linkNode !== null && nodeTypeUtil.isTypeOf(linkNode, [nodeTypeUtil.SITE_PAGE_TYPE, nodeTypeUtil.PAGE_TYPE] )){   
   linkNode = propertyUtil.getString(linkNode, "URI");   
}


if (imageNode !== null && nodeTypeUtil.isTypeOf(imageNode, [nodeTypeUtil.IMAGE_TYPE] )){   
   imagURI = propertyUtil.getString(imageNode, "URI");
}
