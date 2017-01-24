var PropertyUtil = require('PropertyUtil'),
	DateUtil = require('DateUtil'),		
   PortletContextUtil = require('PortletContextUtil');   
	
//Java classes
var Calendar = Java.type('java.util.Calendar'),
	GregorianCalendar = Java.type('java.util.GregorianCalendar'),
	LocalDateTime = Java.type('java.time.LocalDateTime'),
	DateTimeFormatter = Java.type('java.time.format.DateTimeFormatter');

var page = PortletContextUtil.getCurrentPage(),
	data = PropertyUtil.getString(page,"openHours"),   
	thisUrl = "/" + PortletContextUtil.getCurrentPage().getIdentifier()+"/openhours.portlet";


var DAY_SWEDISH = ["", "söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"], // Calendar sunday starts on 1
    DAY_SWEDISH_INIT_CAP = ["", "Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"],
    CHECK_DAYS_FORWARD = 8,
    MIN_REFRESH_WAIT_MS = 5*60*1000,  // 5 minutes
    MAX_REFRESH_WAIT_MS = 60*60*1000; // 60 minutes



if (data && !data.isEmpty()){	
	var business = JSON.parse(data);  
   var closeinfo = PropertyUtil.getString(page, 'stangtinfo');
   var openinfo = PropertyUtil.getString(page, 'openinfo');   
	business = new OpenHour(business, openinfo, closeinfo, null);
      
   var json = (JSON.stringify(business));
}
    

// Function logic below

function getNextOpenOpenHours (openingHours){
	var daysOffset = 0;   
  var nextOpenHours, openHours;
		
	var day = new GregorianCalendar();
	var now = new Date();	  
   
         	
	while (daysOffset < CHECK_DAYS_FORWARD){      
		openHours = getOpenHoursForDay(day, openingHours);                 
		if(openHours.opensDate !== null && (daysOffset > 0 || (daysOffset === 0 && now < openHours.opensDate))) {                          			
			return openHours;			
		}
		
		daysOffset++; 
		day.add(Calendar.DAY_OF_YEAR,1);                              
	} 	 
	
	return null;
}


function getNextOpenTimeInfo(currentDay, openingHours) {
    var status;
    var foundNextOpenTime = false;
    var dayOffset = 0;
    var day = currentDay.clone();

    var nextOpenTime;

    var currHour = day.get(Calendar.HOUR_OF_DAY);
    var currMinute = day.get(Calendar.MINUTE);
    var opentime, openHour, openMinute;


    while (dayOffset < CHECK_DAYS_FORWARD && !foundNextOpenTime) {
        openHours = getOpenHoursForDay(day, openingHours);

        if (openHours.opens !== null) {
            opentime = openHours.opens.split(":");
            openHour = parseInt(opentime[0], 10);
            openMinute = parseInt(opentime[1], 10);
            // is today before open or following days
            if ((dayOffset === 0 && (openHour > currHour || (openHour == currHour && openMinute > currMinute))) || dayOffset > 0) {
                nextOpenTime = timeFormat(openHours.opens);
                foundNextOpenTime = true;
            }
        }

        if (!foundNextOpenTime) {
            dayOffset++;
            day.add(Calendar.DAY_OF_YEAR, 1);
        } else {
            switch (dayOffset) {
                case 0: // today
                    return "öppnar kl. " + nextOpenTime;                    
                case 1: // tomorrow
                    return "öppnar imorgon kl. " + nextOpenTime;                    
                default:
                    if (dayOffset < 7) {
                        return "öppnar på " + DAY_SWEDISH[day.get(Calendar.DAY_OF_WEEK)] + " kl. " + nextOpenTime;
                    } else {                       
                        return "öppnar nästa " + DAY_SWEDISH[day.get(Calendar.DAY_OF_WEEK)] + " kl. " + nextOpenTime;
                    }

                    break;
            }
        }
    }
    return "nästa öppetid,<br>se kalendern nedan";
}

function timeFormat(time) {
    var splitTime = time.split(":");
    var minutes = splitTime[1] == "00" ? "" : splitTime[1];
    return splitTime[0] + minutes;
}

function openHourRuleToDate(day, time){
	var retDate = new Date(DateUtil.getCalendarAsISO8601String(day));
	
	var timeParts = time.split(":");
	parseInt(timeParts[0],10);
	parseInt(timeParts[1],10); 	
	retDate.setHours(parseInt(timeParts[0],10));
	retDate.setMinutes(parseInt(timeParts[1],10));
   retDate.setSeconds(0);
   retDate.setMilliseconds(0);

	return retDate;
}

function getOpenHoursForDay(day,openingHours){
   
   var openHours = {opens: null, 
                    closes: null,
										opensDate: null,
										closesDate: null};
   

	for(var i = 0;i <openingHours.length ; i++) {
		var openHourRule = openingHours[i];      

		if (openHourRule.type == "closed" && isTodayInDateList(day, openHourRule.datelist)) {         
			openHours.closes = null;
			openHours.opens = null;
			openHours.opensDate = null;
			openHours.closesDate = null;
			break;
		}

		if (openHourRule.type == "normal") {               
			if(openHours.opens === null && isDayRuleValid(day, openHourRule.repeat.inday) && isMonthRuleValid(day, openHourRule.repeat.inmonth)){            
				openHours.opens = openHourRule.open;
				openHours.closes = openHourRule.close;
				openHours.opensDate = openHourRuleToDate(day,openHourRule.open);
				openHours.closesDate = openHourRuleToDate(day,openHourRule.close);
				
			}                 
		}

		if (openHourRule.type == "changed") {                                      
			if(isTodayInDateList(day, openHourRule.datelist)){                       
				openHours.opens = openHourRule.open;
				openHours.closes = openHourRule.close;   
				openHours.opensDate = openHourRuleToDate(day,openHourRule.open);
				openHours.closesDate = openHourRuleToDate(day,openHourRule.close);				
			}         
		}
	}              

   return openHours;
}

