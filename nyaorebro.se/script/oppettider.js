//<![CDATA[
(function($) {
    $(function() {        
        // openhours definition get it by ajax?
        var openHourDateList = [];

        // datepicker Swedish regional settings
        $.datepicker.regional.sv = {
            closeText: 'Stäng',
            prevText: '&laquo;Förra',
            nextText: 'Nästa&raquo;',
            currentText: 'Idag',
            monthNames: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
            dayNamesShort: ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'],
            dayNames: ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'],
            dayNamesMin: ['Sö', 'Må', 'Ti', 'On', 'To', 'Fr', 'Lö'],
            weekHeader: 'Ve',
            dateFormat: 'yy-mm-dd',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };

        // set Swedish regional as datepicker default
        $.datepicker.setDefaults($.datepicker.regional.sv);

        var today = new Date();

        function getMonthOpenHours(place, year, month) {
            $.getJSON(dateListURL, {
                    "sv.contenttype": "application/json",
                    "place": place,
                    "month": month,
                    "year": year
                })
                .done(function(data) {
                    var openHoursList = {};
                    var monthYearKey = getMonthYearKey(month, year);
                    $.each(data.openDates, function(i, entry) {
                        var day = $.datepicker.parseDate('yy-mm-dd', entry.date).getDate();
                        openHoursList[day] = entry.openHours;
                    });
                    if (openHoursList) {
                        openHourDateList[place][monthYearKey] = openHoursList;
                    }

                    if ($("#" + place).hasClass('hasDatepicker')) {
                        $("#" + place).datepicker("refresh");
                    }
                });
        }

        function getMonthYearKey(month, year) {
            return (month * 10000 + year);
        }

        // datepicker beforeShowDay function
        function dayHighlighter(date) {
            var monthYearKey = getMonthYearKey(date.getMonth() + 1, date.getFullYear());
            var place = this.id;
            var r = [false, ""];
            if (place in openHourDateList && monthYearKey in openHourDateList[place]) {
                var openHours = openHourDateList[place][monthYearKey][date.getDate()];
                r[0] = true;
                if (openHours) {
                    r[1] = "open";
                    r[2] = "Öppet " + openHours;
                } else {
                    r[1] = "closed";
                    r[2] = "Stängt";
                }
            }

            return r;
        }


        // datepicker onChangeMonthYear function
        function refreshMonth(year, month, inst) {
            var place = inst.id;
            var monthYearKey = getMonthYearKey(month, year);
            // Only loaded if not already loaded
            if (!(monthYearKey in openHourDateList[place])) {
                getMonthOpenHours(place, year, month);
            }
        }

        // datepicker onSelect function
        function displayInfo(dateText, inst) {
            var date = $.datepicker.parseDate('yy-mm-dd', dateText);
            var dateTextStr = $.datepicker.formatDate("d MM", date, inst.settings);
            var monthYearKey = getMonthYearKey(date.getMonth() + 1, date.getFullYear());
            var dayInfo = openHourDateList[this.id] ? openHourDateList[this.id][monthYearKey][date.getDate()] : null;
            if (dayInfo) {
                dateTextStr += '<b><span class=\"or-oh-green\"> ÖPPET </span> kl. ' + dayInfo + '</b>';
            } else {
                dateTextStr += '<b><span class=\"or-oh-red\"> STÄNGT </span></b>';
            }

            var outputId = '#datePickerOutput-' + this.id;
            $(outputId).html(dateTextStr);
        }


        // init openhours data for current month of each calendar
        $('.or-oh-datePicker').each(function() {
            var month = today.getMonth() + 1;
            var year = today.getFullYear();
            var place = $(this).attr("id");
            //init openhours for this month	      
            openHourDateList[place] = {};
            getMonthOpenHours(place, year, month);

        });


        // show/hide station details        
				$(document).on('click', ".or-oh-header", function () {	
            $(this).next('.or-oh-content').slideToggle('fast');
						$(this).find('div.or-oh-chevron').toggleClass('expanded');
            $(this).parent().toggleClass('expanded');
            return false;
        });

        // show/hide calendar
				$(document).on('click', ".b1", function () {				
            var datePickerContainer = $(this).nextAll(".or-oh-content").find('.or-oh-datePicker');
            if (!datePickerContainer.hasClass('hasDatepicker')) {
                var place = datePickerContainer.attr("id");
                var validTo = $("#validto-" + place).attr("value");
                var monthYearKey = getMonthYearKey(today.getMonth() + 1, today.getFullYear());
                var maxDate = $.datepicker.parseDate('yymmdd', validTo);
                maxDate.setHours(0, 0, 0, 0);

                datePickerContainer.datepicker({
                    beforeShowDay: dayHighlighter,
                    onSelect: displayInfo,
                    onChangeMonthYear: refreshMonth,
                    minDate: 0,
                    maxDate: maxDate
                });

                datePickerContainer.find('.ui-datepicker-current-day').click();

                if (!(monthYearKey in openHourDateList[place])) {
                    var outputId = '#datePickerOutput-' + place;
                    $(outputId).html("<b><span class=\"or-oh-red\">Fel!</span></b> Kunde inte ladda öppetider.");
                }
            }
            $(this).nextAll(".or-oh-content").slideToggle('fast');
            return false;
        });

			function reloadInfo(){								
				$(openhoursContainer).load(dateListURL + "?refresh", function(response, status, xhr){						
						if (status != 'error') {
							setTimeout(function(){reloadInfo();}, refreshWaitMs);
						}
				});			
			}
									 							
			setTimeout(function(){reloadInfo(); console.log('First refresh');}, refreshWaitMs);
            
    });
}($svjq));
//]]>