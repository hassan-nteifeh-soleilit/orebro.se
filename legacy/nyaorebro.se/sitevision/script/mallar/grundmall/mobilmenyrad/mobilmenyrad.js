var PropertyUtil = require ('PropertyUtil'),
    NodeTypeUtil = require('NodeTypeUtil'),
    PortletContextUtil = require('PortletContextUtil'),
    linkNode = PropertyUtil.getNode(PortletContextUtil.getCurrentPage(), "menustart"),
    linkStartNode = PropertyUtil.getNode(PortletContextUtil.getCurrentPage(), "sitestart"),
    dollar ='$';

if (linkNode !== null && NodeTypeUtil.isTypeOf(linkNode, [NodeTypeUtil.SITE_PAGE_TYPE, NodeTypeUtil.PAGE_TYPE] )){   
   linkNode = PropertyUtil.getString(linkNode, "URI");  
}
if (linkStartNode !== null && NodeTypeUtil.isTypeOf(linkStartNode, [NodeTypeUtil.SITE_PAGE_TYPE, NodeTypeUtil.PAGE_TYPE] )){   
   linkStartNode = PropertyUtil.getString(linkStartNode, "URI");  
}