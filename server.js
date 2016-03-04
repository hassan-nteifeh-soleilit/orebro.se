var express = require('express');
var cors = require('cors')
 
var app = express();

app.use(cors());

app.use(express.static(__dirname ));
 
var port = 10001;
app.listen(port, function() {
    console.log('server listening on port ' + port);
});