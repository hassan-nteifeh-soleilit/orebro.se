var jcrSession = request.getAttribute("sitevision.jcr.session");
var utils = request.getAttribute('sitevision.utils');

var currentPage = utils.getPortletContextUtil().getCurrentPage();

var fbId= utils.getPropertyUtil().getString(currentPage,"fbId");
var APP_ID = '678017432303988';
var SECRET_KEY = 'c3186e14c7bd2c73fcdbc4c64af4c7f7';   
var show = false;

var isDefined = function (variable) {
   return typeof(variable) != "undefined";
}

if(fbId) {
   importPackage(java.net);
   importPackage(Packages.org.apache.commons.io);
   
   var url = new URL('https://graph.facebook.com/v2.3/' + fbId + '/posts?limit=1&fields=full_picture,message,link,from&access_token=' + APP_ID + '|' + SECRET_KEY );
   
   var connection = url.openConnection();
   var body = IOUtils.toString(connection.getInputStream(), 'UTF-8');
   
   var json = eval('(' + body  + ')');
                           
   var fbName = json.data[0].from.name;
   var postImageUrl = '/images/18.639484fa14f307c14aee90a/1441120244794/transparent.gif' 
      
   if(typeof(json.data[0].full_picture) != "undefined") {
      postImageUrl = json.data[0].full_picture;
   }   
   var postCreated = new SimpleDateFormat("d MMM H:mm",utils.getPortletContextUtil().getCurrentLocale()).format(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ").parse(json.data[0].created_time));
   var postMessage = "";   
   if(typeof(json.data[0].message) != "undefined") {
      postMessage = json.data[0].message;
   }
   
   var postUrl= "https://www.facebook.com/" +fbId + "/";
   if(isDefined(json.data[0].link)) {
      postUrl= json.data[0].link;
   }
   
   show = true;
}
        
