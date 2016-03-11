<script>
(function($) {    
  $(function() {     	
    var qcPsokUrl = 'http://orebro.appliance.siteseeker.se/qc/personsok/';
    //var searchPsokUrl = 'http://orebro.appliance.siteseeker.se/search/personsok/';
    var searchPsokFieldSelector = '.siteseeker_personsokruta';
    var searchPsokButtonSelector = '.siteseeker_personsokknapp'; 
	
    $( ".siteseeker_personsokruta" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: qcPsokUrl,
          dataType: "jsonp",
          data: {
            q: request.term,
            ilang: "sv"    
          },
          success: function( data ) {
            response( data );
          }
        });
      },      
      delay: 200,
      select: function( event, ui ) {
        $(searchPsokFieldSelector).val(ui.item.suggestion); 
        $(searchPsokButtonSelector).click();
      }
    }).autocomplete( "instance" )._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<span>" + item.nHits + "</span>" + item.suggestionHighlighted)
        .appendTo( ul );
    };
    
    /* Gör om e-post adress strängar i sökresultat till riktiga mailto a-taggar */
    $('span.email').each(function(index){
       var email = $(this).text().replace(/ punkt /g, ".").replace(/ snabela /g, "@");
       $(this).html(
         $("<a>").attr("href", "mailto:" + email).text(email)
       );
    });
    
  });
}(jQuery));
</script>