var PropertyUtil = require('PropertyUtil'),
    PortletContextUtil = require('PortletContextUtil'),
    currPage = PortletContextUtil.getCurrentPage();

// Fetch the information
var pageTitle = PropertyUtil.getString(currPage, 'displayName'),
    url = PropertyUtil.getString(currPage, 'URL', '');