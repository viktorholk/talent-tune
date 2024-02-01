const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

export default {
  url: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:27017/${DB_NAME}?authSource=admin`,
};
