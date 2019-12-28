const express = require('express');
const app = express();

module.exports.state = Object();

// module.exports.state.work = "pls";

function updateState(current)
{
     if (current.mt == "5N1x31")
     {
          module.exports.state.windspeedmph = current.windspeedmph;
          module.exports.state.baromin = current.baromin;
          module.exports.state.battery = current.battery;
          module.exports.state.rssi = current.rssi;

          module.exports.state.winddir = current.winddir;
          module.exports.state.rainin = current.rainin;
          module.exports.state.dailyrainin = current.dailyrainin;
     }
     else if (current.mt == "5N1x38")
     {
          module.exports.state.windspeedmph = current.windspeedmph;
          module.exports.state.baromin = current.baromin;
          module.exports.state.battery = current.battery;
          module.exports.state.rssi = current.rssi;

          module.exports.state.humidity = current.humidity;
          module.exports.state.tempf = current.tempf;
     }
}

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {state: module.exports.state});
})

app.get('/api', function (req, res) {
  res.send(module.exports.state);
})

app.get('/css/style.css', function (req, res) {
  res.sendFile('./css/style.css', { root: __dirname });
})

app.get('/favicon.ico', function (req, res) {
  res.sendFile('./favicon.ico', { root: __dirname });
})


app.get('/weatherstation/updateweatherstation', function (req, res) {
     var dt = new Date();
     res.send('{\"localtime\":\"' + dt.toLocaleTimeString('it-IT') + '\"}');
     console.log(req.query);

     updateState(req.query);
})

app.listen(3000, function () {
  console.log('App listening on port 3000!');
})
