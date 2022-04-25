const { SerialPort, ReadlineParser } = require(`serialport`);
exports.RouterConfig = async function(path, hostname) {
    baudRate = 9600;
    console.log("Building Router config...");
    const port = new SerialPort({ path, baudRate, autoOpen: false });
    let parser = new ReadlineParser();
    port.open(function(err) {
        if (err) {
            return console.log("Error opening port: ", err.message);
        }
        console.log("Port opened");
        console.log(port.isOpen);
    });
    console.log(port.isOpen);
    port.pipe(parser);
    parser.on(`data`, console.log);
    port.write(`no\n`);
    port.write(`enable\n`);
    port.write(`conf t\n`);
    port.write(`hostname ${hostname}\n`);
    port.write(`line con 0\n`);
    port.write(`password cisco\n`);
    port.write(`login\n`);
    port.write(`line aux 0\n`);
    port.write(`password cisco\n`);
    port.write(`login\n`);
    port.write(`logg syn\n`);
    port.write(`line vty 0 4\n`);
    port.write(`password cisco\n`);
    port.write(`login\n`);
    port.write(`transport input all\n`);
    port.write(`exit\n`);
    port.write(`service password-encryption\n`);
    port.write(`enable secret class\n`);
    // Creating the parser and piping can be shortened to
    parser = port.pipe(new ReadlineParser());
    setTimeout(() => {
        closePort(port);
    }, 10000);
};

function closePort(port) {
    console.log(port.isOpen);
    port.close(function(err) {
        console.log(`port closed`, err);
    });
}

exports.SwitchConfig = async function(path, hostname, ip, subnet, gateway) {
    baudRate = 9600;
    console.log("Building Switch config...");
    const port = new SerialPort({ path, baudRate, autoOpen: false });
    let parser = new ReadlineParser();
    port.open(function(err) {
        if (err) {
            return console.log("Error opening port: ", err.message);
        }
        console.log("Port opened");
        console.log(port.isOpen);
    });
    console.log(port.isOpen);
    port.pipe(parser);
    parser.on(`data`, console.log);
    //config switch
    port.write(`enable\n`);
    port.write(`conf t\n`);
    port.write(`hostname ${hostname}\n`);
    port.write(`line con 0\n`);
    port.write(`password cisco\n`);
    port.write(`login\n`);
    port.write(`logg syn\n`);
    port.write(`line vty 0 15\n`);
    port.write(`password cisco\n`);
    port.write(`login\n`);
    port.write(`transport input all\n`);
    port.write(`exit\n`);
    port.write(`service password-encryption\n`);
    port.write(`enable secret class\n`);
    port.write(`Interface Vlan 1\n`);
    port.write(`ip address ${ip} ${subnet}\n`);
    port.write(`ip default-gateway ${gateway}\n`);
    port.write(`end\n`);

    parser = port.pipe(new ReadlineParser());
    setTimeout(() => {
        closePort(port);
    }, 10000);
};