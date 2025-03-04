import { createClient } from 'redis';
const REDIS_PASSWORD =process.env.REDIS_PASSWORD
const redisClient = createClient({
    username: 'default',
    password: REDIS_PASSWORD,
    socket: {
        host: 'redis-10908.crce178.ap-east-1-1.ec2.redns.redis-cloud.com',
        port: 10908
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

await redisClient.connect().then(()=>{console.log('redis连接成功')}).catch((err) => console.error('Redis connection error:', err));
export default redisClient;