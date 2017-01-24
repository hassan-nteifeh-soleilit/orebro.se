var propertyUtil = require('PropertyUtil');

var portletContextUtil = require('PortletContextUtil');
var currentPage = portletContextUtil.getCurrentPage();
var fbToken = propertyUtil.getString(currentPage,"fbToken");
var fbPageId = propertyUtil.getString(currentPage,"fbPageId");


var SimpleDateFormat = Java.type('java.text.SimpleDateFormat');
var show = false;


if(fbPageId) {   
         
   var socialMedias =[];
	var url, connection, json;   
	url = new java.net.URL('https://graph.facebook.com/v2.6/' + fbPageId + '/posts?limit=3&fields=type,full_picture,caption,description,message,created_time,permalink_url,link,shares,comments.limit(1).summary(true),likes.limit(1).summary(true),reactions.limit(1).summary(true)&access_token=' + fbToken );	 	   	 
	
	connection = url.openConnection();   	
   json = JSON.parse(Packages.org.apache.commons.io.IOUtils.toString(connection.getInputStream(), 'UTF-8')).data; 
             
   for each(var data in json) {      
      var shares = data.hasOwnProperty('shares') ? data.shares.count : 0;      
      var pictureUrl = data.hasOwnProperty('full_picture') ? data.full_picture : null;
   	followlink = "https://www.facebook.com/" + fbPageId;

		socialMedias.push(new socialMedia('FB','',data.message,data.created_time,pictureUrl,data.permalink_url,followlink,data.likes.summary.total_count,data.comments.summary.total_count,shares,0,data.reactions.summary.total_count));
      
	}
	
   show = socialMedias.length > 0;
  
}


function socialMedia(type, title, text, timestamp, thumbnail, permalink, followlink, likes, comments, shares, dislikes, reactions) {	 
   this.type = type;
	this.title = title; 
	this.text = text; 	
	this.thumbnail = thumbnail; 
	this.permalink = permalink; 
   this.followlink = followlink;
   this.showStats = (likes+ comments+ shares+ dislikes+ reactions) > 0;   

   var date;
   
   this.name = 'Facebook';
   date =  new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ").parse(timestamp);
   this.icon ='fa-facebook';
   this.stats = [{icon:'fa-reactions', count:reactions},{icon:'fa-comments', count:comments}, {icon:'fa-share', count:shares}];
      
   
   this.timestamp = new SimpleDateFormat("d MMMM",portletContextUtil.getCurrentLocale()).format(date);
   
}
