var PropertyUtil = require('PropertyUtil'),
 PortletContextUtil = require('PortletContextUtil'),
 EndecUtil = require('EndecUtil');

var pageURL = EndecUtil.encodeURL("www.orebro.se/" + PropertyUtil.getString(PortletContextUtil.getCurrentPage(),'URI'));

var URL ='//app.readspeaker.com/cgi-bin/rsent?customerid=4332&amp;lang=sv_se&amp;url=' + pageURL + '&amp;voice=erik22k&amp;readid=';

var contentNodeId = PortletContextUtil.getCurrentPortlet().getIdentifier().replace(".", "_");
