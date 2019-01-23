$('.tabs-plusbox').append('<div class="tabs-plusbox-content" />');
$('.tabs-plusbox .or-plus-box-diskret-content').each(function() {
	var data = $(this).clone();
    
    $('.tabs-plusbox-content').append(data);
});


$('.tabs-plusbox .or-plus-box-header').click(function() {
    $(this).addClass('or-plus-box-active').parent().siblings().find('.or-plus-box-active').removeClass('or-plus-box-active');

    var dataID = $(this).find('.plusboxxrubrik').text();
    console.log(dataID);
    $('.tabs-plusbox-content [data-id="'+dataID+'"]').slideToggle().toggleClass('active').siblings().slideUp().removeClass('active');

	if ( $('.tabs-plusbox-content .or-plus-box-content.active').length < 1 ) {
    	$('.tabs-plusbox .or-plus-box-header').removeClass('or-plus-box-active');
    }
});