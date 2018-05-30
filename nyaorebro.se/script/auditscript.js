$(document).ready(function() {
	var prog = 0;
	var procent = 0;
	var limit=1;

	// ökar eller minskar progressbar
	var pb = function(x) {
			prog=(prog+x);
			//procent=(prog*5);
			$('.p-bar').css('width', prog+'%');
			$('.p-bar').html(prog+'%');
			$('.p-bar').css('background-color', '#fff484');

		};
	$('.btn2').click(function(){
    	var count =	$('input:checked').length; // Kollar att frågan är besvarad
    	   	if (limit>count) {
    		$('.error').css('display', 'block');
    		}
    	//om alla frågor är besvarade
		else if (count == 11){
			
				$('.error').css('display', 'none');
				$(this).closest('.qq').slideUp('fast');
				$(this).closest('.qq').next('.qq').slideDown('fast');
				//Hide progressbar
				$('.prog').css('display', 'none');
				// Get gender from first question
				var gender = $( "input:radio[name=g1]:checked" ).val();
				//var age = $( "input:radio[name=a1]:checked" ).val()
				
				//Get checked value from each question
				var q1 = parseInt($( "input:radio[name=q1]:checked" ).val());
				var q2 = parseInt($( "input:radio[name=q2]:checked" ).val());
				var q3 = parseInt($( "input:radio[name=q3]:checked" ).val());
				var q4 = parseInt($( "input:radio[name=q4]:checked" ).val());
				var q5 = parseInt($( "input:radio[name=q5]:checked" ).val());
				var q6 = parseInt($( "input:radio[name=q6]:checked" ).val());
				var q7 = parseInt($( "input:radio[name=q7]:checked" ).val());
				var q8 = parseInt($( "input:radio[name=q8]:checked" ).val());
				var q9 = parseInt($( "input:radio[name=q9]:checked" ).val());
				var q0 = parseInt($( "input:radio[name=q0]:checked" ).val());
				
				// Sums up value to one var
				var qq = (q1 + q2 + q3 + q4 +q5 +q6 + q7 + q8 +q9 + q0);
				//Placerar markören på rätt del av skalan
				
				// om det är en kvinna
				if (gender ==="kvinna"){	
					if (qq === 0) {
						place = 0;
						$('.aa4').show();
						}
					
					if (qq > 0 && qq < 7) {
						place=qq*2.5;
						$('.aa4').show();
						}
					if (qq > 6 && qq < 14){
						place=qq*2.5;
						$('.aa3').show();
					}
					if (qq > 13 && qq < 18) {
						place=qq*2.5;
						$('.aa2').show();
					}
					if (qq > 17) {
						if (qq > 34) {
							place=95;
							}
						else {
							place=qq*2.5;
						}
						$('.aa1').show();
					}
				}
			// om det är en man
				else {
				if (qq === 0) {
						place = 0;
						$('.aa4').show();
						}
					if (qq > 0 && qq < 8) {
						place=qq*2.5;
						$('.aa4').show();
						}
					if (qq > 7 && qq < 16){
						place=qq*2.5;
						$('.aa3').show();
					}
					if (qq > 15 && qq < 20) {
						place=qq*2.5;
						$('.aa2').show();
						}
					if (qq > 19) {
						if (qq > 34) {
							place=95;
							}
						else {
							place=qq*2.5;
						}
					$('.aa1').show();
               }
				}
				//$('.duContainer').css('left', place-5+"px"); // PLACERAR MED PIXLAR - gamla funktionen
				$('.duContainer').css('left', place +"%"); // PLACERAR MED PROCENT
				$(".resultatet").html(qq + " poäng " + "("+gender+")");
				return false;
			
		}
		// slut alla frågor besvarade
		
		
		else {
    		limit++;
    		$('.error').css('display', 'none');
			$('#test').html("limit:"+limit + " // count:"+count);
			$(this).closest('.qq').slideUp('fast');
			$(this).closest('.qq').next('.qq').slideDown('fast');
			pb(10);
			}
	});
   // Bakåtfunktion
	$('.btnBack').click(function(){
		$(this).closest('.qq').slideUp('fast');
		$(this).closest('.qq').prev('.qq').slideDown('fast');
		pb(-10);
		limit--;
		return false;
	});
   //Starta undersökningen
	  $('.btn1').click(function(){
		$(this).css('display', 'none');
		$('.prog').css('display', 'block');
		$('.q1').slideToggle('fast');
      $('.intro-hide').hide();
		return false;
	});
	
	
   //Kontakt
	  $('.contact-click').click(function(){
		$(this).next('.contact').slideToggle('fast');
      $('i', this).toggleClass('fa-minus');
        $('i', this).toggleClass('contact-clicked');
      //$('.contact').slideToggle('fast');
		return false;
	});
});