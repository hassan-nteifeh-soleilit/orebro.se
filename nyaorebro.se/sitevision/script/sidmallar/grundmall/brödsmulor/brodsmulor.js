var MetadataUtil = require('MetadataUtil'),
	PropertyUtil = require('PropertyUtil'),
   PortletContextUtil = require('PortletContextUtil'),	
	LinkRenderer = require('LinkRenderer'),
	EndecUtil = require('EndecUtil'),
	NodeTreeUtil = require('NodeTreeUtil');
                           
var currentPage = PortletContextUtil.getCurrentPage(),
    root = PropertyUtil.getNode(currentPage,"menustart");