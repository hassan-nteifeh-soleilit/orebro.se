var textarea = request.getParameter("textarea");


if(textarea !== null && textarea !== ""){
   sendMailScript(textarea);
}


function sendMailScript(textarea) {
   var EndecUtil = require('EndecUtil'),
       MailBuilder = require('MailUtil').getMailBuilder();
    
   var message = textarea,
       subject = "Kontakt och tyck till",
       email = "feedback-webb@orebro.se";
 
   //Skapar mailet
   mailBuilder.setSubject(endecUtil.decodeURL(subject));
   mailBuilder.setTextMessage(message) ; 
   mailBuilder.clearRecipients();
   mailBuilder.addRecipient(endecUtil.decodeURL(email));
 
   //Skickar iväg mailet
   mailBuilder.build().send();
}