var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express
const port = process.env.PORT || 8080;

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

// Test route that returns the last part of the URL
app.get('/test/*', function (req, res) {
  res.json({ msg: req.url.split("/")[2] });
})


// Counter API
let counter = 0;
app.get('/cpt/inc*', function (req, res) {
  if (req.query.v) {
    // Check if v is an integer
    let isInt = req.query.v.match(/^-{0,1}\d+$/);
    if (!isInt) {
      res.json({ code: -1, msg: "Invalid value" });
      return;
    }
    counter += parseInt(req.query.v);
  }
  else {
    counter++;
  }
  res.json({ code: 0 });
})

app.get('/cpt/query', function (req, res) {
  res.json({ cpt: counter });
})

// Messages API
let allMsgs = [];

app.get('/msg/get/*', function (req, res) {
  let idx = req.url.split("/")[3];
  if (!idx || !idx.match(/^\d+$/) || parseInt(idx) >= allMsgs.length) {
    res.json({ code: 0 });
  }
  else {
    res.json({ code: 1, msg: allMsgs[parseInt(idx)] });
  }
})

app.get('/msg/nber', function (req, res) {
  res.json({ code: 0, nber: allMsgs.length });
})

app.get('/msg/getAll', function (req, res) {
  res.json({ code: 0, msgs: allMsgs });
})

app.get('/msg/post*', function (req, res) {
  let newMsg = req.query;
  if (!newMsg.pseudo || !newMsg.msg) {
    res.json({ code: -1, msg: "Missing fields" });
    return;
  }
  allMsgs.push({
    pseudo: newMsg.pseudo,
    time: new Date().toLocaleString(),
    msg: newMsg.msg
  });
  res.json({ code: 0, id: allMsgs.length - 1 });
})

app.get('/msg/del/*', function (req, res) {
  let idx = req.url.split("/")[3];
  if (!idx || !idx.match(/^\d+$/) || parseInt(idx) >= allMsgs.length) {
    res.json({ code: -1, msg: "Invalid index" });
  }
  else {
    allMsgs.splice(parseInt(idx), 1);
    res.json({ code: 0 });
  }
})

app.listen(port); //commence à accepter les requêtes
console.log("App listening on port " + port); //affiche un message dans la console

