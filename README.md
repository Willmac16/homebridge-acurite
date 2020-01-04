# homebridge-acurite
A homebridge plugin to add the discontinued Acurite SmartHub.

# Behind the Scenes
This project was inspired by Acuparse: https://www.acuparse.com
It uses a node.js webserver to interface with the Acurite Smart Hub (DNS redirection is required) and transports that data to a very **rudimentary** web page at your-server:3000, a json at your-server:3000/api, and temperature and current humidity are passed to homekit through homebridge.

# Sample Config
  "accessories":
    [
      {
        "accessory": "Acurite",
        "name": "Weather Station"
      }
    ]
