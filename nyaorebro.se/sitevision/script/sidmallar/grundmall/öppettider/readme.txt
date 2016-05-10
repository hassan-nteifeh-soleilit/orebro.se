Öppetttiderna styrs av sidan Öppettider servicecenter som ligger under funktionsidor/öppettider/

Öppettiderna definieras genom en JSON som redigeras på den sidan grunderna för ett JSON är följande.

- Ett block omsluts alltid med {}.
- En lista med ett eller flera block omsluts med [] varje block i en lista ska separeras med ett kommatecken.
- Ett block består av namngivna parametrar inom "" och med avskiljaren : till värdet för parametern. Ny parameter avskiljs med kommatecken efter värdet på föregående parametern.
- Textsträngar ska alltid omslutas inom "".


Platsbeskrivning (place): Namnet på platsen för vilken öppettiderna gäller.
Extrainfo (extrainfo): Eventuell extra informationstext för platsen.
Adress (address): Platsens adress.
Giltighet (validto): Sistadatum för när specifikationen av öppettiderna gäller.
Öppettider (openinghours): En lista med ett eller flera öppettidsblock

{
	"place": "Servicecenter",
	"extrainfo": "",
	"address": "Drottninggatan 5",
	"validto": "20161231",
	"openinghours": [ÖPPETTIDSSBLOCK]
}

Öppettidsblock
=================
Ett öppettidsblock används för att definera normala öppettider, ändrade/utökade öppetider eller för att definera när det är stängt inom definitionen av normala öppettider.
Alla tider som inte omfattas av normala eller ändrade/utökade öppetider anses som stängda.

Typ (type): Det finns tre olika typer (types) av öppettidsblock; normal, changed och closed. Closed har högst prioritet följt av changed.
Öppnar (open): Tidpunkt då det öppnar (tt:mm).
Stänger (close): Tidpunkt då det stänger (tt:mm).
Beskrivning (description): Samlingsnamn för öppettiden.
Upprepning(repeat): Se "Upprepningsblock"
Datumlista (datelist): Inget, ett eller flera specifika datum för öppettiden, se Datumblock.

Exempel: Normala öppetider 7-17 måndag-fredag
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

Exempel: Ändrad öppetid 7-16 skärtorsdagen
{
	"type": "changed",
	"open": "7:00",
	"close": "16:00",
	"description": "",
	"repeat": null,
	"datelist": [{
		"date": 20160324,
		"name": "Skärtorsdagen"
	}]
}


Exempel: Stängt jul och nyår
{	"type":"closed",
	"open":"", 
	"close":"", 
	"description":"", 
	"repeat":null, 
	"datelist":[
		{"date":20161224,"name":"julafton "},
		{"date":20161225,"name":"juldagen"},
		{"date":20161226,"name":"annandag jul"},
		{"date":20161231,"name":"Nyårsafton"},
		{"date":20170101,"name":"nyårsdagen"}
	]
}

Upprepningsblock
=================	
Frekvens (freq): Upprepningsfrekvens för öppettiden; weekly, monthly och yearly
Månader (inmonth): Lista på månadsnummer för vilken öppettidsblocket gäller.
Dagar (inday): Lista med en eller flera dagar som öppettidsblocket gäller för. Två första bokstäverna av dagens engelska namn i versaler ex. "FR". Specifik veckodag i en månad anges med siffra före, ex andra lördagen i månaden "2SA"
	
Exempel: Veckovis måndag till fredag	
{
	"freq": "weekly",
	"inmonth": [],
	"inday": ["MO", "TU", "WE", "TH", "FR"]
}

Exempel: 1:a lördagen i månaden
{
	"freq":"monthly", 
	"inmonth":[], 
	"inday": ["1SA"]
}

Exempel: Måndagar i april-oktober
{
	"freq":"yearly",
	"inmonth":[4,5,6,7,8,9,10], 
	"inday": ["MO"] 
}


Datumblock
===========
Datum (date): Datumet för när öppettiden det gäller (ååååmmdd)
Namn (name): Namn på datumet, används främst för helgdagar.

Exempel: Julafton
{
	"date": 20161224,
	"name": "julafton "
}


Fullt exempel
===================
Två normala veckotids öppetidsblock ett för kl 10-19 måndag-torsdag och ett för kl 9-16 fredag-söndag.
Ett öppetidsblock med ändrad tid kl 9-16 och en lista med datum för när det gäller.
Ett öppetidsblock då det är stängt och en lista med datum för när det gäller.

{
	"place": "Mellringe",
	"extrainfo": "med Åternyttan",
	"address": "Återbruksvägen 1",
	"validto": "20161231",
	"openinghours": [{
		"type": "normal",
		"open": "10:00",
		"close": "19:00",
		"description": "Måndag-torsdag",
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
		"description": "Fredag, lördag och söndag",
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
			"name": "Skärtorsdagen"
		}, {
			"date": 20160328,
			"name": "annandag påsk"
		}, {
			"date": 20160430,
			"name": "Valborgsmässoafton"
		}, {
			"date": 20160501,
			"name": "första maj"
		}, {
			"date": 20160505,
			"name": "kristi himmelfärdsdag"
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
			"name": "Nyårsafton"
		}, {
			"date": 20160101,
			"name": "nyårsdagen"
		}, {
			"date": 20160106,
			"name": "trettondagen"
		}, {
			"date": 20160325,
			"name": "långfredagen"
		}, {
			"date": 20160326,
			"name": "påskafton"
		}, {
			"date": 20160327,
			"name": "påskdagen"
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
