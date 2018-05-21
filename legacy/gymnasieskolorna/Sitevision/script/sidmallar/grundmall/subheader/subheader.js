var svUtils = request.getAttribute("sitevision.utils");
var currentPage = svUtils.getPortletContextUtil().getCurrentPage();
var propertyUtil = svUtils.getPropertyUtil();
 
var displayContact = !(currentPage.hasProperty('contactUsInBar') && propertyUtil.getString(currentPage, 'contactUsInBar').equals('Nej'));
