var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));

app.listen(9001);
console.log('server running on port 1234');
