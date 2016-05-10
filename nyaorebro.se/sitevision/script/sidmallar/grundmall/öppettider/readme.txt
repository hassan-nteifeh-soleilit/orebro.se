�ppetttiderna styrs av sidan �ppettider servicecenter som ligger under funktionsidor/�ppettider/

�ppettiderna definieras genom en JSON som redigeras p� den sidan grunderna f�r ett JSON �r f�ljande.

- Ett block omsluts alltid med {}.
- En lista med ett eller flera block omsluts med [] varje block i en lista ska separeras med ett kommatecken.
- Ett block best�r av namngivna parametrar inom "" och med avskiljaren : till v�rdet f�r parametern. Ny parameter avskiljs med kommatecken efter v�rdet p� f�reg�ende parametern.
- Textstr�ngar ska alltid omslutas inom "".


Platsbeskrivning (place): Namnet p� platsen f�r vilken �ppettiderna g�ller.
Extrainfo (extrainfo): Eventuell extra informationstext f�r platsen.
Adress (address): Platsens adress.
Giltighet (validto): Sistadatum f�r n�r specifikationen av �ppettiderna g�ller.
�ppettider (openinghours): En lista med ett eller flera �ppettidsblock

{
	"place": "Servicecenter",
	"extrainfo": "",
	"address": "Drottninggatan 5",
	"validto": "20161231",
	"openinghours": [�PPETTIDSSBLOCK]
}

�ppettidsblock
=================
Ett �ppettidsblock anv�nds f�r att definera normala �ppettider, �ndrade/ut�kade �ppetider eller f�r att definera n�r det �r st�ngt inom definitionen av normala �ppettider.
Alla tider som inte omfattas av normala eller �ndrade/ut�kade �ppetider anses som st�ngda.

Typ (type): Det finns tre olika typer (types) av �ppettidsblock; normal, changed och closed. Closed har h�gst prioritet f�ljt av changed.
�ppnar (open): Tidpunkt d� det �ppnar (tt:mm).
St�nger (close): Tidpunkt d� det st�nger (tt:mm).
Beskrivning (description): Samlingsnamn f�r �ppettiden.
Upprepning(repeat): Se "Upprepningsblock"
Datumlista (datelist): Inget, ett eller flera specifika datum f�r �ppettiden, se Datumblock.

Exempel: Normala �ppetider 7-17 m�ndag-fredag
{
	"type": "normal",
	"open": "7:00",
	"close": "17:00",
	"description": "Vardagar",
	"repeat":{
		"freq": "weekly",
		"inmonth": [],
		"inday": ["MO", "TU", "WE", "TH", "FR"]
	},
	"datelist": []
}

Exempel: �ndrad �ppetid 7-16 sk�rtorsdagen
{
	"type": "changed",
	"open": "7:00",
	"close": "16:00",
	"description": "",
	"repeat": null,
	"datelist": [{
		"date": 20160324,
		"name": "Sk�rtorsdagen"
	}]
}


Exempel: St�ngt jul och ny�r
{	"type":"closed",
	"open":"", 
	"close":"", 
	"description":"", 
	"repeat":null, 
	"datelist":[
		{"date":20161224,"name":"julafton "},
		{"date":20161225,"name":"juldagen"},
		{"date":20161226,"name":"annandag jul"},
		{"date":20161231,"name":"Ny�rsafton"},
		{"date":20170101,"name":"ny�rsdagen"}
	]
}

Upprepningsblock
=================	
Frekvens (freq): Upprepningsfrekvens f�r �ppettiden; weekly, monthly och yearly
M�nader (inmonth): Lista p� m�nadsnummer f�r vilken �ppettidsblocket g�ller.
Dagar (inday): Lista med en eller flera dagar som �ppettidsblocket g�ller f�r. Tv� f�rsta bokst�verna av dagens engelska namn i versaler ex. "FR". Specifik veckodag i en m�nad anges med siffra f�re, ex andra l�rdagen i m�naden "2SA"
	
Exempel: Veckovis m�ndag till fredag	
{
	"freq": "weekly",
	"inmonth": [],
	"inday": ["MO", "TU", "WE", "TH", "FR"]
}

Exempel: 1:a l�rdagen i m�naden
{
	"freq":"monthly", 
	"inmonth":[], 
	"inday": ["1SA"]
}

Exempel: M�ndagar i april-oktober
{
	"freq":"yearly",
	"inmonth":[4,5,6,7,8,9,10], 
	"inday": ["MO"] 
}


Datumblock
===========
Datum (date): Datumet f�r n�r �ppettiden det g�ller (����mmdd)
Namn (name): Namn p� datumet, anv�nds fr�mst f�r helgdagar.

Exempel: Julafton
{
	"date": 20161224,
	"name": "julafton "
}


Fullt exempel
===================
Tv� normala veckotids �ppetidsblock ett f�r kl 10-19 m�ndag-torsdag och ett f�r kl 9-16 fredag-s�ndag.
Ett �ppetidsblock med �ndrad tid kl 9-16 och en lista med datum f�r n�r det g�ller.
Ett �ppetidsblock d� det �r st�ngt och en lista med datum f�r n�r det g�ller.

{
	"place": "Mellringe",
	"extrainfo": "med �ternyttan",
	"address": "�terbruksv�gen 1",
	"validto": "20161231",
	"openinghours": [{
		"type": "normal",
		"open": "10:00",
		"close": "19:00",
		"description": "M�ndag-torsdag",
		"repeat": {
			"freq": "weekly",
			"inmonth": [],
			"inday": ["MO", "TU", "WE", "TH"]
		},
		"datelist": []
	}, {
		"type": "normal",
		"open": "9:00",
		"close": "16:00",
		"description": "Fredag, l�rdag och s�ndag",
		"repeat": {
			"freq": "weekly",
			"inmonth": [],
			"inday": ["FR", "SA", "SU"]
		},
		"datelist": []
	}, {
		"type": "changed",
		"open": "9:00",
		"close": "16:00",
		"description": "",
		"repeat": null,
		"datelist": [{
			"date": 20160324,
			"name": "Sk�rtorsdagen"
		}, {
			"date": 20160328,
			"name": "annandag p�sk"
		}, {
			"date": 20160430,
			"name": "Valborgsm�ssoafton"
		}, {
			"date": 20160501,
			"name": "f�rsta maj"
		}, {
			"date": 20160505,
			"name": "kristi himmelf�rdsdag"
		}]
	}, {
		"type": "closed",
		"open": "",
		"close": "",
		"description": "",
		"repeat": null,
		"datelist": [{
			"date": 20151226,
			"name": "annandag jul"
		}, {
			"date": 20151231,
			"name": "Ny�rsafton"
		}, {
			"date": 20160101,
			"name": "ny�rsdagen"
		}, {
			"date": 20160106,
			"name": "trettondagen"
		}, {
			"date": 20160325,
			"name": "l�ngfredagen"
		}, {
			"date": 20160326,
			"name": "p�skafton"
		}, {
			"date": 20160327,
			"name": "p�skdagen"
		}, {
			"date": 20160606,
			"name": "nationaldagen"
		}, {
			"date": 20160624,
			"name": "midsommarafton"
		}, {
			"date": 20160625,
			"name": "midsommardagen "
		}, {
			"date": 20161224,
			"name": "julafton "
		}, {
			"date": 20161225,
			"name": "juldagen"
		}, {
			"date": 20161226,
			"name": "annandag jul"
		}]
	}]
}
