var metadataUtil = require('MetadataUtil');
var propUtil = require('PropertyUtil');
var linkRenderer = require('LinkRenderer');
var nodeTreeUtil = require('NodeTreeUtil');
var ctxUtil = require('PortletContextUtil');
var currentPage = ctxUtil.getCurrentPage();

var root = propUtil.getNode(currentPage,"menustart");
var gaId = propUtil.getString(currentPage,"gaTrackingId");
var gaPath = '/';