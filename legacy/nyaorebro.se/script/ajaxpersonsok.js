?var language = 'sv';
var qcPsokUrl = 'http://orebro.appliance.siteseeker.se/qc/personsok/';
var searchPsokUrl = 'http://orebro.appliance.siteseeker.se/search/personsok/';
var searchPsokFieldSelector = '.siteseeker_personsokruta';
var searchPsokButtonSelector = '.siteseeker_personsokknapp'; 
$(document).ready(function() { $(searchPsokFieldSelector).autocomplete(qcPsokUrl, { cacheLength: 0, extraParams: { ilang: language }, delay: 200, selectFirst: false, dataType: 'jsonp', highlight: false, scroll: false, parse: function(data) { return $.map(data, function(row) { return { data: row }; }); }, formatItem: function(item) { if (item) { var nHitString = "<span>" + item.nHits + "</span>"; return nHitString + item.suggestionHighlighted; } return; } }).result(function(event, item) { $(searchPsokFieldSelector).val(item.suggestion); $(searchPsokButtonSelector).click(); }); }); 