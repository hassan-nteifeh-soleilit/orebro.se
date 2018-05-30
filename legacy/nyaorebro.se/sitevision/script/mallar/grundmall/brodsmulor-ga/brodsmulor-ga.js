var PropertyUtil = require('PropertyUtil'),
 	LinkRenderer = require('LinkRenderer'),
	NodeTreeUtil = require('NodeTreeUtil'),
	PortletContextUtil = require('PortletContextUtil'),
	EndecUtil = require('EndecUtil');    
 
var currentPage = PortletContextUtil.getCurrentPage(),
	root = PropertyUtil.getNode(currentPage,"menustart"),
	gaId = PropertyUtil.getString(currentPage,"gaTrackingId"),
	gaPath = '/';