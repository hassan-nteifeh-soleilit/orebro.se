var PortletContextUtil = require('PortletContextUtil'),
    PropertyUtil = require ('PropertyUtil');
    
var sitenamn = PropertyUtil.getString(PortletContextUtil.getCurrentPage(),"sitenamn");