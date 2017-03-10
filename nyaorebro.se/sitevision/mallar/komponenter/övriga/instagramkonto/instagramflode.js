var utils = request.getAttribute('sitevision.utils');
var propertyUtil = utils.getPropertyUtil();
var currentPage = utils.getPortletContextUtil().getCurrentPage();
var instagramAccount = propertyUtil.getString(currentPage,"instagramId");
var instagramToken = propertyUtil.getString(currentPage,"instagramToken");

var show = false ;

if(instagramAccount && !instagramAccount.isEmpty()) {
 show = true;
 
 try{
   importPackage(java.net);
   importPackage(Packages.org.apache.commons.io);
                 
   var url = new URL('https://api.instagram.com/v1/users/self/?access_token=' + instagramToken);                
   var connection = url.openConnection();       
   var body = IOUtils.toString(connection.getInputStream(), 'UTF-8');      
   
   var json = eval('(' + body  + ')');         
   var username = json.data.username;
         
         
   } catch (err){
      out.print("<!--" + err.message + "-->")
   }


}