import { createClient } from "redis";
import redisConfig from "@/config/redis.config";
import Logger from "@/utils/logger";

export default class RedisStore {
  public static client: ReturnType<typeof createClient>;

  public static async setup() {
    if (RedisStore.client) return;

    RedisStore.client = createClient(redisConfig);
    Logger.info("Connecting to Redis...");
    await RedisStore.client.connect();
  }
}
