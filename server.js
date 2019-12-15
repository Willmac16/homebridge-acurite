const express = require('express');
const app = express();

var last;

function updateLast(current)
{
     if (current.mt == "5N1x31")
     {
          last.windspeedmph = current.windspeedmph;
          last.baromin = current.baromin;
          last.battery = current.battery;
          last.rssi = current.rssi;

          last.winddir = current.winddir;
          last.rainin = current.rainin;
          last.dailyrainin = current.dailyrainin;
     }
     elseif (current.mt == "5N1x38")
     {
          last.windspeedmph = current.windspeedmph;
          last.baromin = current.baromin;
          last.battery = current.battery;
          last.rssi = current.rssi;

          last.humidity = current.humidity;
          last.tempf = current.tempf;
     }
}

const bodyParser = require('body-parser');
// ...
// ...
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send(last);
})


app.get('/weatherstation/updateweatherstation', function (req, res) {
     var dt = new Date();
     res.send('{\"localtime\":\"' + dt.toLocaleTimeString('it-IT') + '\"}');
     console.log(req.query);

     updateLast(req.query);
})

app.listen(3000, function () {
  console.log('App listening on port 3000!');
})