function isOpenNow(now, openHours) {

    try {
        var currHour = now.get(Calendar.HOUR_OF_DAY);
        var currMinute = now.get(Calendar.MINUTE);
        var opentime = openHours.opens.split(":");
        var closetime = openHours.closes.split(":");
        var openHour = parseInt(opentime[0], 10);
        var openMinute = parseInt(opentime[1], 10);
        var closeHour = parseInt(closetime[0], 10);
        var closeMinute = parseInt(closetime[1], 10);

        return ((openHour < currHour || (openHour == currHour && openMinute <= currMinute)) &&
            (closeHour > currHour || (closeHour == currHour && closeMinute > currMinute)));

    } catch (err) {
        return false;
    }
}

function isOpenDuringDay(openHours) {
    return openHours.opens !== null;
}

function isTodayInDateList(today, dateList) {
    for (var i = 0; i < dateList.length; i++) {
        var closedate = String(dateList[i].date);
        if (DateUtil.getCalendarAsString("yyyyMMdd", today).equals(closedate)) {
            return true;
        }
    }

    return false;
}

function isDayRuleValid(drDay, inDay) {
    var dayRuleLength, dayName, nth;
    var validRule = false;

    for (var i = 0; i < inDay.length && !validRule; i++) {
        dayRuleLength = inDay[i].length;
        dayName = inDay[i].substr(dayRuleLength - 2, dayRuleLength);

        if (dayRuleLength > 2) {
            nth = parseFloat(inDay[i].substr(0, dayRuleLength - 2));
            if (getDayOfMonthForNthDayOfWeekInMonth(drDay.get(Calendar.MONTH), drDay.get(Calendar.YEAR), nth, dayName) == drDay.get(Calendar.DAY_OF_MONTH)) {
                validRule = true;
            }
        } else if (getDayOfWeekByDayName(dayName) == drDay.get(Calendar.DAY_OF_WEEK)) {
            validRule = true;
        }
    }

    return validRule;
}

function isMonthRuleValid(day, inMonth) {
    var isValid = true;
    for (var i = 0; i < inMonth.length; i++) {
        isValid = false;

        if ((day.get(Calendar.MONTH) + 1) == inMonth[i]) {
            isValid = true;
            break;
        }
    }
    return isValid;
}

function getDayOfWeekByDayName(day) {
    var daysOfWeek = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

    for (var i = 0; i < 7; i++) {
        if (day.equals(daysOfWeek[i])) {
            return i + 1;
        }
    }
}

function getDayOfMonthForNthDayOfWeekInMonth(month, year, nth, day) {

    var dayNo = getDayOfWeekByDayName(day); //Gregorian sunday starts on 1
    var gc = new GregorianCalendar();		
    var days = 0;

    gc.set(Calendar.YEAR, year);
    gc.set(Calendar.MONTH, month);
    gc.set(Calendar.DAY_OF_MONTH, 1);

    days = dayNo - gc.get(Calendar.DAY_OF_WEEK);
    if (days < 0) {
        days = +7;
    }

    days = days + (nth - 1) * 7;
    gc.add(Calendar.DAY_OF_MONTH, days);
    return gc.get(Calendar.DAY_OF_MONTH);
}

// Main class object
function OpenHour(business, openInfo, closeInfo, maplink) {
    this.place = business.place;
    this.extrainfo = business.extrainfo;   
    this.address = business.address;
    this.validto = business.validto;
    this.mapLink = maplink;
    this.nextDays = [];
    this.open = null;
    this.expires = null;	 
    this.nextHourInfo = "";
    var day = new GregorianCalendar();		
    var openHours = getOpenHoursForDay(day, business.openinghours);


    if (closeInfo && closeInfo.length() > 0) {
        this.open = false;
        this.nextHourInfo = closeInfo;    
				this.expires = MIN_REFRESH_WAIT_MS;
    } else if (openInfo && openInfo.equals("ÖPPET")){
       this.open = true;
       this.nextHourInfo = "tillsvidare.";
       this.expires = MIN_REFRESH_WAIT_MS;
    } else {       
       if (openInfo){  
    		 var nowDateTime = LocalDateTime.now(); 
         var formatter = DateTimeFormatter.ofPattern("yyyyMMdd H:m");
         var openInfoDateTime = LocalDateTime.parse(openInfo, formatter);          
                                       
          if(openInfoDateTime.isAfter(LocalDateTime.now())){
          	this.open = true;                                                      
          }
          
       } 
       
       
       if(this.open === null) {
				var now = new Date();
       	this.open = isOpenNow(day, openHours);   

        if (this.open) {
            this.nextHourInfo = "stänger kl. " + timeFormat(openHours.closes);
						this.expires = Math.ceil((openHours.closesDate.getTime() - now.getTime())/1000) * 1000;  
        } else {
					var nextOpenHours = getNextOpenOpenHours(business.openinghours);
					if(isOpenDuringDay(nextOpenHours)) {
							this.expires = Math.ceil((nextOpenHours.opensDate.getTime() - now.getTime())/1000) * 1000;            
				 }		

            this.nextHourInfo = getNextOpenTimeInfo(day, business.openinghours);
        }
       }
       
       if (this.expires > MAX_REFRESH_WAIT_MS) {
         this.expires = MAX_REFRESH_WAIT_MS;
      }
    }

}
