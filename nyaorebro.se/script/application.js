(function($) {
	/* Document ready */
	$(function() {        
		if (!sv.PageContext.inEditMode) {
			/* Delegate on html works on html loaded by ajax calls */
			$('html').delegate('.or-wrapper-click', 'click', function (event) {            
				if(!$(event.target).is("a")) {
					if($('a:first', this).length > 0){
						try {
							$('a:first', this)[0].click();
						} catch(err) {
							window.location = $('a:first', this).attr("href");
						}
					}
				}
			});
		}

		/* Case insensitive :contains */
		$.expr[':'].contains = function(a, i, m) {
			return $(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
		};  	      

		/* Kontakta oss "molnet" */
		$('.or-contact-bar-info-container').css('display', 'none');
		$('.or-contact-bar').click(function() {
			$(this).parent().next().slideToggle();
			$(this).find(".or-contact-bar-icon i").toggleClass('fa-rotate-45');
		});


		/* Ikoner i dokumentlistningsrutorna */
		$(".or-related-documents .or-text-content a").each(function(index) {
			var title = $(this).attr("title");
			var icon, sizeStr;

			try {
				if (title && title.length > 0) {
						title = title.replace('(', '').replace(')', '').replace('öppnas i nytt fönster','');
						var titleSplit = title.split(',');
						icon = titleSplit[0];
						sizeStr = titleSplit[1].replace(' ', '');
				}
			} catch (err) {
				console.log('Error document icons');
			}
			
			if (sizeStr) {
				switch (icon) {
					case 'doc':
						icon = 'word';
						break;
					case 'pdf':
						icon = 'pdf';
						break;
					case 'xls':
						icon = 'excel';
						break;
					default:
						icon = '';
				}
				var content = '<i class="fa fa-file-' + icon + '-o"><span>' + sizeStr + '</span></i>'
				$(this).prepend(content);
				$(this).next().text('');
			}
		});

		/* Expandera meny items */
		$(".or-tree .or-toggle-panel").click(function() {
			$(this).parent().toggleClass("or-expanded");
		});
	
		/* iCheck för formulär */
		 $('input').iCheck({
			checkboxClass: 'icheckbox_flat-red',
			radioClass: 'iradio_flat-red'
		});
	
	});
})(jQuery);