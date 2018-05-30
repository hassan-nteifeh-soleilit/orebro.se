var MetadataUtil = require('MetadataUtil'),
    InstanceUtil = require('InstanceTypeUtil'),
    NodeTypeUtil = require('NodeTypeUtil'),
    LinkRenderer = require('LinkRenderer'),
    PortletContextUtil = require('PortletContextUtil');

var related = MetadataUtil.getRelatedMetadataPropertyValues(PortletContextUtil.getCurrentPage(), 'footerLinks'),
    output = ""; 

if(related !== null){
   for(var i = 0; i < related.size(); i++){    
      var relatedObject = related.get(i);
         
      if(relatedObject !== null && InstanceUtil.isNode(relatedObject) && NodeTypeUtil.isLink(relatedObject)) {
         LinkRenderer.update(relatedObject);           
         output +=  LinkRenderer.render() ;            
      }
       
   }
}