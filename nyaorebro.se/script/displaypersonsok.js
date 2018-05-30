function getElementsByClassName(strTagName, strClassName) {
    //var arrElements = (strTagName == "*" && document.all) ? document.all : oElm.getElementsByTagName(strTagName);
    var arrElements = document.getElementsByTagName(strTagName);
    var arrReturnElements = [];
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;    
    for (var i = 0; i < arrElements.length; i++) {
        oElement = arrElements[i];
    //Ändrat för att stödja IE6 o IE7
        //if (oRegExp.test(oElement.getAttribute("class"))) {
        if (oRegExp.test(oElement.className)) {
            arrReturnElements.push(oElement);
        }
    }
    return (arrReturnElements);
}

function bytSnabela() {
    
    var arr = getElementsByClassName('span', 'email');
    var string_variable;
    for (i = 0; i < arr.length; i++) {
        string_variable = arr[i].innerHTML.valueOf().toLowerCase();
        //alert(string_variable);
        string_variable = string_variable.replace(/<strong>/g, "");
        string_variable = string_variable.replace(/<\/strong>/g, "");
	string_variable = string_variable.replace(/ punkt /g, ".");
        string_variable = string_variable.replace(/ snabela /g, "@");
        //alert(string_variable);
        arr[i].innerHTML = '<a href="mailto:' + string_variable + '">' + string_variable + '</a>';
        //alert(string_variable);
    }
}

function getAllDivs() {
    var allDivs = document.getElementsByTagName('div');
    for (i = 0; i < allDivs.length; i++) {
        var aDiv = allDivs[i];
        var sID = aDiv.id;

        if (sID.indexOf('essi-category_options-') === 0) {
            //if (aDiv.style.display == 'block')
                aDiv.style.display = 'none';
        }
    }
}

function showHideField(hidden, optionfield_name) {
    if (0) {
        return (false);
    } else {
        o_optionfield_div = document.getElementById(optionfield_name);
        if (hidden.title != "1") {
            hidden.title = "1";
            o_optionfield_div.style.display = 'block';
        } else {
            hidden.title = "2";
            o_optionfield_div.style.display = 'none';
        }
    }
}
