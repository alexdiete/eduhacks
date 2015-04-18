var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('statics'));
app.set('view engine', 'handlebars');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
    res.render('index', {
      "title" : "Start"
    });
});

app.post("/generate", urlencodedParser, function (req, res) {
  var identities = req.body;

  var github = identities["github"];
  var codecademy = identities["codecademy"];
  var codeschool = identities["codeschool"];

  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({
      "yolo" : "swag",
  }))
})

app.listen(3333);
