var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('statics'));

app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('index', {
      "title" : "Start"
    });
});

app.listen(3333);
