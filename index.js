module.exports = function (homebridge)
{
	// Homekit services and characteristics
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;

	// Start platform
	homebridge.registerAccesory("homebridge-acurite", "Acurite", Acurite);
};

function Acurite(log, config)
{
     this.log = log;
	this.config = config;

     this.server = require('server.js');


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
                     .on('get', this.server.state.tempf)




                const informationService = new Service.AccessoryInformation();

                  informationService
                     .setCharacteristic(Characteristic.Manufacturer, "Will MacCormack")
                     .setCharacteristic(Characteristic.Model, "Acurite")
                     .setCharacteristic(Characteristic.SerialNumber, "AcSH")
                     .setCharacteristic(Characteristic.FirmwareRevision, "0.1.1");

                  return [informationService, tempSensor];
     }


};
