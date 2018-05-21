var PropertyUtil = require('PropertyUtil');
var currentPage = require('PortletContextUtil').getCurrentPage();

var config = {
    MAX_CONTACTS: 3
};

var getContacts = function() {
    var contacts = [];
    for (var i = 1; i < config.MAX_CONTACTS + 1; i++) {
        var contact = PropertyUtil.getNode(currentPage, 'kontaktperson' + i);
        if (contact) {
            contacts.push({
                name: PropertyUtil.getString(contact, 'displayName', ''),
                title: PropertyUtil.getString(contact, 'title', ''),
                phone: PropertyUtil.getString(contact, 'telephoneNumber', ''),
                mobile: PropertyUtil.getString(contact, 'mobile', ''),
                mail: PropertyUtil.getString(contact, 'mail', '')
            });
        }
    }
    return contacts;
};

try {
    var contacts = getContacts();
}
catch (e) {
    out.println("Error" + e);
}
