var mailUtil = require("MailUtil"), // Get MailUtil
    mailBuilder = require("MailBuilder"), // Get MailBuilder
	 recipient = scriptVariables.recipient; // Get recipient

var mailSent = false;
var mailError = false;

// Get inputs from form
var idea = request.getParameter("1"), 
    importance = request.getParameter("2"),
    users = request.getParameter("3"), 
    functionToday = request.getParameter("4"), 
    otherUse = request.getParameter("5"),
    name = request.getParameter("name"), 
    unit = request.getParameter("unit"), 
    tel = request.getParameter("tel"),
    email = request.getParameter("email");

// If email has input, create and send email
if(email){
	// Create email format
   var content;
   content = "Beskrivning av idé: " + "\n" + idea + "\n \n";
   content = content + "Vad ska din idé förbättra eller vilket behov ska uppfyllas för medborgaren?" + "\n" + importance + "\n \n" ;
   content = content + "Vilka medborgare kan ha nytta av din idé? " + "\n" + users + "\n \n";
   content = content + "Det som din idé ska förbättra - hur fungerar det idag? " + "\n" + functionToday + "\n \n";
   content = content + "Tror du att din idé kan göra nytta även i andra verksamheter? " + "\n" + otherUse + "\n \n";
   content = content + "Kontaktuppgifter till personen som skickat in formuläret \n";
   content = content + "Namn: " + name + "\n";
   content = content + "Enhet: " + unit + "\n";
   content = content + "Telefon: " + tel + "\n";
   content = content + "Email: " + email;
   var contentCopy = "Tack för din idé! Du kan inte svara på detta e-postmeddelande.\n" + content;
   sendEmail(email);
}	
	
function sendEmail(email){
   // Build mail to editor
   mail = mailBuilder.setSubject('Bidrag från Idéslussen').setTextMessage(content).addRecipient(recipient).setFrom("svaraintehit@orebro.se").build();
   // Send mail
   if (mail.send()){
		mailSent = true;
   }else{
 		mailSent = false;
		mailError = true;
   }
   // Check email (if @orebro.se)
   var  expr = /@orebro.se/;
   if((expr.test(email))){
	   // Build mail to customer
	   mail = mailBuilder.setSubject('Ditt bidrag till Idéslussen').setTextMessage(contentCopy).clearRecipients().addRecipient(email).setFrom("svaraintehit@orebro.se").build();
	   // Send mail
	   if (mail.send()){
	      mailSent = true;
	   }else{
	      mailSent = false;
	      mailError = true;
	   }
   }
} 