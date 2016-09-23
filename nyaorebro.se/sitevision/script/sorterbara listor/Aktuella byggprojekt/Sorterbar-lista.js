var svUtils = request.getAttribute('sitevision.utils');
var propUtil = svUtils.getPropertyUtil();
var dateUtil = svUtils.getDateUtil();
var resourceUtil = svUtils.getResourceLocatorUtil();
var linkRenderer = svUtils.getLinkRenderer();

//Procentuell bredd på kolumner i den ordning de visas, 0 = flytande bredd
var colWidth =[0,10,0,20,0]; 

var archives = [];
archives.push("3.656fbdf156a6f695e62654"); // Komunala byggprojekt
archives.push("3.656fbdf156a6f695e629e1"); // Gatuarbeten
archives.push("3.656fbdf156a6f695e62664"); // VA-projekt
archives.push("3.656fbdf156a6f695e62ad2"); // Fördjupad översiktsplan (handlingar i gemensam mapp FÖP)
archives.push("3.656fbdf156a6f695e62ad8"); // Detaljplaner
archives.push("3.656fbdf156a6f695e62ade"); // Planprogram

var sortColumn, articles = [];
var sortBy = "omrade";
var sort = 'down';
var reverse = false;
var antal = 0;


archives.forEach(function (identifier){
   var dateFrom, dateTo, obj;
   var archive = resourceUtil.getNodeByIdentifier(identifier);
   for (i = archive.getNodes(); i.hasNext();) {
      var n = i.next();
      
      if (n.isNodeType("sv:article")) {
         dateFrom = propUtil.getCalendar(n,'from');  
         dateTo = propUtil.getCalendar(n,'tom');  
         obj = [];	
         obj[0] = propUtil.getString(n,'SV.Title','');
         obj[1] = propUtil.getString(n,'omrade','');
         obj[2] = propUtil.getString(n,'typ','');
         obj[3] = propUtil.getString(n,'status','');
         obj[4] = dateFrom !== null && obj[3] != "Laga kraft" ?	 dateUtil.getCalendarAsString("d MMM",dateFrom) : '';
         obj[5] = dateTo !== null ? (obj[4] === '' ? '':' - ') + dateUtil.getCalendarAsString("d MMM yyyy",dateTo) : '';         
         linkRenderer.update(n);
         obj[6] = linkRenderer.render();
         // Sorteringskolumn för datum i ms      
         obj[7] = obj[5] !== '' ? Date.parse(dateUtil.getCalendarAsISO8601String(dateTo)) : 0;
         articles.push(obj);
      }	  	
	}
});


if(request.getParameter("sortBy") !== null) {
	sortBy = request.getParameter("sortBy")+"";

   sort = request.getParameter("sort");
   reverse = sort !== null && sort == 'down' ;   
   sort = reverse ? 'up' : 'down';
   
   
}

switch(sortBy) {
    case 'namn':
        sortColumn = 0;        
        break;
    case 'omrade':
        sortColumn = 1;
        break;
    case 'typ':
        sortColumn = 2;
        break;
    case 'status':
        sortColumn = 3;      
       break;
    case 'datum':
        sortColumn = 7;
        reverse = !reverse;
        break;		
}


articles.sort(function sortFunction (a, b){   
   var res;
   if (a[sortColumn] == b[sortColumn]) {     
      res = 0;
   } else if(reverse){
      res = (a[sortColumn] > b[sortColumn]) ? -1 : 1;
   } else {
      res = (a[sortColumn] < b[sortColumn]) ? -1 : 1;
   }
  return res;
});

var columns = [{sortKey:"typ", header:"Typ", width:20, title:"Sortera efter typ"},
              {sortKey:"omrade", header:"Område", width:10, title:"Sortera efter område"},
              {sortKey:"namn", header:"Beskrivning", width:20, title:"Sortera efter beskrivning"},
              {sortKey:"status", header:"Status", width:10, title:"Sortera efter status"},
              {sortKey:"datum", header:"Datum", width:5, title:"Sortera efter datum"}];

out.print('<div class="or-tb or-sortable">');
out.print(' <div class="or-tb-head">');
/*
out.print('  <div> <a href="?sortBy=typ' + (sortBy === 'typ' ? '&sort=' + sort  : '') + '" title="Sortera efter typ">Typ <span class="or-sort-box ' + (sortBy === 'typ' ? 'sorting-by' : '') + '"><i class="fa ' + (sortBy === 'typ' ? 'fa-sort-' + sort : 'fa-sort') + '"></i></span></a></div>');
out.print('  <div > <a href="?sortBy=omrade' + (sortBy === 'omrade' ? '&sort=' + sort  : '') + '" title="Sortera efter område">Område <span class="or-sort-box ' + (sortBy === 'omrade' ? 'sorting-by' : '') + '"><i class="fa ' + (sortBy === 'omrade' ? 'fa-sort-' + sort : 'fa-sort') + '"></i></span></a></div>');
out.print('  <div> <a href="?sortBy=namn' + (sortBy === 'namn' ? '&sort=' + sort  : '') + '" title="Sortera efter beskrivning">Beskrivning <span class="or-sort-box ' + (sortBy === 'namn' ? 'sorting-by' : '') + '"><i class="fa ' + (sortBy === 'namn' ? 'fa-sort-' + sort : 'fa-sort') + '"></i></span></a></div>');
out.print('  <div> <a href="?sortBy=status' + (sortBy === 'status' ? '&sort=' + sort  : '') + '" title="Sortera efter status">Status <span class="or-sort-box ' + (sortBy === 'status' ? 'sorting-by' : '') + '"><i class="fa ' + (sortBy === 'status' ? 'fa-sort-' + sort : 'fa-sort') + '"></i></span></a></div>');
out.print('  <div> <a href="?sortBy=datum' + (sortBy === 'datum' ? '&sort=' + sort  : '') + '" title="Sortera efter datum">Datum <span class="or-sort-box ' + (sortBy === 'datum' ? 'sorting-by' : '') + '"><i class="fa ' + (sortBy === 'datum' ? 'fa-sort-' + sort : 'fa-sort') + '"></i></span></a></div>');
*/
columns.forEach(function(column){
	var colSorted = sortBy === column.sortKey;
   var style = column.width > 0 ? 'style="width:'+column.width+'%"' :'';
	out.print('  <div ' + style + '> <a href="?sortBy=' + column.sortKey + (colSorted ? '&sort=' + sort  : '') + '" title="' + column.title + '">' + column.header + ' <span class="or-sort-box ' + (colSorted ? 'sorting-by' : '') + '"><i class="fa ' + (colSorted ? 'fa-sort-' + sort : 'fa-sort') + '"></i></span></a></div>');
});
                
out.print(" </div>");
var col;
   
articles.forEach(function(item,index){
   col = index % 2 === 0 ? "or-even" : "or-odd";
	out.print(' <div class="or-tb-row ' + col + '">');
	out.print('  <div><span class=or-tb-row-head>Typ:</span>' + item[2]+ '</div>');  
   out.print('  <div><span class=or-tb-row-head>Område:</span>' + item[1]+ '</div>');    
   out.print('  <div><span class=or-tb-row-head>Namn:</span>' + item[6] + ' </div>'); 
   out.print('  <div><span class=or-tb-row-head>Status:</span>' + item[3]+ '</div>'); 
   out.print('  <div><span class=or-tb-row-head>Datum:</span>' + item[4] + item[5] + '</div>');  
	out.print(' </div>');
});
out.print('</div>');