var ResourceLocatorUtil = require('ResourceLocatorUtil');
var PropertyUtil = require('PropertyUtil');
var NodeIteratorUtil = require('NodeIteratorUtil');

var config = {
  startingPoint: scriptVariables.startingPoint
};


var iteratorToJSArray = function (iterator) {
    var jsArray = [];
    while (iterator.hasNext()) {
        jsArray.push(iterator.next());
    }
    return jsArray;
};

var dataCreator = function (node) {
    return {
        name: PropertyUtil.getString(node, 'displayName'),
        icon: PropertyUtil.getString(node, 'icon'),
        text: PropertyUtil.getString(node, 'or_description'),
        URI: PropertyUtil.getString(node, 'URI'),
    };
};

var getData = function getDashboardPage(startingPoint) {
    var data = [];
    var menuItemsList = NodeIteratorUtil.getMenuItems(startingPoint);
    if (menuItemsList.hasNext()) {
        var menuItemsArray = iteratorToJSArray(menuItemsList);
        menuItemsArray.forEach(function (menuItem) {
            data.push(dataCreator(menuItem));
        });
    }
    return data;
};


var viewData = getData(config.startingPoint);
