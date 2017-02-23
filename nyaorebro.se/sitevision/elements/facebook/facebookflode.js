var requester = require('JsonRequester'),
    PortletContextUtil = require('PortletContextUtil'),
    ScriptUtil = require('ScriptUtil'),    
    SimpleDateFormat = Java.type('java.text.SimpleDateFormat'),
    options ,
    url,    
    posts =[], 
    show = false,
	 fbGraphUrl = 'https://graph.facebook.com/v2.6/',
    singlePost = ScriptUtil.isNotBlank(scriptVariables.fbPostId);


	options = {
		'data' : { 
         'limit': scriptVariables.limit,
         'fields': 'full_picture,message,link, permalink_url,from,created_time,shares,comments.limit(1).summary(true),likes.limit(1).summary(true),reactions.limit(1).summary(true)',                             
         'access_token':  scriptVariables.fbToken
      }   		
   };

	

   if(singlePost) {
      url = fbGraphUrl + scriptVariables.fbPageId + '_'+ scriptVariables.fbPostId;     		 

   } else {
      url = fbGraphUrl + scriptVariables.fbPageId + '/posts'; 		    
   }   



function storePost(item){
      
      var shares = item.hasOwnProperty('shares') ? item.shares.count : 0;
      var pictureUrl = item.hasOwnProperty('full_picture') ? item.full_picture : null;
      followlink = "https://www.facebook.com/" + scriptVariables.fbPageId;

      posts.push(new socialMedia('FB','',item.message,item.created_time,pictureUrl,item.permalink_url,followlink,item.likes.summary.total_count,item.comments.summary.total_count,shares,0,item.reactions.summary.total_count));               
}

requester.get(url,options)
.done(function(json) {
   // GET succeeded, handle JSON response result
   
   if(singlePost) {
      storePost(json);
   } else{
      json.data.forEach(function(item){
         storePost(item);
      });   
   }
   
   show = posts.length > 0;
   

   
})
.fail(function(message) {
   // GET failed, handle error message
   out.println(message);
});



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
      
   
   this.timestamp = new SimpleDateFormat("d MMMM",PortletContextUtil.getCurrentLocale()).format(date);
   
}
  