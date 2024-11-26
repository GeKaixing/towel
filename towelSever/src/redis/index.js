import {creatClient}from 'redis';
const redisClient=creatClient();
redisClient.connect().catch((err) => console.error('Redis connection error:', err));
export default redisClient;