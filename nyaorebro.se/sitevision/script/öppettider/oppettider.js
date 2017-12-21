
var GregorianCalendar = Java.type('java.util.GregorianCalendar');
var Calendar = Java.type('java.util.Calendar');

// TODO: Add logic to get the folder of the businesses instead of hard coded id
var START_NODE_ID = '19.242f1fb1556288bfbf4353c';

var PropertyUtil = require('PropertyUtil');
var DateUtil = require('DateUtil');
var PortletContextUtil = require('PortletContextUtil');
var ResourceLocatorUtil = require('ResourceLocatorUtil');

var thisPage = PortletContextUtil.getCurrentPage(),
    parentNode = ResourceLocatorUtil.getNodeByIdentifier(START_NODE_ID),
    children = parentNode.getNodes();

var paramPlace = !request.getParameter("place") ? "" : request.getParameter("place");

var DAY_SWEDISH = ["", "söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"], // Calendar sunday starts on 1
    DAY_SWEDISH_INIT_CAP = ["", "Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"],
    CHECK_DAYS_FORWARD = 8,
    MIN_REFRESH_WAIT_MS = 5 * 60 * 1000,  // 5 minutes
    MAX_REFRESH_WAIT_MS = 60 * 60 * 1000; // 60 minutes

var place,
    aNode,
    business,
    businessnes = [],
    maplink,
    privatinpass;


if (paramPlace) {
    printJsonOpenhours();
} else {
    // Convert json of business to OpenHour object
    for (aNode = null; children.hasNext();) {
        aNode = children.next();
        //business = eval('(' + PropertyUtil.getString(aNode, 'oppettider')  + ')');       
        business = JSON.parse(PropertyUtil.getString(aNode, 'oppettider'));
        closeinfo = PropertyUtil.getString(aNode, 'stangtinfo');
        maplink = PropertyUtil.getStringEscaped(aNode, 'kartlank');
        privatinpass = PropertyUtil.getStringEscaped(aNode, 'privat');

        businessnes.push(new OpenHour(business, closeinfo, maplink, privatinpass));
    }
    // Convert to java array when accessed from velocity   
    // businessnes = java.util.Arrays.asList(businessnes);
    var refresh = request.getParameter("refresh") !== null;
    printBusinessOpenHours(businessnes, refresh);


}


