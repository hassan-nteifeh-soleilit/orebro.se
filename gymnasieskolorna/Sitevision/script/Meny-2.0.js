// Soleil IT
//
// Följande css-klasser sätts: ....
//
// Globala variabler
var SESSION = request.getAttribute("sitevision.jcr.session");
var SV_UTILS = request.getAttribute("sitevision.utils");
var CURRENT_PAGE = SV_UTILS.getPortletContextUtil().getCurrentPage();
var propertyUtil = require('PropertyUtil');
var linkRenderer = require('LinkRenderer');
var output = require('OutputUtil');
var nodeIteratorUtil = require('NodeIteratorUtil');
var nodeTreeUtil = require('NodeTreeUtil');
var nodeTypeUtil = require('NodeTypeUtil');


var ROOT = propertyUtil.getNode(CURRENT_PAGE, "menustart");

// Loopar över alla undernoder och anropar callback
var forEachChild = function(node, callback) {
    var children = nodeIteratorUtil.getMenuItems(node);
    while (children.hasNext()) {
        var child = children.next();
        callback(child);
    }
};

var hasChildren = function(node) {
    return nodeIteratorUtil.getMenuItems(node).hasNext();
};

// En nod är expanderad om CURRENT_PAGE är ättling till noden.
var isNodeExpanded = function(node) {
    return (node != CURRENT_PAGE) && nodeTreeUtil.isDescendantOf(CURRENT_PAGE, node);
};

// Returnerar om node är en länk till CURRENT_PAGE
var isNodeLinkToCurrentPage = function(node) {

    if (nodeTypeUtil.isLink(node)) {
        var currentURL = propertyUtil.getString(CURRENT_PAGE, "URL");
        var nodeURL = propertyUtil.getString(node, "URL");
        if (nodeURL.equals(currentURL)) {
            return true;
        }
    }

    return false;
};

var getProperty = function(node, property) {
    return propertyUtil.getString(node, property);
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

    if (node == CURRENT_PAGE || isNodeLinkToCurrentPage(node)) {
        css.push(CSS_PREFIX + "current");
    }

    if (hasChildren(node)) {
        css.push(CSS_PREFIX + "parent");
        if (isNodeExpanded(node)) {
            css.push(CSS_PREFIX + "expanded");
        }
    }

    return css.join(" ");
};

// Skriver ut menyn rekursivt
// node - en nod
// depth - anger den aktuella nodens djup i trädet
var createMenuRecursive = function(node, depth) {
    if (linkRenderer.isValidTarget(node)) {
        var displayName = getDisplayName(node);
        out.println('<li class="' + createLiCssClass(node) + '">');        
        if (hasChildren(node)) {
            out.println('<span class="' + CSS_PREFIX + 'toggle-panel"><span class="' + CSS_PREFIX + 'toggle-icon"></span></span>');            

            var childDepth = depth + 1;
            linkRenderer.update(node);
            out.println(linkRenderer.render());
            out.println('<ul class="' + CSS_PREFIX + 'depth-' + childDepth + '">');
            forEachChild(node, function(child) {
                createMenuRecursive(child, childDepth);
            });
            out.println("</ul>");
        } else {
            linkRenderer.update(node);
            out.println(linkRenderer.render());
        }

        out.println("</li>");
    }
};

// Skriver ut en meny
var createMenu = function() {
    var startDeepth = 0;
    out.println('<nav id="menu-2" class="' + CSS_PREFIX + 'tree">');

    if (ROOT) {
        out.println('<div class="' + CSS_PREFIX + 'mobile-nav-bar">');
       
        linkRenderer.update(ROOT);
        linkRenderer.setText("Örebro kommun");
        linkRenderer.setFontClass("or-menu-title");
        out.println(linkRenderer.render());	        
        out.println('<a href="#" class="or-push-nav-btn"><i class="fa fa-close"></i>STÄNG</a>');
        out.println('</div>');

        out.println('  <ul class="' + CSS_PREFIX + 'depth-' + startDeepth + '">');
        forEachChild(ROOT, function(child) {
            createMenuRecursive(child, startDeepth);
        });
        out.println('  </ul>');
    }
    out.println('</nav>');
};

// Start skript
var CSS_PREFIX = "or-";
createMenu();


var dollar = "$";