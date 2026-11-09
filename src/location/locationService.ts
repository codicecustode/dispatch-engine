import type { RedisClientType } from "redis";
import { DRIVER_LOCATIONS } from "../constants/driver.ts";

export class LocationService {
    private client: RedisClientType;

    constructor(client: RedisClientType) {
        this.client = client;
    }

    static updateDriverLocation(client: RedisClientType, lat: number, lng: number, driverId: string) {
        client.geoAdd(DRIVER_LOCATIONS, {
            longitude: lng,
            latitude: lat,
            member: driverId
        });
    }
}