//Below is the presentation logic, preferably this should have been in the velocity part.
//However the array of next days openhours object within the business array is for some reason not accessible in velocity.
function printBusinessOpenHours(businessnes, refresh) {
    var today = new Date();
    var minRefreshWait = null;


    for (var k = 0; k < businessnes.length; k++) {
        var b = businessnes[k];

        if (minRefreshWait === null) {
            minRefreshWait = b.expires;
        } else if (minRefreshWait > b.expires) {
            minRefreshWait = b.expires;
        }

        var cOpen = b.open ? "open" : "closed";
        var cStatus = b.open ? "Öppet" : "Stängt";
        var place = b.place.split(" ")[0];
        if (!minRefreshWait) {
            minRefreshWait = MIN_REFRESH_WAIT_MS;
        }

        out.print("    <div class=\"or-oh-header\">\n");
        out.print("      <div class=\"or-oh-name\">" + b.place + "<div class=\"or-oh-extra\">" + b.extrainfo + "</div></div>\n");
        out.print("     <span class=\"or-oh-status\">");
        out.print("      <div class=\"or-oh-" + cOpen + "\">" + cStatus + "</div>\n");
        out.print("      <div class=\"or-oh-time-info\">" + b.nextHourInfo + "</div>\n");
        out.print("     </span>");
        out.print("      <div class=\"or-oh-chevron\"><i class=\"fa fa-plus fa-lg\"></i></div>\n");
        out.print("    </div>\n");
        out.print("    <div class=\"or-oh-content\">\n");
        out.print("      <div class=\"or-oh-column\">\n");

        printNextDaysTable(b);

        out.print("      </div>\n");
        out.print("      <div class=\"or-oh-column\">\n");
        out.print("        <div class=\"or-oh-button b1\">Se fler öppettider <br><i class=\"fa fa-calendar fa-lg\"></i><a class=\"or-oh-a\" href=\"#\">Välj ett datum</a></div>\n");
        out.print("        <div class=\"or-oh-content\">\n");
        out.print("          <div class=\"or-oh-datePicker\" id=\"" + place + "\"></div>\n");
        out.print("          <input type=\"hidden\" id=\"validto-" + place + "\" value=\"" + b.validto + "\"/>");
        out.print("          <div class=\"or-oh-datePickerOutput\" id=\"datePickerOutput-" + place + "\"></div>\n");
        out.print("        </div>\n");
        if (b.mapLink) {
            out.print("        <div class=\"or-oh-button b2\">Vägbeskrivning <br><i class=\"fa fa-map-marker fa-lg\"></i><a class=\"or-oh-a\" href=\"" + b.mapLink + "\">Visa på kartan (" + b.address + ")</a></div>\n");
        }
        if (b.privatInpass) {
            out.print("        <div class=\"or-oh-button b2\">Privat inpassering <br><i class=\"fa fa-id-card-o fa-lg\"></i><a class=\"or-oh-a\" href=\"" + b.privatInpass + "\">Läs mer om privat inpassering</a></div>\n");
        }
        out.print("      </div>\n");
        out.print("    </div>\n");
    }

    if (minRefreshWait > MAX_REFRESH_WAIT_MS) {
        minRefreshWait = MAX_REFRESH_WAIT_MS;
    }

    out.print('\n');
    out.print('<script type="text/javascript">\n');
    out.print('  var dateListURL="/' + thisPage.getIdentifier() + '/openhours.portlet";\n');
    out.print('  var openhoursContainer="#' + PortletContextUtil.getPortletNamespace('svid') + '";\n');
    out.print('  var today = new Date("' + today + '");\n');
    out.print('  var refreshWaitMs = ' + minRefreshWait + ';');
    out.print('</script>\n');


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
        //business = eval('(' + PropertyUtil.getString(aNode, 'oppettider')  + ')');             
        business = JSON.parse(PropertyUtil.getString(aNode, 'oppettider'));
        if (business.place.split(" ")[0] == paramPlace) {
            out.print("{\"openDates\":[");
            var gcDay = new GregorianCalendar(paramYear, paramMonth, 1);
            var daysInMonth = gcDay.getActualMaximum(Calendar.DAY_OF_MONTH);
            var delimit = false;
            for (var i = 0; i < daysInMonth; i++) {
                openHours = getOpenHoursForDay(gcDay, business.openinghours);
                if (isOpenDuringDay(openHours)) {
                    if (delimit) { out.print(","); }
                    out.print("{\"date\":\"" + DateUtil.getCalendarAsString("yyyy-MM-dd", gcDay) + "\",");
                    out.print("\"openHours\":\"" + timeFormat(openHours.opens) + "-" + timeFormat(openHours.closes) + "\"}");
                    if (!delimit) { delimit = true; }
                }

                gcDay.add(Calendar.DAY_OF_YEAR, 1);
            }
            out.print("]}");
        }
    }
}


function getNextOpenOpenHours(openingHours) {
    var daysOffset = 0;
    var nextOpenHours, openHours;

    var day = new GregorianCalendar();
    var now = new Date();


    while (daysOffset < CHECK_DAYS_FORWARD) {
        openHours = getOpenHoursForDay(day, openingHours);
        if (openHours.opensDate !== null && (daysOffset > 0 || (daysOffset === 0 && now < openHours.opensDate))) {
            return openHours;
        }

        daysOffset++;
        day.add(Calendar.DAY_OF_YEAR, 1);
    }

    return null;
}

