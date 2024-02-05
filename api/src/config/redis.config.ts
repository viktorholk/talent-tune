const { REDIS_HOST } = process.env;

const NODE_ENV = process.env.NODE_ENV;

let config = {
  url: "",
};

if (NODE_ENV === "production") {
  config.url = `redis://${REDIS_HOST}:6379`;
} else {
  config.url = `redis://localhost:6379`;
}

export default config;
