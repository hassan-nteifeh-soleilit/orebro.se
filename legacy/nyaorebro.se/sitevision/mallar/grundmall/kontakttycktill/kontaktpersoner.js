var propertyUtil = require('PropertyUtil'),
    currentPage = require('PortletContextUtil').getCurrentPage();

var contacts = [],
    contact,
    tmpStr,
    noOfContacts = 0;

for(i=1; i<4; i++){
   contact = propertyUtil.getNode(currentPage, 'kontaktperson'+i);
   if(contact !== null) {
      contacts.push(contact);
      noOfContacts++;
   }
}

if (noOfContacts > 0){
   out.print('<h3>Kontaktperson</h3><ul>');   
}

for(i=0; i< noOfContacts; i++) {

   out.print('<li class="kontaktaxossxxxbrodtext"');

   // Name (given name and surname)         
   out.print('<span><strong>Namn:</strong> ' + propertyUtil.getString(contacts[i],'displayName','') + '</span><br/>');

   // Title
   tmpStr = propertyUtil.getString(contacts[i],'title','');
   if (tmpStr !==  "") {
      out.print('<span><strong>Titel:</strong> ' + tmpStr + '</span><br/>');
   }

   // Telephone number
   tmpStr = propertyUtil.getString(contacts[i],'telephoneNumber','');
   if (tmpStr !==  "") {
      out.print('<span><strong>Telefon: </strong> ' + tmpStr + '</span><br/>');
   }

   // Mobile telephone number
   tmpStr = propertyUtil.getString(contacts[i],'mobile','');
   if (tmpStr !==  "") {
      out.print('<span><strong>Mobil:</strong> ' + tmpStr + '</span><br/>');
   }

   // Email
   tmpStr = propertyUtil.getString(contacts[i],'mail','');
   if (tmpStr !==  "") {
      out.print('<span><strong>E-post:</strong> <a titel href="mailto:' + tmpStr + '"> ' + tmpStr + '</a></span><br/>');
   }

   out.print('</li>');
}

if (noOfContacts > 0){
   out.print('</ul>');   
}