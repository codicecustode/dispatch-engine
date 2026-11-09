import { io } from "socket.io-client";

const WS_SERVER = "http://localhost:3001";

const getBaseLocation = (i: number) => {
    if (i % 5 === 0) {
        return {
            lat: 28.6139,
            lng: 77.2090,
        };
    }

    if (i % 4 === 0) {
        return {
            lat: 28.6500,
            lng: 77.2300,
        };
    }

    if (i % 3 === 0) {
        return {
            lat: 28.5900,
            lng: 77.1900,
        };
    }

    if (i % 2 === 0) {
        return {
            lat: 28.6300,
            lng: 77.1800,
        };
    }

    return {
        lat: 28.6700,
        lng: 77.2500,
    };
};

for (let i = 1; i <= 100; i++) {

    const socket = io(WS_SERVER);

    const driverId = `DRIVER-${i}`;

    socket.emit('DRIVER_AVAILABLE', {
        driverId
    })

    // Each driver gets a fixed starting area
    const baseLocation = getBaseLocation(i);

    // Current position of this driver
    let currentLat = baseLocation.lat;
    let currentLng = baseLocation.lng;

    socket.on("connect", () => {
        console.info(`${driverId} connected`);
    });

    socket.on("ORDER_OFFER", (offer) => {
        console.info(`${driverId} received offer:`, offer);
    });



    const emitLocation = () => {

        // Small movement instead of teleporting
        currentLat += (Math.random() - 0.5) * 0.0005;
        currentLng += (Math.random() - 0.5) * 0.0005;

        const driverData = {
            driverId,
            lat: currentLat,
            lng: currentLng,
        };

        socket.emit(
            "DRIVER_LOCATION_UPDATE",
            driverData
        );
    };

    // Send first location immediately
    emitLocation();

    // Then every 3 seconds
    setInterval(emitLocation, 3000);
}