// Function logic below
function getNextOpensInfo(opensHours) {

    if (opensHours.opensDate !== null) {
        var today = new GregorianCalendar();
        var day = new GregorianCalendar();
        day.setTimeInMillis(opensHours.opensDate.getTime());

        var timeStamp = timeFormat(opensHours.opens);
        var daysOffset = day.get(Calendar.DAY_OF_YEAR) - today.get(Calendar.DAY_OF_YEAR);

        switch (daysOffset) {
            case 0: // today
                return "öppnar kl. " + timeStamp;
            case 1: // tomorrow
                return "öppnar imorgon kl. " + timeStamp;

            default:
                if (daysOffset < 7) {
                    return "öppnar på " + DAY_SWEDISH[day.get(Calendar.DAY_OF_WEEK)] + " kl. " + timeStamp;
                } else {
                    return "öppnar nästa " + DAY_SWEDISH[day.get(Calendar.DAY_OF_WEEK)] + " kl. " + timeStamp;
                }
        }

    } else {
        return "nästa öppetid,<br>se kalendern nedan";
    }
}

function timeFormat(time) {
    var splitTime = time.split(":");
    var minutes = splitTime[1] == "00" ? "" : splitTime[1];
    return splitTime[0] + minutes;
}

function openHourRuleToDate(day, time) {
    var retDate = new Date(DateUtil.getCalendarAsISO8601String(day));

    var timeParts = time.split(":");
    parseInt(timeParts[0], 10);
    parseInt(timeParts[1], 10);
    retDate.setHours(parseInt(timeParts[0], 10));
    retDate.setMinutes(parseInt(timeParts[1], 10));
    retDate.setSeconds(0);
    retDate.setMilliseconds(0);

    return retDate;
}

function getOpenHoursForDay(day, openingHours) {

    var openHours = {
        opens: null,
        closes: null,
        opensDate: null,
        closesDate: null
    };


    for (var i = 0; i < openingHours.length; i++) {
        var openHourRule = openingHours[i];

        if (openHourRule.type == "closed" && isTodayInDateList(day, openHourRule.datelist)) {
            openHours.closes = null;
            openHours.opens = null;
            openHours.opensDate = null;
            openHours.closesDate = null;
            break;
        }

        if (openHourRule.type == "normal") {
            if (openHours.opens === null && isDayRuleValid(day, openHourRule.repeat.inday) && isMonthRuleValid(day, openHourRule.repeat.inmonth)) {
                openHours.opens = openHourRule.open;
                openHours.closes = openHourRule.close;
                openHours.opensDate = openHourRuleToDate(day, openHourRule.open);
                openHours.closesDate = openHourRuleToDate(day, openHourRule.close);

            }
        }

        if (openHourRule.type == "changed") {
            if (isTodayInDateList(day, openHourRule.datelist)) {
                openHours.opens = openHourRule.open;
                openHours.closes = openHourRule.close;
                openHours.opensDate = openHourRuleToDate(day, openHourRule.open);
                openHours.closesDate = openHourRuleToDate(day, openHourRule.close);
            }
        }
    }

    return openHours;
}

function isOpenNow(openHours) {
    try {
        var now = new Date();
        return now >= openHours.opensDate && now <= openHours.closesDate;
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
function OpenHour(business, openinfo, maplink, privatinpass) {
    this.place = business.place;
    this.extrainfo = business.extrainfo;
    this.address = business.address;
    this.validto = business.validto;
    this.mapLink = maplink;
    this.privatInpass = privatinpass;
    this.nextDays = [];
    this.open = false;
    this.nextHourInfo = "";
    this.expires = null;
    var day = new GregorianCalendar();
    var openHours = getOpenHoursForDay(day, business.openinghours);

    if (openinfo && openinfo.length() > 0) {
        this.nextHourInfo = openinfo;
        this.expires = MIN_REFRESH_MS;
    } else {
        this.open = isOpenNow(openHours);
        var now = new Date();
        if (this.open) {
            this.nextHourInfo = "stänger kl. " + timeFormat(openHours.closes);
            this.expires = Math.ceil((openHours.closesDate.getTime() - now.getTime()) / 1000) * 1000;
        } else {
            var nextOpenHours = getNextOpenOpenHours(business.openinghours);
            if (!nextOpenHours) {
                this.nextHourInfo = "";
            }
            else {
                if (isOpenDuringDay(nextOpenHours)) {
                    this.expires = Math.ceil((nextOpenHours.opensDate.getTime() - now.getTime()) / 1000) * 1000;
                }
                this.nextHourInfo = getNextOpensInfo(nextOpenHours);
            }
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