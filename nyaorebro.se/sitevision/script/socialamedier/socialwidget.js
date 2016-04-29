var propertyUtil = require('PropertyUtil');
var portletContextUtil = require('PortletContextUtil');
var currentPage = portletContextUtil.getCurrentPage();
var instaId = propertyUtil.getString(currentPage,"instagramId");
var fbId = propertyUtil.getString(currentPage,"facebookId");
var ytubeId = propertyUtil.getString(currentPage,"youTubeId");
var instagramToken = propertyUtil.getString(currentPage,"instagramToken");

/* Instagram details */
var instaId = 'BEdb_r8TFfB';
var INSTA_TOKEN = '237164884.3723313.4c686780aeb54e6dbb662fb1f301b791';  //May change!!!

/* Facebook details */
var fbId = '1115029451872819';
var FB_APP_ID = '678017432303988';
var FB_SECRET_KEY = 'c3186e14c7bd2c73fcdbc4c64af4c7f7';   
var FB_PAGE_ID = '126400134069094';

/* YouTube details */
var yTubeId = 'NE3zC__GGNE';	
var YTUBE_KEY = 'AIzaSyCZrQ3gyBKsSH7EI6eHztJ5BogNrNnBRvg';

var socialMedias =[];
var url, connection, data;

/* Instagram */
if(instagramToken && !instagramToken.isEmpty()) {      
      try{
                  
            url = new java.net.URL('https://api.instagram.com/v1/media/shortcode/'+ instaId + '?access_token=' + INSTA_TOKEN );   

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
url = new java.net.URL('https://graph.facebook.com/v2.6/' + FB_PAGE_ID + '_'+ fbId + '?fields=type,full_picture,caption,description,message,created_time,permalink_url,link,shares,comments.limit(1).summary(true),likes.limit(1).summary(true),reactions.limit(1).summary(true)&access_token=' + FB_APP_ID + '|' + FB_SECRET_KEY );
	 	
connection = url.openConnection();   	
data = JSON.parse(Packages.org.apache.commons.io.IOUtils.toString(connection.getInputStream(), 'UTF-8'));      

var shares = data.hasOwnProperty('shares') ? data.shares.count : 0;
var pictureUrl = data.hasOwnProperty('full_picture') ? data.full_picture : null;
followlink = "https://www.facebook.com/" + FB_PAGE_ID;

socialMedias.push(new socialMedia('FB','',data.message,data.created_time,pictureUrl,data.permalink_url,followlink,data.likes.summary.total_count,data.comments.summary.total_count,shares,0,data.reactions.summary.total_count));
            

/* YouTube*/	
url = new java.net.URL('https://www.googleapis.com/youtube/v3/videos?id=' + yTubeId + '&key=' + YTUBE_KEY + '&part=snippet,statistics');
	 
connection = url.openConnection();   	
data = JSON.parse(Packages.org.apache.commons.io.IOUtils.toString(connection.getInputStream(), 'UTF-8'));   
data = data.items[0];
var likes = data.hasOwnProperty('likeCount') ? data.statistics.likeCount : 0;
var dislikes = data.hasOwnProperty('dislikeCount') ? data.statistics.dislikeCount : 0;
var comments = data.hasOwnProperty('commentCount') ? data.statistics.commentCount : 0;
var permalink = 'https://www.youtube.com/'+ yTubeId;
var followlink = 'https://www.youtube.com/user/'+ data.channelTitle;

socialMedias.push(new socialMedia('YTUBE',data.snippet.title,data.snippet.description,data.snippet.publishedAt,data.snippet.thumbnails.medium.url,permalink,followlink,likes,comments,0,dislikes,0));

function socialMedia(type, title, text, timestamp, thumbnail, permalink, followlink, likes, comments, shares, dislikes, reactions) {	 
   this.type = type;
	this.title = title; 
	this.text = text; 	
	this.thumbnail = thumbnail; 
	this.permalink = permalink; 
   this.followlink = followlink;
   this.showStats = (likes+ comments+ shares+ dislikes+ reactions) > 0;   

   var date;
   switch (type) {
      case 'INSTA':
         this.name = 'Instagram';
         this.timestamp = timestamp;
   		this.icon ='fa-instagram';
         date = new Date().setTime(timestamp);
         this.stats = [{icon:'fa-comments', count:comments},{icon:'fa-heart', count:likes}];
         break;
      case 'FB':
         this.name = 'Facebook';
         date =  new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ").parse(timestamp);
   		this.icon ='fa-facebook';
         this.stats = [{icon:'fa-reactions', count:reactions},{icon:'fa-thumbs-o-up', count:likes}, {icon:'fa-comments', count:comments}, {icon:'fa-share', count:shares}];
         break;               
      case 'YTUBE':
         this.name = 'Youtube';
         date =  new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").parse(timestamp);
   		this.icon ='fa-youtube';
         this.stats = [{icon:'fa-thumbs-o-up', count:likes},{icon:'fa-thumbs-o-down', count:dislikes},{icon:'fa-comments', count:dislikes}];         
         break;               
      default:
            break;
   }
   
   this.timestamp = new SimpleDateFormat("d MMMM",portletContextUtil.getCurrentLocale()).format(date);
   
}
