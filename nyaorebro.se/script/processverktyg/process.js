$( document ).ready(function($) {
	$(function($) {
		$(".sol_process_flow_container").find("form").each(function() {
			$form = $(this);
			$portlet_container = $form.parents(".sv-portlet");
			targetId = $portlet_container.attr("id").substring(4).replace('_','.');
			$form.ajaxForm({
				target: '#' + $portlet_container.attr("id"),
				url: $form.attr("action").replace('.html','.'+currentPage.id+'.'+targetId+'.portlet'),
				success: function (responseText) {
					if (!(responseText.indexOf("<form")>=0)){
						$(".sol_next").removeClass("disabled")
                  $(".sol_process_flow_container").animate({height:50});
               }
				}
			});
		});
      $(".sol_process_flow_container").each(function(){
   	   var container = $(this);
         var parent = container.parents(".sol_process_flow_outer");

         var stages = parent.parent().find("li.sol_step");
         if(stages.length == 2){
            stages.css("width","50%");
         }else if(stages.length == 3){
            stages.css("width","33.33%");
         }
         container.cycle({
            fx:'none',
            autostop:true,
            autostopCount:1,
            timeout:0,
            nowrap: true,
            after: function (curr, next, opts,ff) {
                  $this= $(this);
                  var $ht = $this.height();
                  stages.removeClass("active");
                  $(stages[$this.index()]).addClass("active");
                  $this.parent().animate({height: $ht});
                  var stop = false;
                  var last = $this.is(":last-child");
                  var first = $this.is(":first-child");
                 if ( first )
                     $(parent).find(".sol-prev").addClass('disabled');
                 else
                     $(parent).find(".sol-prev").removeClass('disabled');
                 if ( last || stop )
                     $(parent).find(".sol-next").addClass('disabled');
                 else
                     $(parent).find(".sol-next").removeClass('disabled');
             }
         });
         
         $(parent).find(".sol_next").click(function() {
            if (!$(this).hasClass("disabled"))
               container.cycle('next');
         })
         $(parent).find(".sol_prev").click(function() {
            container.cycle('prev');
         });
         $(parent.parent().find(".sol_step")).click(function() {
            container.cycle($(this).index());
         });
	});
});

});
