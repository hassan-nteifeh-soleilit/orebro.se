var PropertyUtil = require('PropertyUtil'),
    PortletContextUtil = require('PortletContextUtil');
    
var currentPage = PortletContextUtil.getCurrentPage(),
    instaId = PropertyUtil.getString(currentPage,"instaId"),
    fbToken = PropertyUtil.getString(currentPage,"fbToken"),
    fbId = PropertyUtil.getString(currentPage,"fbId"),
    fbPageId = PropertyUtil.getString(currentPage,"fbPageId"),
    yTubeToken = PropertyUtil.getString(currentPage,"ytubeToken"),
    yTubeId = PropertyUtil.getString(currentPage,"ytubeId"),
    instaToken = PropertyUtil.getString(currentPage,"instaToken"),
    instaId = PropertyUtil.getString(currentPage,"instaId"),
    socialMedias =[],
    url, connection, data;

/* Instagram */
if(instaToken && !instaToken.isEmpty() && instaId && !instaId.isEmpty()) {      
      try{
                  
            url = new java.net.URL('https://api.instagram.com/v1/media/shortcode/'+ instaId + '?access_token=' + instaToken );   

            connection = url.openConnection();       
            data = JSON.parse(Packages.org.apache.commons.io.IOUtils.toString(connection.getInputStream(), 'UTF-8')).data;            
            
            
            var permalink = 'https://www.instagram.com/p/'+ instaId;
            var followlink = 'https://www.instagram.com/'+ data.user.username;
            
            socialMedias.push(new socialMedia('INSTA','',data.caption.text,data.caption.created_time,data.images.standard_resolution.url,permalink,followlink,data.likes.count,data.comments.count,0,0,0));  
            
      } catch (err){
            out.print("<!--" + err.message + "-->");
      }


}

/* Facebook */   	
if(fbToken && !fbToken.isEmpty() && fbId && fbPageId && !fbId.isEmpty() && !fbPageId.isEmpty()) {      
   
   url = new java.net.URL('https://graph.facebook.com/v2.6/' + fbPageId + '_'+ fbId + '?fields=type,full_picture,caption,description,message,created_time,permalink_url,link,shares,comments.limit(1).summary(true),likes.limit(1).summary(true),reactions.limit(1).summary(true)&access_token=' + fbToken);

   connection = url.openConnection();   	
   data = JSON.parse(Packages.org.apache.commons.io.IOUtils.toString(connection.getInputStream(), 'UTF-8'));      

   var shares = data.hasOwnProperty('shares') ? data.shares.count : 0;
   var pictureUrl = data.hasOwnProperty('full_picture') ? data.full_picture : null;
   followlink = "https://www.facebook.com/" + fbPageId;

	socialMedias.push(new socialMedia('FB','',data.message,data.created_time,pictureUrl,data.permalink_url,followlink,data.likes.summary.total_count,data.comments.summary.total_count,shares,0,data.reactions.summary.total_count));
}            

if(yTubeToken && !yTubeToken.isEmpty() && yTubeId && !yTubeId.isEmpty()) {     

   /* YouTube*/	
   url = new java.net.URL('https://www.googleapis.com/youtube/v3/videos?id=' + yTubeId + '&key=' + yTubeToken + '&part=snippet,statistics');

   connection = url.openConnection();   	
   data = JSON.parse(Packages.org.apache.commons.io.IOUtils.toString(connection.getInputStream(), 'UTF-8'));   
   data = data.items[0];
   var likes = data.statistics.hasOwnProperty('likeCount') ? data.statistics.likeCount : 0;
   var dislikes = data.statistics.hasOwnProperty('dislikeCount') ? data.statistics.dislikeCount : 0;
   var comments = data.statistics.hasOwnProperty('commentCount') ? data.statistics.commentCount : 0;
   var permalink = 'www.youtube.com/embed/'+ yTubeId + '?autoplay=1';
   var followlink = 'http://www.youtube.com/user/'+ data.channelTitle;

   socialMedias.push(new socialMedia('YTUBE',data.snippet.title,data.snippet.description,data.snippet.publishedAt,data.snippet.thumbnails.medium.url,permalink,followlink,likes,comments,0,dislikes,0));
}

function socialMedia(type, title, text, timestamp, thumbnail, permalink, followlink, likes, comments, shares, dislikes, reactions) {	 
   this.type = type;
	this.title = title; 		
   this.text = text;
	this.thumbnail = thumbnail; 
	this.permalink = permalink; 
   this.followlink = followlink;
   this.showStats = (likes+ comments+ shares+ dislikes+ reactions) > 0 || type == 'YTUBE';   

   try {
      if (text.length > 150) {          
         var cutPos = text.substring(150).indexOf(" ") + 150;                   
         this.text = text.substring(0, cutPos) + "..."; 
      } 
	}catch (exception) {   
      this.text = exception;
   }      
 
   
   var date;
   switch (type) {
      case 'INSTA':
         this.name = 'Instagram';
         this.timestamp = timestamp;
         this.icon ='fa-instagram';
         date = new Date().setTime(timestamp);
         this.stats = [{icon:'fa-heart', count:likes},{icon:'fa-comments', count:comments}];
         break;
      case 'FB':
         this.name = 'Facebook';
         date =  new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ").parse(timestamp);
         this.icon ='fa-facebook';
         this.stats = [{icon:'fa-reactions', count:reactions},{icon:'fa-comments', count:comments}, {icon:'fa-share', count:shares}];
         break;               
      case 'YTUBE':
         this.name = 'Youtube';
         date =  new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").parse(timestamp);
   		this.icon ='fa-youtube';
         this.stats = [{icon:'fa-thumbs-o-up', count:(likes+'')},{icon:'fa-thumbs-o-down', count:(dislikes+'')},{icon:'fa-comments', count:(comments+'')}];         
         break;               
      default:
         break;
   }
   
   this.timestamp = new SimpleDateFormat("d MMMM",PortletContextUtil.getCurrentLocale()).format(date);
   
}
