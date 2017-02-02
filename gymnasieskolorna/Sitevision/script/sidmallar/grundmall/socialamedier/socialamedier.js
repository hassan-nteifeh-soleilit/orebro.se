var MetadataUtil = require('MetadataUtil'),
	PropertyUtil = require('PropertyUtil'),
	InstanceTypeUtil = require('InstanceTypeUtil'),
	NodeTypeUtil = require('NodeTypeUtil'),
	PortletContextUtil = require('PortletContextUtil');

var output = "",
	related = MetadataUtil.getRelatedMetadataPropertyValues(PortletContextUtil.getCurrentPage(), 'footer-social-media');
 
if(related !== null && related.size()>0){

	output +='<p class="or-folj-oss">Följ oss:</p>';

	for(var i = 0; i < related.size(); i++){    
		var relatedObject = related.get(i);

		// Hanterar bara länkar
		if(relatedObject !== null && InstanceTypeUtil.isNode(relatedObject) && NodeTypeUtil.isLink(relatedObject)){      
			// Hämta länk och namn på länk
			var nodeURL = PropertyUtil.getString(relatedObject, 'URL','');
			// Facebook            
			if(nodeURL.indexOf("facebook") > -1){
				output += '<a class="or-social-icon" href="' + nodeURL + '">' +
				'<div class="fa-stack fa-lg">' +
				'<i class="fa fa-circle fa-stack-2x or-social-icon-bg"></i>' +
				'<i class="fa fa-facebook fa-stack-1x fa-inverse or-social-icon-fg"></i>' +
				'</div>' +
				'</a>';
			}             
			// Instagram
			if(nodeURL.indexOf("instagram") > -1){
				output += '<a class="or-social-icon" href="' + nodeURL + '">' +
				'<div class="fa-stack fa-lg">' +
				'<i class="fa fa-circle fa-stack-2x or-social-icon-bg"></i>' +
				'<i class="fa fa-instagram fa-stack-1x fa-inverse or-social-icon-fg"></i>' +
				'</div>' +
				'</a>';
			}
			// Twitter
			if(nodeURL.indexOf("twitter") > -1){
				output += '<a class="or-social-icon" href="' + nodeURL + '">' +
				'<div class="fa-stack fa-lg">' +
				'<i class="fa fa-circle fa-stack-2x or-social-icon-bg"></i>' +
				'<i class="fa fa-twitter fa-stack-1x fa-inverse or-social-icon-fg"></i>' +
				'</div>' +
				'</a>';
			}             
			// LinkedIn
			if(nodeURL.indexOf("linkedin") > -1){
				output += '<a class="or-social-icon" href="' + nodeURL + '">' +
				'<div class="fa-stack fa-lg">' +
				'<i class="fa fa-circle fa-stack-2x or-social-icon-bg"></i>' +
				'<i class="fa fa-linkedin fa-stack-1x fa-inverse or-social-icon-fg"></i>' +
				'</div>' +
				'</a>';
			}
         // Youtube
			if(nodeURL.indexOf("youtube") > -1){
				output += '<a class="or-social-icon" href="' + nodeURL + '">' +
				'<div class="fa-stack fa-lg">' +
				'<i class="fa fa-circle fa-stack-2x or-social-icon-bg"></i>' +
				'<i class="fa fa-youtube fa-stack-1x fa-inverse or-social-icon-fg"></i>' +
				'</div>' +
				'</a>';
			}
		}
		 		
	}
}
