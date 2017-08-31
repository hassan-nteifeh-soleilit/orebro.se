var interface = {
    /* Text [obligatorisk] - Hela URLen eller bara dess fragment identifier från karta.orebro.se -> Dela */
    mapData: scriptVariables.mapData,
    /* Heltal [obligatorisk] - Bredd */
    width: scriptVariables.width,
    /* Heltal [obligatorisk] - Höjd */
    height: scriptVariables.height
};

var mapData = interface.mapData.substring(interface.mapData.indexOf("#") + 1);
var uuid = "map" + java.util.UUID.randomUUID();
