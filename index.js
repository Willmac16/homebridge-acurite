module.exports = function (homebridge)
{
	// Homekit services and characteristics
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;

	// Start platform
	homebridge.registerAccessory("homebridge-acurite", "Acurite", Acurite);
};

function Acurite(log, config)
{
     this.log = log;
	this.config = config;

     this.server = require('./server.js');

	console.log(this.server.state);


}

Acurite.prototype = {
     identify: function (callback) {
         this.log("Identify requested!");
         callback();
     },

     getServices: function ()
     {


                const tempSensor = new Service.TemperatureSensor(this.name);
                    tempSensor
                		.getCharacteristic(Characteristic.CurrentTemperature)
                     	.on('get', this.getTemp.bind(this))

				tempSensor
					.addCharacteristic(Characteristic.CurrentRelativeHumidity)
					.on('get', this.getHumid.bind(this))

				tempSensor
					.addCharacteristic(Characteristic.BatteryLevel)
					.on('get', this.getBattery.bind(this))
				tempSensor
					.addCharacteristic(Characteristic.DiagonalFieldOfView)
					.on('get', this.getWindDir.bind(this))




                const informationService = new Service.AccessoryInformation();

                  informationService
                     .setCharacteristic(Characteristic.Manufacturer, "Will MacCormack")
                     .setCharacteristic(Characteristic.Model, "Acurite")
                     .setCharacteristic(Characteristic.SerialNumber, "AcSH")
                     .setCharacteristic(Characteristic.FirmwareRevision, "0.1.1");

                  return [informationService, tempSensor];
     },

	getTemp: function(callback)
	{
		console.log(this.server.state);
		callback(null, (this.server.state.tempf-32.0)/1.8);
	},

	getHumid: function(callback)
	{
		console.log(this.server.state);
		callback(null, this.server.state.humidity);
	},

	getWindDir: function(callback)
	{
		console.log(this.server.state);
		callback(null, this.server.state.winddir);
	},

	getWindSpeed: function(callback)
	{
		console.log(this.server.state);
		callback(null, this.server.state.windspeedmph);
	},

	getBattery: function(callback)
	{
		console.log(this.server.state);
		callback(null, this.server.state.battery == "normal" ? 100 : 0);
	}

};
