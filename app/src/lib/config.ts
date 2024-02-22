const env = import.meta.env.MODE;

export const host = env == 'production' ? 'http://backend-api:3001' : 'http://localhost:3001';
