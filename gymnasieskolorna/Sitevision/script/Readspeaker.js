var PropertyUtil = require('PropertyUtil');
var PortletContextUtil = require('PortletContextUtil');
var EndecUtil = require('EndecUtil');

var pageURL = PropertyUtil.getString(PortletContextUtil.getCurrentPage(),'URL');
pageURL = EndecUtil.encodeURL(pageURL);

var URL ='http://app.readspeaker.com/cgi-bin/rsent?customerid=4332&amp;lang=sv_se&amp;url=' + pageURL + '&amp;voice=erik22k&amp;readid=';

var contentNodeId = PortletContextUtil.getCurrentPortlet().getIdentifier().replace(".", "_");