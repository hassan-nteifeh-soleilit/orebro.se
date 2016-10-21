var textarea = request.getParameter("textarea");


if(textarea!==null && textarea!==""){
   sendMailScript(textarea);
}


function sendMailScript(textarea) {
   var mailBuilder = svUtils.getMailUtil().getMailBuilder();
   var endecUtil = svUtils.getEndecUtil();
   var message = textarea;
   var subject = "Kontakt och tyck till";
   var email = "feedback-webb@orebro.se";
 
   //Skapar mailet
   mailBuilder.setSubject(endecUtil.decodeURL(subject));
   mailBuilder.setTextMessage(message) ; 
   mailBuilder.clearRecipients();
   mailBuilder.addRecipient(endecUtil.decodeURL(email));
 
   //Skickar iväg mailet
   mailBuilder.build().send();
}