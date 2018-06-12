var LinkRenderer = require('LinkRenderer');
var PropertyUtil = require('PropertyUtil');
var MetadataUtil = require('MetadataUtil');

var show = false;

if (scriptVariables.archiveNode) {
    var archive = scriptVariables.archiveNode.getNodes();
    var smallCss = "";

    if (archive && archive.hasNext()) {
        var article = archive.next(); 
        var header = PropertyUtil.getString(article,'SV.Title','');     
        var content = PropertyUtil.getString(article,'SV.Content','');     
        var ingress = PropertyUtil.getString(article,'SV.Description','');
  
        if (ingress.isEmpty()) {      
            smallCss = "small";
        }
   
        LinkRenderer.update(article, 'or-alert-button ' + smallCss , "MER INFORMATION");
   
        var linkValue = MetadataUtil.getLinkMetadataPropertyValue(article, 'alertMessageLink');
        LinkRenderer.setTarget(linkValue);
        var link = LinkRenderer.render();

        show = true;
    }
}
