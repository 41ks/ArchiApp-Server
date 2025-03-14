var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Ici faut faire faire quelque chose à notre app...
// On va mettre les "routes"  == les requêtes HTTP acceptéés par notre application.

app.get("/", function (req, res) {
  res.send("Hello")
})

app.get('/test/*', function (req, res) {
  res.json({msg: req.url.split("/")[2]});
})


// Counter
let counter = 0;
app.get('/cpt/inc*', function (req, res) {
  if (req.query.v) {
    // Check if v is an integer
    let isInt = req.query.v.match(/^-{0,1}\d+$/);
    if (!isInt) {
      res.json({code: -1, msg: "Invalid value"});
      return;
    }
    counter += parseInt(req.query.v);
  }
  else {
    counter++;
  }
  res.json({code: 0});
})

app.get('/cpt/query', function (req, res) {
  res.json({cpt: counter});
})

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");

