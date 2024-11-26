import {createClient}from 'redis';
const redisClient=createClient();
redisClient.connect().catch((err) => console.error('Redis connection error:', err));
export default redisClient;