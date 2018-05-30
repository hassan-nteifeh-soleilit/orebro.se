var ResourceLocatorUtil  = require("ResourceLocatorUtil"),
  currentPage = require("PortletContextUtil").getCurrentPage(),
  PropertyUtil = require("PropertyUtil");

var node = ResourceLocatorUtil.getNodeByIdentifier("3.194af91a153c27bde772b80");

//hämtar hem relativ url för metadatat sol_service_interuption, property URI = relativa länken
var url = PropertyUtil.getNestedString(currentPage, "sol_service_interuptions", "URI");

if(!url){
  url = "#";
}

var numAlerts = 0;
node.getNodes().forEachRemaining(function () {
  numAlerts++;
});