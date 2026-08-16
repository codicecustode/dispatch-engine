import type { RedisClientType } from "redis";
import { client, initRedis } from '../redis/redis.config.ts'
import dotenv from 'dotenv'
dotenv.config()
await initRedis()

export class MatchingRiderService {

    static async findNearByDrivers(client: RedisClientType, lat: number, lag: number, radiusKm: number = 3) {

        return await client.geoSearchWith(
            'DRIVER_LOCATION',
            { longitude: lag, latitude: lat },
            { radius: radiusKm, unit: 'km' },
            ['WITHDIST', 'WITHCOORD'],
            {
                SORT: 'ASC',
            }
        );
    }
}


console.log(await MatchingRiderService.findNearByDrivers(
    client,
    28.6139,
    77.2090,
    3
))