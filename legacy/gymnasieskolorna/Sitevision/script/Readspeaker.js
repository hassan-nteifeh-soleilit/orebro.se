var PropertyUtil = require('PropertyUtil'),
 PortletContextUtil = require('PortletContextUtil'),
 EndecUtil = require('EndecUtil');

var pageURL = EndecUtil.encodeURL("www.orebro.se/" + PropertyUtil.getString(PortletContextUtil.getCurrentPage(),'URI'));

var URL ='//app-eu.readspeaker.com/cgi-bin/rsent?customerid=4332&lang=sv_se&url=' + pageURL + '&voice=erik22k&readid=';

var contentNodeId = PortletContextUtil.getCurrentPortlet().getIdentifier().replace(".", "_");
