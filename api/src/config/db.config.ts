const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const NODE_ENV = process.env.NODE_ENV;


let config = {
  url: "",
};

if (NODE_ENV === "production") {
  config.url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:27017/${DB_NAME}?authSource=admin`;
} else {
  config.url = process.env.DB_LOCAL_URL as string;
}

export default config;
