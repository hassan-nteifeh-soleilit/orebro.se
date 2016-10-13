var PropertyUtil = require('PropertyUtil'),
	NodeTypeUtil = require('NodeTypeUtil'),
	PortletContextUtil  = require('PortletContextUtil');

var imagURI="",
	dollar ='$';

var currentPage = PortletContextUtil.getCurrentPage(),
	linkNode = PropertyUtil.getNode(currentPage, "menustart"),
	imageNode = PropertyUtil.getNode(currentPage, "header-icon"),
	headerTopp = PropertyUtil.getString(currentPage, "heder-topp-text",""),
	headerBottom = PropertyUtil.getString(currentPage, "header-bottom-text",""); 

if(!headerTopp.isEmpty()) {
   //Temporay fix, TODO: remove text with html
	headerTopp = headerTopp.replace(/<[^>]*>/g, ' ')
               .replace(/\s{2,}/g, ' ')
               .trim();
}

if(!headerBottom.isEmpty()) {
   //Temporay fix, TODO: remove text with html
	headerBottom = headerBottom.replace(/<[^>]*>/g, ' ')
               .replace(/\s{2,}/g, ' ')
               .trim();
}

if (linkNode !== null && NodeTypeUtil.isTypeOf(linkNode, [NodeTypeUtil.SITE_PAGE_TYPE, NodeTypeUtil.PAGE_TYPE] )){   
   linkNode = PropertyUtil.getString(linkNode, "URI");   
}

if (imageNode !== null && NodeTypeUtil.isTypeOf(imageNode, [NodeTypeUtil.IMAGE_TYPE] )){   
   imagURI = PropertyUtil.getString(imageNode, "URI");
}
