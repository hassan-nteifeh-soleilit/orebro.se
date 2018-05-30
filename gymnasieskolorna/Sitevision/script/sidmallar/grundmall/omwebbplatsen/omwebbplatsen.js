var MetadataUtil = require('MetadataUtil'),
	PropertyUtil = require('PropertyUtil'),
	InstanceUtil = require('InstanceTypeUtil'),
	NodeTypeUtil = require('NodeTypeUtil');

var currentPage = require('PortletContextUtil').getCurrentPage(),
	related = MetadataUtil.getRelatedMetadataPropertyValues(currentPage, 'footer-site-facts'),
	output='<div class=\"or-site-facts\"><p class=\"normal\">';
  
if(related!== null){
	for(var i = 0; i < related.size(); i++){    
		var relatedObject = related.get(i);

		if(relatedObject!==null && InstanceUtil.isNode(relatedObject) && NodeTypeUtil.isLink(relatedObject)){      				
			var nodeURL = PropertyUtil.getString(relatedObject, 'URI','');
			output += '<a title=\"\" href="'+nodeURL+'">'+relatedObject+'</a>';
		}
	}
}

output += '<a href="#" id="or-id-footer-link-languages">Translate</a></p></div>';