import { createClient } from "redis";
import redisConfig from "@/config/redis.config";
import Logger from "@/utils/logger";

export default class RedisStore {
  private static client: ReturnType<typeof createClient>;

  public static async setup() {
    RedisStore.client = createClient(redisConfig);
    Logger.info("Connecting to Redis...");
    await RedisStore.client.connect();
  }
}
