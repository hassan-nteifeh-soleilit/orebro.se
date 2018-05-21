var textarea = request.getParameter("textarea");

if(textarea !== null && textarea !== ""){
   
   sendMailScript(textarea);
}

function sendMailScript(textarea) {
   var MailUtil = require ('MailUtil'),
		EndecUtil = require ('EndecUtil');
			
   var mailBuilder = MailUtil.getMailBuilder();
   
   var message = textarea,
		subject = "Kontakt och tyck till",
		email = "feedback-webb@orebro.se";
 
   //Skapar mailet
   mailBuilder.setSubject(EndecUtil.decodeURL(subject));
   mailBuilder.setTextMessage(message) ; 
   mailBuilder.clearRecipients();
   mailBuilder.addRecipient(EndecUtil.decodeURL(email));
 
   //Skickar iväg mailet
   mailBuilder.build().send();
   
}