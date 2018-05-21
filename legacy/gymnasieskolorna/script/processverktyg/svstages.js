(function($) {
  var isOnlineMode = window.self === window.top;

  $.fn.svprocess = function() {
    if (isOnlineMode) {
      $(this).each(function () {
         var element, panes, counter, stages, headline, tabname;

         element = $(this);
         panes = $('> div', this);

         while (panes.length == 1)
            panes = panes.first().find('> div');

         if (panes.length > 0) {

            counter = 1;
            stages = $('<ul class="sol_steps clearfix">');

            panes.each(function(i, pane) {

               headline = $('h2', pane).first();
               tabname = 'Steg ' + counter++;
               if (headline.text() != "") {
                  tabname = headline.text();
                  headline.hide();
               }

               stage = $('<li class="sol_step' + (i==0?' active':'')+'" data-indicator-for="' + $(pane).attr("id") +'"><span class="rubrikxprocessxsteg">' + tabname + '</span></li>');
               stages.append(stage);
            });
            element.parent().parent().parent().before(stages);

         }
      });
    }
  };
})($);

$(function() {
  $('.sol_process_flow_container').svprocess();
});
