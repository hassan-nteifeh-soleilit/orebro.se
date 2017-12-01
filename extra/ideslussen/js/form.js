$("#end").submit(function(event){
   event.preventDefault();
   window.location.href='/omideslussen.4.17bd677b15a180b3e7e71e3.html';
});

$("#start").submit(function(event){
	event.preventDefault();
	var form = $( "#start" );
	form.validate();
	if(form.valid() ){
		$("#start").hide();
		$("#form").show();
		$("fieldset:not(:first-of-type)").hide();
		$("fieldset:first-of-type ul:first-of-type li:first-of-type").addClass("active")
		$(".textInput").first().focus();
	}
});

$(".textInput,.textInputContact").blur(function(){
	$(this).prev().html($(this).val());
	$("#email-" + $(this)[0].name).val($(this).val());
});
	
$(".change").click(function(){
	$(this).siblings().prop('disabled', function (_, val) { return ! val; });
	$(this).closest('.check').children("textarea").focus().toggleClass('active');
	$(this).closest('.check').children(".shadow").toggleClass('active');

	var clicks = $(this).data('clicks');
	if (clicks) {
		$(this).text('Ändra');
		$('#email .send').prop('disabled',false);
	} else {
		$(this).text('Spara');
		$('#email .send').prop('disabled',true);
	}
	$(this).data("clicks", !clicks);

});


var current_fs, next_fs, previous_fs;

$(".next").click(function(){
	var form = $( "#form" );
	form.validate();
	if(form.valid() ){
		if ($(this).closest('fieldset').find('textarea').val()== '') {
			alert('Du har glömt att svara på frågan.');
		} else {
			current_fs = $(this).parent();
			next_fs = $(this).parent().next();
			next_fs.children(".progress-box").children().children().eq($("fieldset").index(next_fs)).addClass("active");
			next_fs.children(".progress-box").children().children().eq($("fieldset").index(current_fs)).removeClass("active");
			current_fs.hide();
			next_fs.show().find('.textInput').first().focus();
		}
	}

});

	// Inaktivera bakåt knappen i webbläsaren
	if ($('#form').hasClass('active')) {
		window.onbeforeunload = function() { return "Formuläret kommer nollställas."; };
	}

$(".back").click(function(){
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	previous_fs.children(".progress").children().eq($("fieldset").index(previous_fs)).addClass("active");
	previous_fs.children(".progress").children().eq($("fieldset").index(current_fs)).removeClass("active");
	//$(".progress li").eq($("fieldset").index(previous_fs)).addClass("active");
	//$(".progress li").eq($("fieldset").index(current_fs)).removeClass("active");
	current_fs.hide();
	previous_fs.show().find('.textInput').focus();
});

$("#review").click(function(){
	var form = $( "#form" );
	form.validate();
	if(form.valid() ){
		$("fieldset input").hide();
		$(".oris ul").hide();
		$(".desc").hide();
		$(".contact").hide();
		$("fieldset").show();
		$(".change").show();
		$(".textContact").show();
		$("#submit").show();
		$("#unReview").show();
		$("fieldset").addClass('check');
		$("#form").addClass('bg-white');
		$("#form").show();
		$('.textInput').prop('disabled',true);
		$('#start').hide();
		$('.text').scrollTop(0);
		$(".shadow").addClass('active');
		$(".col").toggleClass('col-xs-6 col-xs-12');
	}
});


$("#unReview").click(function(){
	$('.btn.change').text('Ändra');
	$("textarea").blur().removeClass('active');;
	$(".shadow").removeClass('active');

	$("#form").show();
	
	$("fieldset input").show();
	$("#form fieldset:first-child .back").hide();
	$("ul").show();
	$(".desc").show();
	$(".contact").show();
	
	$("fieldset:last-of-type .next").hide();
	$(".change").hide();
	$(".textParagraph").hide();
	$("#submit").hide();
	$("#unReview").hide();
	
	$("fieldset:not(:last-of-type)").hide();

	$("#form fieldset").removeClass('check');
	$("#form").removeClass('bg-white');
	$('.textInput').prop('disabled',false);
	$(".col").toggleClass('col-xs-6 col-xs-12');

});

$(".change-contact").click(function(){
	$(".textContact").prop('disabled', function (_, val) { return ! val; });
	$(".textContact").first().focus();
	$(".title").toggleClass('active');
	$(".col").toggleClass('col-xs-6 col-xs-12');
});

 $(".send").click(function(){
	setTimeout(function(){
		$('#result').hide();
		$('#end').show();
	}, 3000);
}); 


$(function() {
	var i = 1;
	var list = "";
	$("fieldset").each(function(){
		list += "<li>";
		list += i;
		list += "</li>";
		i++;
		//räkna antal fieldsets
		//skapa en <li> per fieldset
		//hämta index för innevarande fieldset
		//append lista till <ul>
		//sätt innevarande fieldset till aktivt
	});
	$(".progress").each(function(){
		$(this).append($(list)); 
		//$(this).hide();
	});
    //var txt2 = $("<p></p>").text("Text.");
    //$("body").append(txt1, txt2, txt3);      
});


// Visa mer eller mindre text
$(function() {
	$('.showless').hide();
	$(".hidden-input").show();

	if ($('.text').lenght > 0) {
	    if ($('.text')[0].scrollHeight > $('.text').innerHeight()) {
	        $('.showmore').show();
	    }
	}

	$('.showmore').click(function () {
		var text = $(this).parent().find('.text');
		text.animate({height:text[0].scrollHeight}, 500);
		$(this).parent().find('.shadow').animate({opacity:0}, 500);
		$(this).hide();
		$(this).parent().find('.showless').show();
	});

	$('.showless').click(function () {
		$(this).parent().find('.text').animate({height:'70px'}, 500);
		$(this).parent().find('.shadow').animate({opacity:1}, 500);
		$(this).hide();
		$(this).parent().find('.showmore').show();
	});
});

jQuery.extend(jQuery.validator.messages, {
    required: "Detta fältet måste fyllas i.",
	pattern: "Ange ett korrekt användarnamn",
    digits: "Detta fält får bara innehålla siffror.",
    email: "En korrekt e-postadress måste anges."
});



// Kolla hur många rader textarea innehåller
function checkTextLength() {

	$('.textInput').each(function() {
		var str = $(this).val();
		parts = str.split(/[\n\r]/g);
		var newline_count = parts.length;
		// $(this).next().html(newline_count);

		if ( (newline_count < 3 && str.length < 150) ) {
			$(this).parent('.check').find('.shadow').hide();
			$(this).parent('.check').find('.showmore').hide();
		} else {
			$(this).parent('.check').find('.shadow').show();
			$(this).parent('.check').find('.showmore').show();
		}
	});    
}

$('.textInput').keydown(checkTextLength);
$('#review').click(checkTextLength);
