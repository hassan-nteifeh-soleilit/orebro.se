var propertyUtil = require('PropertyUtil'),
    contextUtil = require('PortletContextUtil'),
    currentPage = contextUtil.getCurrentPage(),
    showShare = propertyUtil.getString(currentPage,"show-share","Ja");