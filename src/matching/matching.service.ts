import type { RedisClientType } from "redis";
import { DRIVER_LOCATIONS } from '../constants/driver.ts'

export class MatchingRiderService {

    static async findNearByDrivers(client: RedisClientType, lat: number, lng: number, radiusKm: number = 3) {

        return await client.geoSearchWith(
            DRIVER_LOCATIONS,
            { longitude: lng, latitude: lat },
            { radius: radiusKm, unit: 'km' },
            ['WITHDIST', 'WITHCOORD'],
            {
                SORT: 'ASC',
            }
        );
    }
}
