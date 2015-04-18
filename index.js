var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var crawl = require(__dirname + '/lib/crawl');
var validator = require('validator');

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

  for (var k in identities) {
    if (identities[k]) {
      if (!validator.isURL(identities[k])) {
        return res.send(400);
      }
    }  
  }
  
  crawl(identities, function(err, result) {
    if (err) {
      return res.sendStatus(500);
    }
    return res.send(result);
  })
})

app.listen(3333);
