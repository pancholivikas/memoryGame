var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.static('./'));


// Any deep link calls should return index.html
app.use('/*', express.static('./views/index.html'));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// app.get('/', function(request, response) {
//   response.sendFile('index.html');
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
