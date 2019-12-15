const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// ...
// ...
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send("What are you doing here? This isn't meant for you!");
})

app.get('/weatherstation', function (req, res) {
     // res.send('{\"localtime\":\"' + date('H:i:s') + '\"}');
     res.send("your on the right track");
     // console.log(req.body);
})

app.get('/weatherstation/updateweatherstation', function (req, res) {
     var dt = new Date();
     res.send('{\"localtime\":\"' + dt.toLocaleTimeString('it-IT') + '\"}');
     // res.send("work pls");
     // console.log(req.body);
     console.log(req.query);
})

app.listen(3000, function () {
  console.log('App listening on port 3000!');
})
