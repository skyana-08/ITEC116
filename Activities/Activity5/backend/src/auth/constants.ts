export const jwtConstants = {
  // fallback; real secret comes from env/JWT module config
  secret: process.env.JWT_SECRET || 'changeme',
};
