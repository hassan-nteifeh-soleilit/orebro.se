# orebro.se
repo for webb-related code


## Hur man kommer igång med utveckling mot det lokala repot

### Förutsättningar

Följande behöver vara installerat:

 - **[Node JS](https://nodejs.org/en/)**

_Jupp, det är allt!_

### Setup

 1. Clona detta repository till din dator `git clone https://github.com/orebrokommun/orebro.se.git`
 2. `cd orebro.se`
 3. Installera beroenden: `npm install`
 4. Starta testservern: `npm start`

Surfa till <http://localhost:10001> och det ska visas ett meddelande om att servern är uppe och kör.

### Användning

När man vill att testservern på orebro.se ska gå mot de lokala filerna lägger man till följande till url:en på den sida man jobbar mot:

`?localdev`

