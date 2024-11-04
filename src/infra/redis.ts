import Redis from "ioredis";
import config from "../config/index";
import { injectable } from "inversify";

@injectable()
export class RedisConnection{  
    private redis!: Redis;
    connect(){ 
        this.redis = new Redis({
            port: config.redis.port,
            host: config.redis.host
        })
    }

    query(){
        return this.redis;
    }
}
