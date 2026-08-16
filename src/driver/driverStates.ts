import type { RedisClientType } from "redis";
import {DRIVER_AVAILABLE, DRIVER_BUSY} from '../constants/driver.ts'
export class DriverState{
    static async markDriverStateAvailable(client:RedisClientType, driverId: string){
        if(await client.sIsMember(DRIVER_BUSY, driverId)){
            client.sRem(DRIVER_BUSY, driverId);
        }
        await client.sAdd(DRIVER_AVAILABLE, driverId)
    }

    static async markDriverStateUnavailable(client:RedisClientType, driverId: string){
        await client.sRem(DRIVER_AVAILABLE, driverId)
    }

    static async markDriverStateBusy(client:RedisClientType, driverId: string){
        await client.sRem(DRIVER_AVAILABLE, driverId)
        await client.sAdd(DRIVER_BUSY, driverId)
    }


    static async isDriverAvailable(client:RedisClientType, driverId: string){

        return await client.sIsMember(DRIVER_AVAILABLE, driverId)

    }
}