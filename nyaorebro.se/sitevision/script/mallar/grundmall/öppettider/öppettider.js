var propertyUtil = require('PropertyUtil');
var dateUtil = require('DateUtil');
var resourceLocatorUtil  = require("ResourceLocatorUtil");
var page = resourceLocatorUtil.getNodeByIdentifier("4.5ab4ab37154229e2ec88610");

var data = propertyUtil.getString(page,"openHours");

var Calendar = Java.type('java.util.Calendar');


var DAY_SWEDISH = ["", "söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"]; // Calendar sunday starts on 1
var DAY_SWEDISH_INIT_CAP = ["", "Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];
var NEXT_DAYS = 8;


if (data && !data.isEmpty()){	
	var business = JSON.parse(data);  
      
	//TODO: Stänga snabbt?
	//closeinfo = propUtil.getString(aNode, 'stangtinfo');    
   var closeinfo = propertyUtil.getString(page, 'stangtinfo');
	business = new OpenHour(business, closeinfo, null);
}
    

// Function logic below

function getNextOpenTimeInfo(currentDay, openingHours) {
    var status;
    var foundNextOpenTime = false;
    var dayOffset = 0;
    var day = currentDay.clone();

    var nextOpenTime;

    var currHour = day.get(Calendar.HOUR_OF_DAY);
    var currMinute = day.get(Calendar.MINUTE);
    var opentime, openHour, openMinute;


    while (dayOffset < NEXT_DAYS && !foundNextOpenTime) {
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

function getOpenHoursForDay(day, openingHours) {

    var openHours = {
        opens: null,
        closes: null
    };


    for (var i = 0; i < openingHours.length; i++) {
        var openHourRule = openingHours[i];

        if (openHourRule.type == "closed" && isTodayInDateList(day, openHourRule.datelist)) {
            openHours.closes = null;
            openHours.opens = null;
            break;
        }

        if (openHourRule.type == "normal") {
            if (openHours.opens === null && isDayRuleValid(day, openHourRule.repeat.inday) && isMonthRuleValid(day, openHourRule.repeat.inmonth)) {
                openHours.opens = openHourRule.open;
                openHours.closes = openHourRule.close;
            }
        }

        if (openHourRule.type == "changed") {
            if (isTodayInDateList(day, openHourRule.datelist)) {
                openHours.opens = openHourRule.open;
                openHours.closes = openHourRule.close;
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
        if (dateUtil.getCalendarAsString("yyyyMMdd", today).equals(closedate)) {
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
function OpenHour(business, openinfo, maplink) {
    this.place = business.place;
    this.extrainfo = business.extrainfo;   
    this.address = business.address;
    this.validto = business.validto;
    this.mapLink = maplink;
    this.nextDays = [];
    this.nextHourInfo = "";
    var day = new java.util.GregorianCalendar();
    var openHours = getOpenHoursForDay(day, business.openinghours);


    if (openinfo && openinfo.length() > 0) {
        this.open = false;
        this.nextHourInfo = openinfo;
    } else {
        this.open = isOpenNow(day, openHours);

        if (this.open) {
            this.nextHourInfo = "stänger kl. " + timeFormat(openHours.closes);
        } else {
            this.nextHourInfo = getNextOpenTimeInfo(day, business.openinghours);
        }
    }

}
