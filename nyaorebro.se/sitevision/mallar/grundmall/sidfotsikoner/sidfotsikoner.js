var propertyUtil = require('PropertyUtil'),
	portletContextUtil = require('PortletContextUtil'),
	resourceLocatorUtil = require('ResourceLocatorUtil'),
	page = portletContextUtil.getCurrentPage(), 
	siteName = encodeURIComponent( resourceLocatorUtil.getSite() ),
	pageName = encodeURIComponent( propertyUtil.getString( page, 'displayName' ) ),
	url = "www.orebro.se" + encodeURIComponent( propertyUtil.getString( page, 'URI' ) );
 