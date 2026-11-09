import { MatchingRiderService } from '../matching/matching.service.ts'
import { client } from '../redis/redis.config.ts'
import { FindAvailableDriver } from '../driver/filterAvailableDriver.ts'
import { sendOfferTodriver } from '../dispatch/dispatch.service.ts'
import { io } from '../server.ts'

type Location = {
    lat: number;
    lng: number;
};

export const createOrderService = async (
    userId: string,
    pickup: Location,
    dropOff: Location
) => {

    const order = {
        orderId: crypto.randomUUID(),
        userId,
        pickup,
        dropOff,
        status: "CREATED",
        assignedDriverId: null,
    };

    const drivers = await MatchingRiderService.findNearByDrivers(client, order.pickup.lat, order.pickup.lng)
    const availableDrivers = await FindAvailableDriver.filterAvailableDriver(drivers)
    const nearestDrivers = await FindAvailableDriver.filterNearestDriver(availableDrivers)
    const nearestDriver = nearestDrivers[0]

    if (nearestDriver) {
        await sendOfferTodriver(nearestDriver.member, order.orderId, io)
    }

    return order;
};
