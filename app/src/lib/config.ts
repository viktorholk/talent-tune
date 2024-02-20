export const host =
  import.meta.env.MODE == 'production' ? 'http://backend:3001' : 'http://localhost:3001';
