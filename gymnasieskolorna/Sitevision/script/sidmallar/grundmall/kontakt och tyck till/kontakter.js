var PropertyUtil = require('PropertyUtil'),
	PortletContextUtil = require('PortletContextUtil');
	
var currentPage = PortletContextUtil.getCurrentPage(),
 siteNamn = PropertyUtil.getString(currentPage,"sitenamn");

var contacts = [];
var tmpStr;
for(i=1; i<4; i++){
   contact = PropertyUtil.getNode(currentPage, 'kontaktperson'+i);
   if(contact !== null) {
      contacts.push(contact);      
   }
}

contacts.forEach(function(item, idx, array){
   
   if(idx === 0){
      out.print('<h3 class="subheading3">Kontakta '+ siteNamn +'</h3>');
      out.print('<ul style="list-style: none; margin: 0; padding: 0;">');   
   }
           
   out.print('<li class="kontaktaxossxxxbrodtext" style="border-bottom-color: #c0c0c0; border-bottom-style: dotted; border-bottom-width: 2px; padding-bottom: 15px; padding-top: 0px;">');            

   // Name (given name and surname)         
   out.print('<p class="kontaktaxossxxxbrodtext"><strong> ' + PropertyUtil.getString(item,'displayName','') + '</strong></p>');

   // Title
   tmpStr = PropertyUtil.getString(item,'title','');
   if (tmpStr !==  "") {
      out.print('<span class="kontaktaxossxxxbrodtext"><strong>Titel:</strong> ' + tmpStr + '</span><br/>');
   }

   // Telephone number
   tmpStr = PropertyUtil.getString(item,'telephoneNumber','');
   if (tmpStr !==  "") {
      out.print('<span class="kontaktaxossxxxbrodtext"><strong>Telefon: </strong> ' + tmpStr + '</span><br/>');
   }

   // Mobile telephone number
   tmpStr = PropertyUtil.getString(item,'mobile','');
   if (tmpStr !==  "") {
      out.print('<span class="kontaktaxossxxxbrodtext"><strong>Mobil:</strong> ' + tmpStr + '</span><br/>');
   }

   // Email
   tmpStr = PropertyUtil.getString(item,'mail','');
   if (tmpStr !==  "") {
      out.print('<span class="kontaktaxossxxxbrodtext"><strong>E-post:</strong> <a titel href="mailto:' + tmpStr + '"> ' + tmpStr + '</a></span><br/>');
   }

   // Besöksadress
   tmpStr = PropertyUtil.getString(item,'description','');
   if (tmpStr !==  "") {
      out.print('<p><strong>Besöksadress: </strong>' + tmpStr + '</p>');
   }		

   // Öppettid
   tmpStr = PropertyUtil.getString(item,'businessCategory','');
   if (tmpStr !==  "") {
      out.print('<p><strong>Öppettider: </strong>' + tmpStr + '</p>');
   }		

   out.print('</li>');

   if (idx === array.length - 1){
      out.print('</ul>'); 
   }
});
                 