importPackage(java.util);

// TODO: Add logic to get the folder of the businesses instead of hard coded id
var START_NODE_ID = '19.315e37c0152de67052f7a02';

var jcrSession = request.getAttribute("sitevision.jcr.session");
var svUtils = request.getAttribute('sitevision.utils');
var propUtil = svUtils.getPropertyUtil();
var linkUtil = svUtils.getLinkRenderer();
var dateUtil = svUtils.getDateUtil();
var rlUtil = svUtils.getResourceLocatorUtil();
var log = svUtils.getLogUtil();
var nodeTreeUtil = svUtils.getNodeTreeUtil();
var thisPage = svUtils.getPortletContextUtil().getCurrentPage();

var parentNode = jcrSession.getNodeByIdentifier(START_NODE_ID);
var children = parentNode.getNodes();

var paramPlace = !request.getParameter("place") ? "" : request.getParameter("place");

var DAY_SWEDISH = ["", "söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"]; // Calendar sunday starts on 1
var DAY_SWEDISH_INIT_CAP = ["", "Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];
var NEXT_DAYS = 8;

var place;
var aNode;
var business;
var businessnes = [];
var maplink;


if (paramPlace) {
    printJsonOpenhours();
} else {
    // Convert json of business to OpenHour object
    for (aNode = null; children.hasNext();) {
        aNode = children.next();
        business = eval('(' + propUtil.getString(aNode, 'oppettider') + ')');
        closeinfo = propUtil.getString(aNode, 'stangtinfo');
        maplink = propUtil.getStringEscaped(aNode, 'kartlank');

        businessnes.push(new OpenHour(business, closeinfo, maplink));
    }
    // Convert to java array when accessed from velocity   
    // businessnes = java.util.Arrays.asList(businessnes);
    printBusinessOpenHours(businessnes);


}


//Below is the presentation logic, preferably this should have been in the velocity part.
//However the array of next days openhours object within the business array is for some reason not accessible in velocity.
function printBusinessOpenHours(businessnes) {
    var today = new Date();
    out.print('\n');
    out.print('<script type="text/javascript">\n');
    out.print('  var dateListURL="/' + thisPage.getIdentifier() + '/openhours.portlet";\n');
    out.print('  var today = new Date("' + today + '");\n');
    out.print('</script>\n');

    //out.print("<div id=\"or-oh-wrapper\">\n");

    for (var k = 0; k < businessnes.length; k++) {
        var b = businessnes[k];
        var cOpen = b.open ? "open" : "closed";
        var cStatus = b.open ? "Öppet" : "Stängt";
        var place = b.place.split(" ")[0];

        //out.print("  <div class=\"or-oh-wrapp collapsed\">\n");
        out.print("    <div class=\"or-oh-header\">\n");        
        //out.print("      <div class=\"or-oh-name\"><a class=\"or-oh-a\" href=\"#\">" + b.place + "</a></div>\n");
        out.print("      <div class=\"or-oh-name\">" + b.place + "<div class=\"or-oh-extra\">" + b.extrainfo + "</div></div>\n");       
        out.print("      <div class=\"or-oh-" + cOpen + "\">" + cStatus + "</div>\n");
        out.print("      <div class=\"or-oh-time-info\">" + b.nextHourInfo + "</div>\n");
        out.print("      <div class=\"or-oh-chevron\"><i class=\"fa fa-plus fa-lg\"></i></div>\n");
        out.print("    </div>\n");
        out.print("    <div class=\"or-oh-content\">\n");
        out.print("      <div class=\"or-oh-column\">\n");

        printNextDaysTable(b);

        out.print("      </div>\n");
        out.print("      <div class=\"or-oh-column\">\n");
        out.print("        <div class=\"or-oh-button b1\"><i class=\"fa fa-calendar fa-lg\"></i><a class=\"or-oh-a\" href=\"#\">Välj ett datum</a></div>\n");
        out.print("        <div class=\"or-oh-content\">\n");
        out.print("          <div class=\"or-oh-datePicker\" id=\"" + place + "\"></div>\n");
        out.print("          <input type=\"hidden\" id=\"validto-" + place + "\" value=\"" + b.validto + "\"/>");
        out.print("          <div class=\"or-oh-datePickerOutput\" id=\"datePickerOutput-" + place + "\"></div>\n");
        out.print("        </div>\n");
        if (b.mapLink) {
            out.print("        <div class=\"or-oh-button b2\"><i class=\"fa fa-map-marker fa-lg\"></i><a class=\"or-oh-a\" href=\"" + b.mapLink + "\">Visa på kartan (" + b.address + ")</a></div>\n");
        }
        out.print("      </div>\n");
        out.print("    </div>\n");
        //out.print("  </div>\n");
    }

    //out.print("</div>");
}

function printNextDaysTable(business) {
    var OpenInfo;
    var cssRow;
    var cssOpen;
    var cssStatus;

    if (business.nextDays.length > 0) {
        out.print('        <table class="or-oh-openhours">\n');
        for (var i = 0; i < business.nextDays.length; i++) {
            var currentDay = business.nextDays[i];
            if (isOpenDuringDay(currentDay)) {
                cssOpen = 'open';
                cssStatus = 'öppet';
                openInfo = 'kl. ' + timeFormat(currentDay.opens) + '-' + timeFormat(currentDay.closes);
            } else {
                cssOpen = 'closed';
                cssStatus = 'stängt';
                openInfo = '';
            }
            cssRow = (i > 0 && i % 2 !== 0) ? '' : 'odd';

            out.print('          <tr class="' + cssRow + '"><td>' + currentDay.dayDescription + '</td><td class="' + cssOpen + '">' + cssStatus + '</td><td>' + openInfo + '</td></tr>\n');
        }
        out.print('        </table>\n');
    }
}


function printJsonOpenhours() {
    var openDateList = [];
    var today = new GregorianCalendar();
    var paramMonth = !request.getParameter("month") ? today.get(Calendar.MONTH) : request.getParameter("month") - 1;
    var paramYear = !request.getParameter("year") ? today.get(Calendar.YEAR) : request.getParameter("year");


    for (aNode = null; children.hasNext();) {
        aNode = children.next();
        business = eval('(' + propUtil.getString(aNode, 'oppettider') + ')');
        if (business.place.split(" ")[0] == paramPlace) {
            out.print("{\"openDates\":[");
            var gcDay = new GregorianCalendar(paramYear, paramMonth, 1);
            var daysInMonth = gcDay.getActualMaximum(Calendar.DAY_OF_MONTH);
            var delimit = false;
            for (var i = 0; i < daysInMonth; i++) {
                openHours = getOpenHoursForDay(gcDay, business.openinghours);
                if (isOpenDuringDay(openHours)) {
                    if (delimit) {
                        out.print(",");
                    }
                    out.print("{\"date\":\"" + dateUtil.getCalendarAsString("yyyy-MM-dd", gcDay) + "\",");
                    out.print("\"openHours\":\"" + timeFormat(openHours.opens) + "-" + timeFormat(openHours.closes) + "\"}");
                    if (!delimit) {
                        delimit = true;
                    }
                }

                gcDay.add(Calendar.DAY_OF_YEAR, 1);
            }
            out.print("]}");
        }
    }
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
                        //return "öppnar på " + DAY_SWEDISH[day.get(Calendar.DAY_OF_WEEK)] + " " + day.get(Calendar.DAY_OF_MONTH) + "/" + (day.get(Calendar.MONTH)+1) + " kl " + nextOpenTime;
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
    var day = new GregorianCalendar();
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

    // collect openhours for day and 6 days forward
    var dayDescription;
    for (var i = 0; i < 7; i++) {
        openHours = getOpenHoursForDay(day, business.openinghours);
        switch (i) {
            case 0:
                dayDescription = "I dag";
                break;
            case 1:
                dayDescription = "I morgon";
                break;
            default:
                dayDescription = DAY_SWEDISH_INIT_CAP[day.get(Calendar.DAY_OF_WEEK)];
                break;
        }

        this.nextDays.push(new DayOpenHourInfo(dayDescription, openHours.opens, openHours.closes));
        day.add(Calendar.DAY_OF_YEAR, 1);
    }

}
// Collection class used in main class
function DayOpenHourInfo(dayDescription, opens, closes) {
    this.dayDescription = dayDescription;
    this.opens = opens;
    this.closes = closes;
}