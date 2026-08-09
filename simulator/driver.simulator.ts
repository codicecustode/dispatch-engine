import { io } from "socket.io-client";
const WS_SERVER = "http://localhost:3001"

const socket = io(WS_SERVER);
let id = 1;

socket.on("connect",()=>{
    console.info(`Driver with ${id} connected`)
});

const emitLocation = () => {

    const driverData = {
        driverId: `DRIVER-${id}`,
        lag: 77.2090 + (Math.random() - 0.5) * 0.01,
        lat: 28.6139 + (Math.random() - 0.5) * 0.01,
    }

    socket.emit('DRIVER_LOCATION_UPDATE', driverData)

    console.info("sending driver location data", driverData)

}


setInterval(emitLocation, 3000);

