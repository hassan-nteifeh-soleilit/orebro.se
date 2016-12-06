var PropertyUtil = require('PropertyUtil'),
	PortletContextUtil = require('PortletContextUtil');
	
var currentPage = PortletContextUtil.getCurrentPage(),
 siteNamn = PropertyUtil.getString(currentPage,"sitenamn");

// Debug
//var outputUtil = svUtils.getOutputUtil();
//var userDataUtil = svUtils.getUserFactory().getUserDataUtil();

var contacts = [];
var contact, tmpStr;
var noOfContacts = 0;
for(i=1; i<4; i++){
   contact = PropertyUtil.getNode(currentPage, 'kontaktperson'+i);
   if(contact !== null) {
      contacts.push(contact);
      noOfContacts++;
   }
}


if (noOfContacts > 0){
	 //<div class="sv-use-margins"><h3 class="subheading3" id="h-KontaktaOrebrokommun">Kontakta $sitenamn</h3></div>
   out.print('<h3 class="subheading3">Kontakta '+ siteNamn +'</h3><ul style="list-style: none; margin: 0; padding: 0;">');   
	 
}

for(i=0; i< noOfContacts; i++) {
           
		 out.print('<li class="kontaktaxossxxxbrodtext" style="border-bottom-color: #c0c0c0; border-bottom-style: dotted; border-bottom-width: 2px; padding-bottom: 15px; padding-top: 0px;">');      
      //out.print('<li class="kontaktaxossxxxbrodtext"');
         
      // Name (given name and surname)         
      out.print('<p class="kontaktaxossxxxbrodtext"><strong> ' + PropertyUtil.getString(contacts[i],'displayName','') + '</p>');

      // Title
      tmpStr = PropertyUtil.getString(contacts[i],'title','');
      if (tmpStr !==  "") {
             out.print('<span class="kontaktaxossxxxbrodtext"><strong>Titel:</strong> ' + tmpStr + '</span><br/>');
      }
      
      // Telephone number
      tmpStr = PropertyUtil.getString(contacts[i],'telephoneNumber','');
      if (tmpStr !==  "") {
             out.print('<span class="kontaktaxossxxxbrodtext"><strong>Telefon: </strong> ' + tmpStr + '</span><br/>');
      }

      // Mobile telephone number
      tmpStr = PropertyUtil.getString(contacts[i],'mobile','');
      if (tmpStr !==  "") {
             out.print('<span class="kontaktaxossxxxbrodtext"><strong>Mobil:</strong> ' + tmpStr + '</span><br/>');
      }
      
      // Email
      tmpStr = PropertyUtil.getString(contacts[i],'mail','');
      if (tmpStr !==  "") {
             out.print('<span class="kontaktaxossxxxbrodtext"><strong>E-post:</strong> <a titel href="mailto:' + tmpStr + '"> ' + tmpStr + '</a></span><br/>');
      }

      // Besöksadress
      tmpStr = PropertyUtil.getString(contacts[i],'description','');
      if (tmpStr !==  "") {
         out.print('<p><strong>Besöksadress: </strong>' + tmpStr + '</p>');
      }		

      // Öppettid
      tmpStr = PropertyUtil.getString(contacts[i],'businessCategory','');
      if (tmpStr !==  "") {
         out.print('<p><strong>Öppettider: </strong>' + tmpStr + '</p>');
      }		

      out.print('</li>');
}

if (noOfContacts > 0){
   out.print('</ul>');   
}

// Test code for setting data on user as of SV 4.1

//out.print(outputUtil.getNodeInfoAsHTML(kontakt1, 2))
//out.print(outputUtil.getNodeInfoAsHTML(propUtil.getNode(currentPage, 'kontaktperson1'), 1))
//out.print(userDataUtil.getReadOnlyKeys())
//userDataUtil.setUserData(kontakt1,'user.extra', "Lite exxx");
//userDataUtil.removeUserData(kontakt1,'user.extra');
//out.print(userDataUtil.getUserData(kontakt1,'user.extra'))
//out.print(userDataUtil.getUserData(kontakt1,'user.business-info.online.email'))
