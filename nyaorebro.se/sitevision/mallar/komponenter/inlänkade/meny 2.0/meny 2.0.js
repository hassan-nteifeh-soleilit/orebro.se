// Globala variabler
var PortletContextUtil = require('PortletContextUtil'),
		PropertyUtil = require('PropertyUtil'),
		LinkRenderer = require('LinkRenderer'),
		NodeTreeUtil = require('NodeTreeUtil'),
		NodeIteratorUtil = require('NodeIteratorUtil'),
		NodeTypeUtil = require('NodeTypeUtil');
		
var currentPage = PortletContextUtil.getCurrentPage(),
	menuStart = PropertyUtil.getNode(currentPage, "menustart");
	siteName = PropertyUtil.getString(menuStart, 'sitenamn', menuStart);

// Loopar över alla undernoder och anropar callback
var forEachChild = function(node, callback) {
    var children = NodeIteratorUtil.getMenuItems(node);
    while (children.hasNext()) {
        var child = children.next();
        callback(child);
    }
};

var hasChildren = function(node) {
    return NodeIteratorUtil.getMenuItems(node).hasNext();
};

// En nod är expanderad om currentPage är ättling till noden.
var isNodeExpanded = function(node) {
    return (node != currentPage) && NodeTreeUtil.isDescendantOf(currentPage, node);
};

// Returnerar om node är en länk till currentPage
var isNodeLinkToCurrentPage = function(node) {

    if (NodeTypeUtil.isLink(node)) {
        var currentURL = PropertyUtil.getString(currentPage, "URL");
        var nodeURL = PropertyUtil.getString(node, "URL");
        if (nodeURL.equals(currentURL)) {
            return true;
        }
    }

    return false;
};

var getProperty = function(node, property) {
    return PropertyUtil.getString(node, property);
};

var getURI = function(node) {
    return getProperty(node, "URI");
};

var getDisplayName = function(node) {
    return getProperty(node, "displayName");
};

var getMetadata = function(node) {
    var metadata = getProperty(node, "menuMetadata");
    return metadata === null ? "" : metadata;
};

// Skapar en sträng med alla css-klasser som noden ska ha
var createLiCssClass = function(node) {
    var css = [];

    if (node == currentPage || isNodeLinkToCurrentPage(node)) {
        css.push("or-current");
    }

    if (hasChildren(node)) {
        css.push("or-parent");
        if (isNodeExpanded(node)) {
            css.push("or-expanded");
        }
    }

    return css.join(" ");
};

// Skriver ut menyn rekursivt
// node - en nod
// depth - anger den aktuella nodens djup i trädet
var createMenuRecursive = function(node, depth) {
    if (LinkRenderer.isValidTarget(node)) {
        var displayName = getDisplayName(node);
        out.println('<li class="' + createLiCssClass(node) + '">');        
        if (hasChildren(node)) {            				           	
           out.println('<span class="or-toggle-icon"><input type="button" class="or-toggle-btn"></input></span>');            
            var childDepth = depth + 1;
            LinkRenderer.update(node);           
            out.println(LinkRenderer.render());           	           	
            out.println('<ul class="or-depth-' + childDepth + '">');
            forEachChild(node, function(child) {
                createMenuRecursive(child, childDepth);
            });           	
            out.println("</ul>");
        } else {
            LinkRenderer.update(node);
            out.println(LinkRenderer.render());
        }

        out.println("</li>");
    }
};

// Skriver ut en meny
var createMenu = function() {
    var startDeepth = 0;
    out.println('<nav id="menu-2" class="or-tree">');

    if (menuStart) {
        out.println('<div class="or-mobile-nav-bar">');
       
        LinkRenderer.update(menuStart);        
        LinkRenderer.setText(siteName);
        LinkRenderer.setFontClass("or-menu-title");
        out.println(LinkRenderer.render());	        
        out.println('<a href="#" class="or-push-nav-btn"><i class="fa fa-times"></i>STÄNG</a>');
        out.println('</div>');

        out.println('  <ul class="or-depth-' + startDeepth + '">');
        forEachChild(menuStart, function(child) {
            createMenuRecursive(child, startDeepth);
        });
        out.println('  </ul>');
    }
    out.println('</nav>');
};

// Start skript
createMenu();