//create express app
const express = require('express');
const app = express();
const { SerialPort, ReadlineParser } = require(`serialport`);
let { RouterConfig, SwitchConfig } = require('./public/js/Config.js');

//route for homepage
app.get('/', (req, res) => {
    //send the file index.html
    res.sendFile(__dirname + '/index.html');
});

//static files
app.use(express.static('public'));

//route for default config 
app.get('/RouterConfig', async(req, res) => {
    await RouterConfig(req.query.path, req.query.Hostname);
    res.send('Router created');
});

//route for switch config
app.get('/SwitchConfig', async(req, res) => {
    await SwitchConfig(req.query.path, req.query.Hostname, req.query.IpAdress, req.query.SubnetMask, req.query.DefaultGateway);
    res.send('Switch created');
});


//on start of server listen on port 3000
app.listen(3000, () => {
    console.log('Server started on port 3000');
});