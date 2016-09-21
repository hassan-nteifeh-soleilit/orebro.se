var svUtils = request.getAttribute("sitevision.utils");
var propertyUtil = svUtils.getPropertyUtil();
var nodeTypeUtil = svUtils.getNodeTypeUtil();
var dollar ='$';

//Noden är currentPage 
var currentPage = svUtils.getPortletContextUtil().getCurrentPage();
var linkNode = propertyUtil.getNode(currentPage, "menustart");

if (linkNode !== null && nodeTypeUtil.isTypeOf(linkNode, [nodeTypeUtil.SITE_PAGE_TYPE, nodeTypeUtil.PAGE_TYPE] )){   
   linkNode = propertyUtil.getString(linkNode, "URI");   
}

/*
var PropertyUtil = require ('PropertyUtil'),
	NodeTypeUtil = require('NodeTypeUtil'),
	PortletContextUtil = require('PortletContextUtil'),	
	linkNode = PropertyUtil.getNode(PortletContextUtil.getCurrentPage(), "menustart");
	dollar ='$';

if (linkNode !== null && NodeTypeUtil.isTypeOf(linkNode, [NodeTypeUtil.SITE_PAGE_TYPE, NodeTypeUtil.PAGE_TYPE] )){   
   linkNode = PropertyUtil.getString(linkNode, "URI");   
}
*/