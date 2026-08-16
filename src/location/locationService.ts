import type { RedisClientType } from "redis";

export class LocationService {
    private client: RedisClientType;

    constructor(client: RedisClientType) {
        this.client = client;
    }

    static updateDriverLocation(client: RedisClientType, lat: number, lng: number, driverId: string) {
        client.geoAdd("driver:locations", {
            longitude: lng,
            latitude: lat,
            member: driverId
        });

        console.info(`Driver with ${driverId} location updated`);
    }
}